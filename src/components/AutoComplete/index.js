import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import listensToClickOutside from '@olasearch/react-onclickoutside'
import { executeFuzzyAutoSuggest } from './../../actions/AutoSuggest'
import { clearHistory } from './../../actions/History'
import {
  updateQueryTerm,
  clearQueryTerm,
  replaceFacet,
  removeAllFacets,
  executeSearch,
  setSearchSource,
  executeFacetSearch,
  addFacet,
  removeFacet,
  addToken,
  removeToken,
  removeAllTokens,
  replaceTokens,
  removeTokenFacets,
  removeIntentEngineFacets
} from './../../actions/Search'
import { log } from './../../actions/Logger'
import Input from './Input'
import {
  checkForAllowedCharacters,
  trim,
  getCoords,
  mergeResultsWithHistory,
  redirect,
  getAutoCompleteResults,
  getWordPosition,
  // syncTokens,
  getDisplayName,
  cleanQueryTerm
} from './../../utilities'
import withTranslate from './../../decorators/withTranslate'
import scrollIntoView from 'dom-scroll-into-view'
import classNames from 'classnames'
import FuzzySuggestions from './FuzzySuggestions'
import find from 'ramda/src/find'
// import equals from 'ramda/src/equals'
import propEq from 'ramda/src/propEq'
import {
  SEARCH_INPUTS,
  TYPE_HISTORY,
  TYPE_TAXONOMY,
  TYPE_ENTITY,
  TYPE_QUERY,
  TYPE_DOC,
  TYPE_FACET,
  CREATE_FILTER_OBJECT
} from './../../constants/Settings'
import QueryHelp from './../Onboarding/QueryHelp'
import withTheme from './../../decorators/withTheme'
import withConfig from './../../decorators/withConfig'

/**
 * Completes a partial search query from a controlled vocabulary for items matching the character string, the user types.
 *
 * * Displays taxonomy terms
 * * Displays entities
 * * Displays popular keywords
 * * Displays rich instant answers
 */
class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false,
      fuzzyQuery: null,
      isOpen: false,
      q: props.q,
      prevQ: props.q,
      results: [],
      searchInput: null,
      searchDone: false,

      /* word suggestion */
      leftPosition: props.leftPadding,
      partialWord: null,
      showWordSuggestion: false
    }
    this.isSizeSmall = false
  }

  static propTypes = {
    showFacetSuggestions: PropTypes.bool,
    showAlert: PropTypes.bool,
    showHelp: PropTypes.bool,
    autoFocus: PropTypes.bool,
    forceRedirect: PropTypes.bool,
    onSubmit: PropTypes.func,
    viewAllClassName: PropTypes.string,
    placeholder: PropTypes.string,
    refreshOnGeoChange: PropTypes.bool
  }

  static defaultProps = {
    showBookmarks: true,
    showSearchButton: true,
    showAlert: false,
    filterOnSelect: false,
    showHelp: true,
    refreshOnGeoChange: false,
    classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
    activeClassName: 'ola-active',
    viewAllClassName: 'ola-autosuggest-all',
    placeholder: 'Enter keywords',
    className: 'ola-autosuggest',
    containerClass: 'ola-autosuggest-container',
    showGeoLocation: false,
    wordSuggestion: false,
    wordSuggestionWidth: 300,
    leftPadding: 10,
    autoFocus: false,
    forceRedirect: false,
    showHistory: true,
    showHistoryForQuery: false,
    q: '',
    scrollToViewOnFocus: true,
    scrollPadding: 16,
    resultLimit: 5,
    resultLimitDesktop: 10,
    searchOnSelect: false,
    searchTimeout: 400
  }

  componentDidUpdate (prevProps) {
    if (prevProps.q !== this.props.q) {
      this.setState({
        q: cleanQueryTerm(this.props.q),
        fuzzyQuery: null,
        results: []
      })
    }
    if (prevProps.history !== this.props.history) {
      this.handleHistoryChange(this.props.history)
    }
    // if (
    //   prevProps.q !== this.state.q &&
    //   equals(prevProps.tokens, this.props.tokens)
    //   // Check if the input is focused: then ignore
    //   !this.state.isFocused
    // ) {
    //   this.setState({
    //     q: cleanQueryTerm(this.props.q)
    //   })
    // }
  }

  clearFuzzyQueryTerm = () => {
    this.setState({
      fuzzyQuery: null
    })
  }
  updateFuzzyQueryTerm = (fuzzyQuery) => {
    this.setState(
      {
        fuzzyQuery
      },
      () => {
        if (!this.props.wordSuggestion) return
        /* Update cursor position */
        const tokenIndex =
          this.state.startToken +
          this.getFacetDisplayName(fuzzyQuery.term).length
        this.updateCursor(tokenIndex)
      }
    )
  }
  getFacetDisplayName = (term) => {
    return getDisplayName(null, term)
  }
  closeAutoSuggest = () => {
    this.setState({
      isOpen: false,
      leftPosition: 0
    })
  }
  updateQueryTerm = ({ term, ...rest }) => {
    this.setState({
      q: cleanQueryTerm(term),
      searchDone: false,
      /* If the word you are typing has changed */
      // results: rest.startToken !== this.state.startToken ? [] : this.state.results,
      ...rest
    })
  }
  clearQueryTerm = (cb) => {
    this.setState(
      {
        q: '',
        fuzzyQuery: null,
        results: this.props.showHistory
          ? mergeResultsWithHistory({
            history: this.props.history,
            showHistoryForQuery: this.props.showHistoryForQuery
          })
          : [],
        isOpen: this.props.history.length > 0,
        leftPosition: this.props.leftPadding,
        showWordSuggestion: false
      },
      cb
    )
  }
  handleHistoryChange = (newHistory) => {
    this.setState({
      results: this.props.showHistory
        ? mergeResultsWithHistory({
          history: newHistory,
          results: this.state.results,
          query: this.state.q,
          showHistoryForQuery: this.props.showHistoryForQuery
        })
        : []
    })
  }
  terminateAutoSuggest = () => {
    this.setState({
      isOpen: false,
      results: []
    })
  }
  handleClickOutside = (event) => {
    /* Prevent rendering when autocomplete is closed */
    if (this.state.isOpen) {
      this.terminateAutoSuggest()
      /**
       * For Fuzzy suggestion, restore the original query term
       */
      if (event && event.nativeEvent && event.nativeEvent.type === 'keydown') {
        return this.clearFuzzyQueryTerm()
      }
    }
    if (!this.state.isFocused) return
    if (event && event.type === 'keydown') return
    this.onBlur()
  }

  onTokenChange = (tokens) => {
    if ((!tokens || !tokens.length) && this.props.tokens.length) {
      return this.props.removeAllTokens()
    }
    const tokensToRemove = this.props.tokens.filter(
      ({ value }) => tokens.indexOf(value) === -1
    )
    tokensToRemove.forEach(({ value }) => this.props.removeToken(value))
  }

  onChange = (event, searchInput) => {
    /* Set the term */
    const term = event.target ? event.target.value : event
    /* Get partial term */
    let startToken, endToken, leftPosition, partialWord
    if (this.props.wordSuggestion) {
      const wordPosition = getWordPosition(event.target)
      partialWord = wordPosition.word
      leftPosition = wordPosition.leftPosition
      startToken = wordPosition.startToken
      endToken = wordPosition.endToken

      /* if its the same word stop */
      if (
        this.state.partialWord === partialWord &&
        event &&
        event.type === 'mousedown'
      ) {
        return
      }

      /* Update facet if startToken + endToken has changed */
      // let changedTokens = this.props.tokens.filter(
      //   ({ startToken: st, endToken: et }) => {
      //     return st === startToken && et !== endToken
      //   }
      // )
      if (startToken !== this.state.startToken) {
        // Word has changed, clear the results
        this.setState({ results: [] })
      }
      /* Remove facets if tokens are changed */
      // if (changedTokens) {
      //   changedTokens.forEach(({name, value}) => {
      //     this.props.removeFacet({ name }, value)
      //   });
      // }
    }

    const { q } = this.state

    /* Trim text */
    if (term && term.length && trim(term) === '') return
    if (!term && !q) {
      /* Close auto suggest */
      this.closeAutoSuggest()
      /* Remove fuzzy term */
      this.clearFuzzyQueryTerm()

      /* terminate */
      this.terminateAutoSuggest()
      return
    }

    if (!term) return this.clearQueryTerm()

    if (this.state.q !== term) {
      // console.log(this.state.q)
      // console.log(term)
      // console.log(syncTokens(this.state.q, term, this.props.tokens))
      // const tokens = syncTokens(this.state.q, term, this.props.tokens)
      /* Update tokens */
      // this.props.replaceTokens(tokens)
    }

    /* No of words in the query */
    const hasMoreTerms = term.match(/\s/gi)
    const showWordSuggestion =
      this.props.wordSuggestion && !!(hasMoreTerms && hasMoreTerms.length)

    const { allowedCharacters } = this.props.config

    /* Update state */
    if (this.props.wordSuggestion) {
      this.updateQueryTerm({
        term,
        searchInput,
        startToken,
        endToken,
        leftPosition,
        showWordSuggestion,
        partialWord
      })
    } else {
      this.updateQueryTerm({ term })
    }

    /* Clear fuzzy term selection on query change */
    this.clearFuzzyQueryTerm()

    /* Close auto suggest early */
    if (showWordSuggestion && !partialWord) {
      return this.closeAutoSuggest()
    }

    /* Which request */
    const ajaxRequest = showWordSuggestion
      ? this.props.executeFacetSearch({
        fullTerm: term,
        term: partialWord,
        startToken,
        endToken,
        fieldTypeMapping: this.props.config.fieldTypeMapping
      })
      : this.props.executeFuzzyAutoSuggest({
        q: term,
        config: this.props.config
      })

    if (
      allowedCharacters &&
      !checkForAllowedCharacters(term, allowedCharacters)
    ) {
      this.terminateAutoSuggest()
    } else {
      ajaxRequest.then((results) => {
        /**
         * Prevents from showing autosuggestions if user has already searched
         */
        if (!results || this.state.searchDone) return
        /* Prepare results */
        const res = getAutoCompleteResults(
          results,
          this.props.config.facets,
          showWordSuggestion,
          this.props.tokens
        )
        const finalResults = this.props.showHistory
          ? mergeResultsWithHistory({
            history: this.props.history,
            results: res,
            query: this.state.q,
            showHistoryForQuery: this.props.showHistoryForQuery
          })
          : res
        /* Refactor */

        this.setState({
          results: finalResults,
          isOpen: showWordSuggestion
            ? this.state.startToken !== startToken
              ? false
              : !!finalResults.length
            : this.props.wordSuggestion
              ? showWordSuggestion !== this.state.showWordSuggestion
                ? false
                : !!finalResults.length
              : this.state.q
                ? !!finalResults.length
                : this.props.history.length > 0
        })
      })
    }

    /* Remove currently selected item from the autosuggest */
    this.clearActiveClass()
  }

  clearActiveClass = () => {
    const nodes = this.suggestionsContainer.querySelectorAll(
      this.props.classNames
    )
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove(this.props.activeClassName)
    }
  }

  updateCursor = (start) => {
    if (typeof start === 'undefined' || start === null) return
    setTimeout(() => this.inputEl.input.setSelectionRange(start, start))
  }

  onKeyDown = (direction, event) => {
    const { results, endToken } = this.state
    const { classNames, activeClassName } = this.props
    const fullActiveClass = '.' + activeClassName
    const nodes = this.suggestionsContainer.querySelectorAll(classNames)

    if (!nodes.length) {
      if (
        this.props.history.length &&
        ['tab', 'space'].indexOf(direction) === -1
      ) {
        return this.clearQueryTerm()
      }
    }

    const target = this.suggestionsContainer.querySelector(fullActiveClass)
    let index = target ? [].indexOf.call(nodes, target) : -1
    let next

    switch (direction) {
      case 'up':
        this.clearActiveClass()
        next = nodes[Math.max(0, --index)]
        if (index < 0) {
          next.classList.remove(activeClassName)
          if (index === -1) {
            this.clearFuzzyQueryTerm()
            this.updateCursor(endToken)
          }
        } else {
          next.classList.add(activeClassName)
        }
        if (index < -1) {
          index = nodes.length - 1
          next = nodes[index]
          next.classList.add(activeClassName)
        }
        break

      case 'down':
        this.clearActiveClass()
        next = nodes[Math.min(nodes.length - 1, ++index)]
        if (index >= nodes.length) {
          this.clearFuzzyQueryTerm()
          this.clearActiveClass()
          this.updateCursor(endToken)
        } else {
          next.classList.add(activeClassName)
        }
        break

      case 'tab':
      case 'space':
        if (this.props.wordSuggestion) {
          if (results[index]) {
            if (direction === 'tab') event.preventDefault()
            return this.onFuzzySelect(results[index])
          } else {
            if (direction === 'tab') this.onSoftBlur(event)
            return
          }
        } else {
          /* Prevent updation */
          if (direction === 'tab') {
            /* Update the query term */
            if (results[index]) return this.updateQueryTerm(results[index])
          } else {
            /**
             * Adding a space, do not fill the selected term
             */
            return
          }
        }
        break
    }

    const term = results[index] ? results[index] : null

    if (term) {
      this.updateFuzzyQueryTerm(term)
    }

    /* Add a timeout */
    if (this.props.searchOnSelect && !this.props.isPhone && term) {
      if (this._autosearch) clearTimeout(this._autosearch)
      this._autosearch = setTimeout(() => {
        this.onSubmit(null, { stayOpen: true })
      }, this.props.searchTimeout)
    }

    next &&
      scrollIntoView(next, this.suggestionsContainer, {
        onlyScrollIfNeeded: true
      })
  }

  onSubmit = (event, options) => {
    /* If there is a fuzzy term */
    if (this.state.fuzzyQuery) {
      return this.onFuzzySelect(this.state.fuzzyQuery, options)
    }
    /* Remove facets that are tokens */
    const activeTokens = this.props.tokens.map(
      ({ name, value }) => `${name}:${value}`
    )

    /* Check if there are any tokens */
    if (this.props.tokens.length) {
      this.props.tokens.forEach(({ value, name }) => {
        const facet = this.getOrCreateFacet(name)
        /* Set from query as true */
        facet.isToken = true
        this.props.addFacet(facet, value)
      })
    }
    /* Remove facets that are tokens */
    this.props.facet_query.filter(({ isToken }) => isToken).forEach((item) => {
      const { selected } = item
      for (let i = 0; i < selected.length; i++) {
        if (activeTokens.indexOf(`${item.name}:${selected[i]}`) === -1) {
          this.props.removeFacet(item, selected[i])
        }
      }
    })

    /* Clear results and close the suggestions */
    this.setState({
      results: [],
      isOpen: false
    })

    /**
     * Update query term
     * Only if query has changed. Should we set skip_spellsuggest or skip_intent to false here ?
     */
    if (this.state.q !== this.props.q) {
      this.props.updateQueryTerm(this.state.q, this.state.searchInput)
    }

    /* Remove facets from ie */
    // this.props.removeIntentEngineFacets()

    /* Trigger search */
    this.onSelect(this.state.q)

    /* trigger blur on mobile devices */
    if (this.props.isPhone) {
      setTimeout(() => document.activeElement.blur(), 100)
    }

    event && event.preventDefault()
  }

  onSelect = (suggestion, options) => {
    if (this.props.onSelect) {
      this.props.onSelect(suggestion, {
        removeAllFacets: this.props.removeAllFacets,
        updateQueryTerm: this.props.updateQueryTerm
      })
    }

    if (this.props.forceRedirect) {
      this.props.setSearchSource('suggest')
    }

    /* Check if user deliberately clicked on selected the query */
    if (options && options.fromSuggestion) {
      this.props.log({
        eventType: 'C',
        eventSource: 'suggest',
        eventCategory: 'autosuggest',
        query: this.state.q /* override query */,
        eventAction: 'click',
        suggestion_taxo_label: suggestion.taxo_label,
        suggestion_taxo_term: suggestion.taxo_term,
        suggestion: suggestion.term,
        position: options.position,
        result: suggestion.id
          ? {
            title: suggestion.title,
            url: suggestion.url,
            id: suggestion.id
          }
          : null
      })
    }

    /* If its a document */
    if (suggestion.type === TYPE_DOC) {
      /* Update state */
      return redirect(suggestion.url)
    }

    this.props.executeSearch({
      forceRedirect: this.props.forceRedirect,
      searchPageUrl: this.props.config.searchPageUrl,
      routeChange: !this.props.forceRedirect
    })

    this.setState({
      searchDone: true
    })

    /* Clear timeout */
    if (this._autosearch) clearTimeout(this._autosearch)
  }

  getOrCreateFacet = (name) => {
    let facet = find(propEq('name', name))(this.props.config.facets)
    if (!facet) {
      facet = CREATE_FILTER_OBJECT({
        name,
        config: this.props.config
      })
    }
    return facet
  }

  onFuzzySelect = (suggestion, options) => {
    const { type } = suggestion
    const isTaxonomy = type === TYPE_TAXONOMY
    const isEntity = type === TYPE_ENTITY
    const isQuery = type === TYPE_QUERY
    const isHistory = type === TYPE_HISTORY
    const isFacet = type === TYPE_FACET
    const stayOpen = options && options.stayOpen
    const { filterOnSelect } = this.props

    /* Facets */
    var facet

    /* Term to be sent back as query */
    let term = suggestion.suggestion_raw || suggestion.term

    /* Focus on the input if click event */
    if (options && options.event && options.event.type === 'click') {
      // To do
    }

    if (isFacet) {
      term = this.getFacetDisplayName(term)
    }

    if (this.props.wordSuggestion) {
      term =
        this.state.q.substr(0, this.state.startToken) +
        term +
        this.state.q.substr(this.state.endToken)
    }

    if (!stayOpen) {
      this.setState({
        results: [],
        isOpen: false,
        fuzzyQuery: null
      })
    }

    /* Update state */
    this.updateQueryTerm({ term })

    /* isFacet */
    if (isFacet) {
      facet = this.getOrCreateFacet(suggestion.taxo_label)
      this.props.addToken({
        startToken: this.state.startToken,
        endToken:
          this.state.startToken + getDisplayName(suggestion.term).length,
        isHidden: true,
        value: suggestion.term,
        name: facet.name
      })

      // /* Do not submit if user is continuing to filter */
      return
    }

    if (isEntity || isTaxonomy) {
      if (filterOnSelect && (suggestion.taxo_label && suggestion.taxo_term)) {
        facet = this.getOrCreateFacet(suggestion.taxo_label)
        this.props.replaceFacet(
          facet,
          suggestion.taxo_path || suggestion.taxo_term
        )
      }
      if (!filterOnSelect) {
        this.props.updateQueryTerm(term, SEARCH_INPUTS.SUGGESTION)
      }
    }
    /**
     * query in entity/taxonomy
     */
    if (isQuery || isHistory) {
      if (suggestion.taxo_label && suggestion.taxo_term) {
        /* Remove all selected facets */
        this.props.removeAllFacets()
        facet = this.getOrCreateFacet(suggestion.taxo_label)
        this.props.replaceFacet(
          facet,
          suggestion.taxo_path || suggestion.taxo_term
        )
      }

      /* Check for tokens */
      if (suggestion.tokens) {
        this.props.replaceTokens(suggestion.tokens)
        for (let i = 0; i < suggestion.tokens.length; i++) {
          facet = this.getOrCreateFacet(suggestion.tokens[i].name)
          /**
           * Make sure to add isToken attribute
           */
          this.props.replaceFacet(
            { ...facet, isToken: true },
            suggestion.tokens[i].value
          )
        }
      }
      this.props.updateQueryTerm(term, SEARCH_INPUTS.SUGGESTION)
    }

    return this.onSelect(suggestion, { ...options, fromSuggestion: true })
  }
  onFocus = (event) => {
    /* Set scroll position on phone */
    if (this.props.isPhone && this.props.scrollToViewOnFocus) {
      document.documentElement.scrollTop = document.body.scrollTop =
        getCoords(event.target).top - this.props.scrollPadding
    }

    /* Set focus status */
    this.setState({
      isFocused: true,
      isOpen: true,
      results:
        !this.state.q && this.props.showHistory
          ? mergeResultsWithHistory({
            history: this.props.history,
            results: this.state.results,
            query: this.state.q,
            showHistoryForQuery: this.props.showHistoryForQuery
          })
          : this.state.results
    })

    this.props.onFocus && this.props.onFocus(event)
  }

  onBlur = (event) => {
    this.setState({
      isFocused: false,
      results: [],
      fuzzyQuery: null,
      partialWord: null
    })

    this.props.onBlur && this.props.onBlur(event)
  }

  onSoftBlur = (e) => {
    if (!e.relatedTarget) return
    if (this.suggestionsContainer.contains(e.relatedTarget)) return

    this.setState({
      isFocused: false,
      isOpen: false,
      fuzzyQuery: null,
      results: []
    })
  }

  registerRef = (input) => {
    this.suggestionsContainer = input
  }
  registerEl = (el) => {
    this.el = el
  }
  componentDidMount () {
    if (!this.el) return
    this.isSizeSmall = getCoords(this.el).width <= 600
  }
  registerInput = (el) => {
    this.inputEl = el
  }

  render () {
    const {
      className,
      translate,
      resultLimit,
      resultLimitDesktop,
      isDesktop,
      theme
    } = this.props
    let {
      isFocused,
      fuzzyQuery,
      q,
      results,
      startToken,
      endToken,
      showWordSuggestion
    } = this.state
    if (results.length > resultLimit) {
      results.length = isDesktop ? resultLimitDesktop : resultLimit
    }
    const { showSuggestionHelp } = this.props.config
    const isOpen = !results.length ? false : this.state.isOpen
    const klass = classNames('ola-suggestions', { 'ola-js-hide': !isOpen })
    const klassContainer = classNames(className, {
      'ola-autosuggest-focus': isFocused,
      'ola-autosuggest-blur': !isFocused,
      'ola-autosuggest-small': this.isSizeSmall,
      'ola-speech-not-supported': !(
        window.SpeechRecognition || window.webkitSpeechRecognition
      )
    })
    const queryTerm = fuzzyQuery
      ? showWordSuggestion
        ? q.substr(0, startToken) +
            this.getFacetDisplayName(fuzzyQuery.term) +
            q.substr(endToken) || q
        : this.getFacetDisplayName(fuzzyQuery.term)
      : q

    const fuzzyTokens = fuzzyQuery ? fuzzyQuery.tokens : null

    const leftPosition = showWordSuggestion
      ? Math.max(0, this.state.leftPosition - this.props.leftPadding)
      : 0
    return (
      <div className={klassContainer} ref={this.registerEl}>
        <div className={this.props.containerClass}>
          <Input
            q={queryTerm}
            ref={this.registerInput}
            onChange={this.onChange}
            onClear={this.clearQueryTerm}
            onKeyDown={this.onKeyDown}
            onSubmit={this.onSubmit}
            onFocus={this.onFocus}
            isOpen={isOpen}
            placeholder={translate('autosuggest_placeholder')}
            handleClickOutside={this.handleClickOutside}
            onSearchButtonClick={this.onSubmit}
            results={results}
            fuzzyQuery={fuzzyQuery}
            showGeoLocation={this.props.showGeoLocation}
            onGeoLocationSuccess={this.props.onGeoLocationSuccess}
            onGeoLocationDisable={this.props.onGeoLocationDisable}
            refreshOnGeoChange={this.props.refreshOnGeoChange}
            autoFocus={this.props.autoFocus}
            isPhone={this.props.isPhone}
            onBlur={this.onSoftBlur}
            handleClose={this.terminateAutoSuggest}
            tokens={this.props.tokens}
            onTokenChange={this.onTokenChange}
            showWordSuggestion={showWordSuggestion}
            showAlert={this.props.showAlert}
            fuzzyTokens={fuzzyTokens}
            theme={theme}
            isFocused={this.state.isFocused}
            showSearchButton={this.props.showSearchButton}
          />

          <div
            className={klass}
            style={{
              left: leftPosition,
              width: showWordSuggestion
                ? this.props.wordSuggestionWidth
                : 'auto'
            }}
          >
            <div className='ola-suggestions-wrapper' ref={this.registerRef}>
              {showSuggestionHelp ? (
                <div className='ola-suggestions-help'>
                  {q ? (
                    showWordSuggestion ? null : (
                      translate('autosuggest_help')
                    )
                  ) : (
                    <span>
                      {translate('autosuggest_help_history')}
                      <a
                        onClick={this.props.clearHistory}
                        className='ola-suggestions-clear'
                      >
                        {translate('autosuggest_clear_history_label')}
                      </a>
                    </span>
                  )}
                </div>
              ) : null}
              <FuzzySuggestions
                results={results}
                onSelect={this.onFuzzySelect}
                onRemoveHistory={this.onRemoveHistory}
                activeClassName={this.props.activeClassName}
                fieldLabels={this.props.config.fieldLabels}
                q={q}
              />
            </div>
          </div>

          <QueryHelp
            isVisible={
              this.props.showHelp &&
              !isOpen &&
              isFocused &&
              !queryTerm &&
              !results.length
            }
          />
        </div>
        <style jsx>
          {`
            .ola-autosuggest-focus :global(.ola-search-form-container) {
              border-color: ${theme.primaryColor};
              box-shadow: none;
            }
          `}
        </style>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isPhone: state.Device.isPhone,
    isDesktop: state.Device.isDesktop,
    history: state.AppState.history,
    tokens: state.QueryState.tokens,
    facet_query: state.QueryState.facet_query,
    wordSuggestion: ownProps.wordSuggestion && state.Device.isDesktop
  }
}

export default connect(mapStateToProps, {
  executeFuzzyAutoSuggest,
  updateQueryTerm,
  clearQueryTerm,
  replaceFacet,
  removeAllFacets,
  executeSearch,
  setSearchSource,
  clearHistory,
  log,
  executeFacetSearch,
  addFacet,
  removeFacet,
  addToken,
  removeToken,
  removeAllTokens,
  replaceTokens,
  removeTokenFacets,
  removeIntentEngineFacets
})(withConfig(withTheme(withTranslate(listensToClickOutside(AutoComplete)))))

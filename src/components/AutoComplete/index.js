import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import listensToClickOutside from 'react-onclickoutside'
import { executeFuzzyAutoSuggest } from './../../actions/AutoSuggest'
import { clearHistory } from './../../actions/History'
import {
  updateQueryTerm,
  replaceFacet,
  removeAllFacets,
  executeSearch,
  setSearchSource,
  executeFacetSearch,
  addFacet,
  addToken,
  removeToken,
  removeAllTokens
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
  getWordPosition
} from './../../utilities'
import injectTranslate from './../../decorators/injectTranslate'
import scrollIntoView from 'dom-scroll-into-view'
import classNames from 'classnames'
import FuzzySuggestions from './FuzzySuggestions'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import {
  SEARCH_INPUTS,
  TYPE_HISTORY,
  TYPE_TAXONOMY,
  TYPE_ENTITY,
  TYPE_QUERY,
  TYPE_DOC,
  TYPE_FACET
} from './../../constants/Settings'
import QueryHelp from './../Onboarding/QueryHelp'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false,
      fuzzyQuery: null,
      isOpen: false,
      q: props.q,
      results: [],
      searchInput: null,

      /* word suggestion */
      leftPosition: props.leftPadding,
      partialWord: null,
      showWordSuggestion: props.wordSuggestion && this.props.isDesktop
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

  static contextTypes = {
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  }

  static defaultProps = {
    showBookmarks: true,
    showAlert: false,
    showHelp: false,
    refreshOnGeoChange: false,
    classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
    activeClassName: 'ola-active',
    viewAllClassName: 'ola-autosuggest-all',
    placeholder: 'Enter keywords',
    showZone: false,
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
    scrollOnFocus: true,
    scrollPadding: 16,
    resultLimit: 5,
    resultLimitDesktop: 10,
    searchOnSelect: false,
    searchTimeout: 400
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.q !== this.props.q) {
      this.setState({
        q: nextProps.q,
        fuzzyQuery: null,
        results: []
      })
    }
    /* Eg: page changes with empty query */
    if (
      nextProps.q !== this.state.q &&
      nextProps.tokens === this.props.tokens
    ) {
      this.setState({
        q: nextProps.q
      })
    }
    if (nextProps.history !== this.props.history) {
      this.handleHistoryChange(nextProps.history)
    }
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
        /* Update cursor position */
        let tokenIndex = this.state.startToken + fuzzyQuery.term.length
        this.updateCursor(tokenIndex)
      }
    )
  }
  closeAutoSuggest = () => {
    this.setState({
      isOpen: false,
      leftPosition: 0
    })
  }
  updateQueryTerm = ({ term, ...rest }) => {
    this.setState({
      q: term,
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
        leftPosition: this.props.leftPadding
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
    if (event && event.type === 'keydown') return
    this.onBlur()
  }

  onTokenChange = (tokens) => {
    if (!tokens || !tokens.length) return this.props.removeAllTokens()
    let tokensToRemove = this.props.tokens.filter(
      ({ value }) => tokens.indexOf(value) === -1
    )
    tokensToRemove.forEach(({ value }) => this.props.removeToken(value))
  }

  onChange = (event, searchInput) => {
    /* Set the term */
    let term = event.target ? event.target.value : event

    /* Get partial term */
    let {
      word: partialWord,
      leftPosition,
      startToken,
      endToken
    } = getWordPosition(event.target)

    /* Update facet if startToken + endToken has changed */
    let changedTokens = this.props.tokens.filter(
      ({ startToken: st, endToken: et }) => {
        return st === startToken && et !== endToken
      }
    )
    /* Remove facets if tokens are changed */
    if (changedTokens) {
      // changedTokens.forEach(({name, value}) => {
      //   this.props.removeFacet({ name }, value)
      // });
    }

    let { q } = this.state

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

    /* No of words in the query */
    const hasMoreTerms = term.match(/\s/gi)
    const showWordSuggestion =
      this.props.wordSuggestion && !!(hasMoreTerms && hasMoreTerms.length)

    const { allowedCharacters } = this.context.config

    /* Update state */
    this.updateQueryTerm({
      term,
      searchInput,
      startToken,
      endToken,
      leftPosition,
      showWordSuggestion,
      partialWord
    })

    /* Clear fuzzy term selection on query change */
    this.clearFuzzyQueryTerm()

    /* Close auto suggest early */
    if (showWordSuggestion && !partialWord) {
      return this.closeAutoSuggest()
    }

    /* Which request */
    const ajaxRequest = showWordSuggestion
      ? this.props.executeFacetSearch(term, partialWord)
      : this.props.executeFuzzyAutoSuggest(term)

    if (
      allowedCharacters &&
      !checkForAllowedCharacters(term, allowedCharacters)
    ) {
      this.terminateAutoSuggest()
    } else {
      ajaxRequest.then((results) => {
        if (!results) return
        /* Prepare results */
        const res = getAutoCompleteResults(
          results,
          this.context.config.facets,
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

        this.setState({
          results: finalResults,
          isOpen: this.state.q ? !!finalResults.length : false
        })
      })
    }

    /* Remove currently selected item from the autosuggest */
    this.clearActiveClass()
  }

  clearActiveClass = () => {
    let nodes = this.suggestionsContainer.querySelectorAll(
      this.props.classNames
    )
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove(this.props.activeClassName)
    }
  }

  updateCursor = (start) => {
    setTimeout(() => this.inputEl.input._input.setSelectionRange(start, start))
  }

  onKeyDown = (direction, event) => {
    let { classNames, activeClassName } = this.props
    let fullActiveClass = '.' + activeClassName
    let nodes = this.suggestionsContainer.querySelectorAll(classNames)

    if (!nodes.length) {
      if (
        this.props.history.length &&
        ['tab', 'space'].indexOf(direction) === -1
      ) {
        return this.clearQueryTerm()
      }
    }

    let target = this.suggestionsContainer.querySelector(fullActiveClass)
    let index = target ? [].indexOf.call(nodes, target) : -1
    let next

    switch (direction) {
      case 'up':
        this.clearActiveClass()
        next = nodes[Math.max(0, --index)]
        if (index < 0) {
          next.classList.remove(activeClassName)
          if (index === -1) this.clearFuzzyQueryTerm()
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
        } else {
          next.classList.add(activeClassName)
        }
        break

      case 'tab':
      case 'space':
        if (this.props.wordSuggestion) {
          if (this.state.results[index]) {
            if (direction === 'tab') event.preventDefault()
            return this.onFuzzySelect(this.state.results[index])
          } else {
            if (direction === 'tab') this.onSoftBlur(event)
            return
          }
        }
        break
    }

    let term = this.state.results[index] ? this.state.results[index] : null
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

    /* Check if there are any tokens */
    if (this.props.tokens.length) {
      this.props.removeAllFacets()
      this.props.tokens.forEach(({ value, name }) => {
        let facet = find(propEq('name', name))(this.context.config.facets)
        this.props.addFacet(facet, value)
      })
    }

    this.setState({
      results: [],
      isOpen: false
    })

    /* Update query term */
    this.props.updateQueryTerm(this.state.q, this.state.searchInput)

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
      searchPageUrl: this.context.config.searchPageUrl,
      routeChange: !this.props.forceRedirect,
      replaceQueryParamName: this.context.config.replaceQueryParamName
    })

    /* Clear timeout */
    if (this._autosearch) clearTimeout(this._autosearch)
  }

  onFuzzySelect = (suggestion, options) => {
    let { type } = suggestion
    let facet
    let isTaxonomy = type === TYPE_TAXONOMY
    let isEntity = type === TYPE_ENTITY
    let isQuery = type === TYPE_QUERY
    let isHistory = type === TYPE_HISTORY
    let isFacet = type === TYPE_FACET
    let term = suggestion.suggestion_raw || suggestion.term
    let stayOpen = options && options.stayOpen
    
    /* Focus on the input if click event */
    if (options && options.event && options.event.type === 'click') {
      // To do
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
      facet = find(propEq('name', suggestion.taxo_label))(
        this.context.config.facets
      )
      this.props.addToken({
        startToken: this.state.startToken,
        endToken: this.state.startToken + suggestion.term.length,
        isHidden: true,
        value: suggestion.term,
        name: facet.name
      })

      // /* Do not submit if user is continuing to filter */
      return
    }

    if (isEntity || isTaxonomy) {
      /**
       * For Barack Obama in Climate
       */
      if (suggestion.taxo_label && suggestion.taxo_term) {
        facet = find(propEq('name', suggestion.taxo_label))(
          this.context.config.facets
        )
        this.props.replaceFacet(
          facet,
          suggestion.taxo_path || suggestion.taxo_term
        )
      }
      this.props.updateQueryTerm(term, SEARCH_INPUTS.SUGGESTION)
    }
    if (isQuery || isHistory) {
      if (suggestion.taxo_label && suggestion.taxo_term) {
        /* Remove all selected facets */
        this.props.removeAllFacets()
        facet = find(propEq('name', suggestion.taxo_label))(
          this.context.config.facets
        )
        this.props.replaceFacet(
          facet,
          suggestion.taxo_path || suggestion.taxo_term
        )
      }
      this.props.updateQueryTerm(term, SEARCH_INPUTS.SUGGESTION)
    }
    
    return this.onSelect(suggestion, { ...options, fromSuggestion: true })
  }
  onFocus = (event) => {
    /* Set scroll position on phone */
    if (this.props.isPhone && this.props.scrollOnFocus) {
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
      results: []
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
      showZone,
      className,
      translate,
      resultLimit,
      resultLimitDesktop,
      isDesktop
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
    const { showSuggestionHelp } = this.context.config
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
        ? q.substr(0, startToken) + fuzzyQuery.term + q.substr(endToken) || q
        : fuzzyQuery.term
      : q

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
            showZone={showZone}
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
          />

          <div
            className={klass}
            style={{
              left: leftPosition,
              width:
                showWordSuggestion && leftPosition > 0
                  ? this.props.wordSuggestionWidth
                  : 'auto'
            }}
          >
            <div className='ola-suggestions-wrapper' ref={this.registerRef}>
              {showSuggestionHelp ? (
                <div className='ola-suggestions-help'>
                  {q ? (
                    showWordSuggestion ? (
                      translate('autosuggest_help_facets')
                    ) : (
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
                q={q}
              />
            </div>
          </div>

          {!isOpen &&
            isFocused &&
            !queryTerm &&
            this.props.showHelp && <QueryHelp />}
        </div>
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
    wordSuggestion: ownProps.wordSuggestion && state.Device.isDesktop
  }
}

module.exports = connect(mapStateToProps, {
  executeFuzzyAutoSuggest,
  updateQueryTerm,
  replaceFacet,
  removeAllFacets,
  executeSearch,
  setSearchSource,
  clearHistory,
  log,
  executeFacetSearch,
  addFacet,
  addToken,
  removeToken,
  removeAllTokens
})(injectTranslate(listensToClickOutside(AutoComplete)))

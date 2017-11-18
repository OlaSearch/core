import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import listensToClickOutside from 'react-onclickoutside'
import { executeFuzzyAutoSuggest } from './../../actions/AutoSuggest'
import { clearHistory } from './../../actions/History'
import { updateQueryTerm, replaceFacet, removeAllFacets, executeSearch, setSearchSource } from './../../actions/Search'
import Input from './Input'
import { checkForAllowedCharacters, trim, getCoords, mergeResultsWithHistory } from './../../utilities'
import injectTranslate from './../../decorators/OlaTranslate'
import scrollIntoView from 'dom-scroll-into-view'
import classNames from 'classnames'
import FuzzySuggestions from './FuzzySuggestions'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false,
      fuzzyQuery: null,
      isOpen: false,
      q: props.q,
      results: []
    }
  }

  static propTypes = {
    showFacetSuggestions: PropTypes.bool,
    autoFocus: PropTypes.bool,
    forceRedirect: PropTypes.bool,
    onSubmit: PropTypes.func,
    viewAllClassName: PropTypes.string,
    placeholder: PropTypes.string
  };

  static contextTypes = {
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  };

  static defaultProps = {
    showBookmarks: true,
    classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
    activeClassName: 'ola-active',
    viewAllClassName: 'ola-autosuggest-all',
    placeholder: 'Enter keywords',
    showZone: false,
    className: 'ola-autosuggest',
    containerClass: 'ola-autosuggest-container',
    showGeoLocation: false,
    visibleCategoryGroups: null,
    autoFocus: false,
    forceRedirect: false,
    q: '',
    scrollOnFocus: true,
    scrollPadding: 16,
    resultLimit: 5,
    resultLimitDesktop: 10,
    searchOnSelect: false,
    searchTimeout: 400
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.q !== this.props.q) {
      this.setState({
        q: nextProps.q,
        fuzzyQuery: null,
        results: []
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
  };
  updateFuzzyQueryTerm = (term) => {
    this.setState({
      fuzzyQuery: term
    })
  };
  closeAutoSuggest = () => {
    this.setState({
      isOpen: false
    })
  };
  updateQueryTerm = (term, searchInput) => {
    this.setState({
      q: term,
      searchInput
    })
  };
  clearQueryTerm = (cb) => {
    this.setState({
      q: '',
      fuzzyQuery: null,
      results: mergeResultsWithHistory(this.props.history, []),
      isOpen: this.props.history.length > 0
    }, cb)
  };
  handleHistoryChange = (newHistory) => {
    this.setState({
      results: mergeResultsWithHistory(newHistory, [])
    })
  };
  terminateAutoSuggest = () => {
    this.setState({
      isOpen: false,
      results: []
    })
  };
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
  };

  onChange = (term, searchInput) => {
    let { q } = this.state
    /* Trim text */
    if (term && term.length && trim(term) === '') return

    if (!term && !q) {
      this.closeAutoSuggest()
      return
    }

    if (!term) return this.clearQueryTerm()

    let { allowedCharacters } = this.context.config

    this.updateQueryTerm(term, searchInput)

    this.clearFuzzyQueryTerm()

    if (allowedCharacters && !checkForAllowedCharacters(term, allowedCharacters)) {
      this.terminateAutoSuggest()
    } else {
      this.props.executeFuzzyAutoSuggest(term)
        .then((results) => {
          if (!results) return

          /* Parse payload */
          let res = []
          let categoryFound = false

          for (let i = 0, len = results.length; i < len; i++) {
            let { payload, ...rest } = results[i]
            if (typeof payload === 'string') payload = JSON.parse(payload)
            let isCategory = payload.taxo_terms && payload.taxo_terms.length > 0 && !categoryFound && payload.type !== 'taxonomy'

            /* If categories are found, we will need to create additional array items */
            if (isCategory) {
              let categories = this.props.visibleCategoryGroups ? payload.taxo_terms.filter((item) => {
                let [name] = item.split('|')
                return this.props.visibleCategoryGroups.indexOf(name) !== -1
              }) : payload.taxo_terms

              let totalCategories = categories.length
              /* Get the display names of the facets */
              let facet = find(propEq('name', payload.taxo_label))(this.context.config.facets)

              res.push({
                ...rest,
                suggestion_raw: payload.suggestion_raw,
                label: payload.label,
                answer: payload.answer,
                type: 'query' /* The first item is a query */
              })
              for (let j = 0; j < totalCategories; j++) {
                let [ name ] = payload.taxo_terms[j].split('|')
                let [ path ] = payload.taxo_paths ? payload.taxo_paths[j].split('|') : []
                let displayName = facet ? facet.facetNames[name] || name : name
                res.push({
                  ...rest,
                  taxo_term: displayName,
                  isLastCategory: j === totalCategories - 1,
                  isFirstCategory: j === 0,
                  ...payload,
                  suggestion_raw: payload.suggestion_raw,
                  taxo_path: path
                })
                categoryFound = true
              }
            } else {
              res.push({ ...rest, ...payload })
            }
          }

          this.setState({
            results: mergeResultsWithHistory(this.props.history, res, this.state.q),
            isOpen: this.state.q ? !!results.length : false
          })
        })
    }

    /* Remove currently selected item from the autosuggest */
    this.clearActiveClass()
  };

  clearActiveClass = () => {
    let nodes = this.suggestionsContainer.querySelectorAll(this.props.classNames)
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove(this.props.activeClassName)
    }
  };

  onKeyDown = (direction) => {
    let { classNames, activeClassName } = this.props
    let fullActiveClass = '.' + activeClassName
    let nodes = this.suggestionsContainer.querySelectorAll(classNames)

    if (!nodes.length) return

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
    }

    let term = this.state.results[index] ? this.state.results[index] : null
    term && this.updateFuzzyQueryTerm(term)

    /* Add a timeout */
    if (this.props.searchOnSelect && !this.props.isPhone && term) {
      if (this._autosearch) clearTimeout(this._autosearch)
      this._autosearch = setTimeout(() => {
        this.onSubmit(null, { stayOpen: true })
      }, this.props.searchTimeout)
    }

    scrollIntoView(next, this.suggestionsContainer, {
      onlyScrollIfNeeded: true
    })
  };

  onSubmit = (event, options) => {
    /* If there is a fuzzy term */
    if (this.state.fuzzyQuery) {
      return this.onFuzzySelect(this.state.fuzzyQuery, options)
    }

    this.setState({
      results: [],
      isOpen: false
    })

    /* Remove all selected facets */
    /* Keep the selected facets if its a freeform search */
    // this.props.removeAllFacets()

    /* Update query term */
    this.props.updateQueryTerm(this.state.q, this.state.searchInput)

    /* Trigger search */
    this.onSelect(this.state.q)

    /* trigger blur on mobile devices */
    if (this.props.isPhone) {
      setTimeout(() => document.activeElement.blur(), 100)
    }

    event && event.preventDefault()
  };

  onSelect = (suggestion) => {
    if (this.props.onSelect) {
      this.props.onSelect(suggestion, {
        removeAllFacets: this.props.removeAllFacets,
        updateQueryTerm: this.props.updateQueryTerm
      })
    }
    if (this.props.forceRedirect) {
      this.props.setSearchSource('suggest')
    }

    this.props.executeSearch({
      forceRedirect: this.props.forceRedirect,
      searchPageUrl: this.context.config.searchPageUrl,
      routeChange: !this.props.forceRedirect,
      replaceQueryParamName: this.context.config.replaceQueryParamName
    })

    /* Clear timeout */
    if (this._autosearch) clearTimeout(this._autosearch)
  };

  onFuzzySelect = (suggestion, options) => {
    let { type, path } = suggestion
    let facet
    let isTaxonomy = type === 'taxonomy'
    let isEntity = type === 'entity'
    let isQuery = type === 'query'
    let isHistory = type === 'history'
    // let hasQueryTerm = isQuery || (isEntity && suggestion.taxo_terms)
    let term = suggestion.suggestion_raw || suggestion.term
    let stayOpen = options && options.stayOpen

    if (!stayOpen) {
      this.setState({
        results: [],
        isOpen: false,
        fuzzyQuery: null
      })
    }

    /* Update state */
    this.updateQueryTerm(term)

    if (isEntity || isTaxonomy) {
      /**
       * For Barack Obama in Climate
       */
      if (suggestion.taxo_label && suggestion.taxo_term) {
        facet = find(propEq('name', suggestion.taxo_label))(this.context.config.facets)
        this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term)
        this.props.updateQueryTerm(term)
      } else {
        this.props.updateQueryTerm(path || term)
      }
    }
    if (isQuery || isHistory) {
      if (suggestion.taxo_label && suggestion.taxo_term) {
        /* Remove all selected facets */
        this.props.removeAllFacets()
        facet = find(propEq('name', suggestion.taxo_label))(this.context.config.facets)
        this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term)
      }
      this.props.updateQueryTerm(term)
    }

    return this.onSelect(suggestion)
  };

  onFocus = (event) => {
    /* Set scroll position on phone */
    if (this.props.isPhone && this.props.scrollOnFocus) {
      document.documentElement.scrollTop = document.body.scrollTop = getCoords(event.target).top - this.props.scrollPadding
    }

    this.setState({
      isFocused: true,
      isOpen: true,
      results: mergeResultsWithHistory(this.props.history, this.state.results, this.state.q)
    })

    this.props.onFocus && this.props.onFocus(event)
  };

  onBlur = (event) => {
    this.setState({
      isFocused: false,
      results: []
    })

    this.props.onBlur && this.props.onBlur(event)
  };

  onSoftBlur = (e) => {
    if (!e.relatedTarget) return
    if (this.suggestionsContainer.contains(e.relatedTarget)) return

    this.setState({
      isFocused: false,
      isOpen: false,
      fuzzyQuery: null,
      results: []
    })
  };

  registerRef = (input) => {
    this.suggestionsContainer = input
  };

  render () {
    const {
      showZone,
      className,
      translate,
      resultLimit,
      resultLimitDesktop,
      isDesktop
    } = this.props
    let { isFocused, fuzzyQuery, q, results } = this.state
    if (results.length > resultLimit) {
      results.length = isDesktop ? resultLimitDesktop : resultLimit
    }
    const { showSuggestionHelp } = this.context.config
    const isOpen = !results.length ? false : this.state.isOpen
    const klass = classNames('ola-suggestions', { 'ola-js-hide': !isOpen })
    const klassContainer = classNames(className, {
      'ola-autosuggest-focus': isFocused,
      'ola-autosuggest-blur': !isFocused,
      'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
    })
    const queryTerm = fuzzyQuery ? fuzzyQuery.term || q : q
    return (
      <div className={klassContainer}>
        <div className={this.props.containerClass}>
          <Input
            q={queryTerm}
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
            autoFocus={this.props.autoFocus}
            isPhone={this.props.isPhone}
            onBlur={this.onSoftBlur}
            handleClose={this.terminateAutoSuggest}
          />

          <div className={klass}>
            <div className='ola-suggestions-wrapper' ref={this.registerRef}>
              {showSuggestionHelp
                ? <div className='ola-suggestions-help'>
                  {q
                      ? translate('autosuggest_help')
                      : <span>
                        {translate('autosuggest_help_history')}
                        <a onClick={this.props.clearHistory} className='ola-suggestions-clear'>clear</a>
                      </span>
                    }
                </div>
                : null
              }
              <FuzzySuggestions
                results={results}
                onSelect={this.onFuzzySelect}
                onRemoveHistory={this.onRemoveHistory}
                activeClassName={this.props.activeClassName}
                q={q}
              />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isPhone: state.Device.isPhone,
    isDesktop: state.Device.isDesktop,
    facets: state.QueryState.facet_query,
    history: state.AppState.history
  }
}

module.exports = connect(mapStateToProps, { executeFuzzyAutoSuggest, updateQueryTerm, replaceFacet, removeAllFacets, executeSearch, setSearchSource, clearHistory })(injectTranslate(listensToClickOutside(AutoComplete)))

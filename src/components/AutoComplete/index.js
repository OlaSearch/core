import React from 'react'
import { connect } from 'react-redux'
import listensToClickOutside from 'react-onclickoutside'
import { executeFuzzyAutoSuggest } from './../../actions/AutoSuggest'
import { updateQueryTerm, replaceFacet, removeAllFacets, executeSearch, navigateToResultsPage } from './../../actions/Search'
import Input from './Input'
import { checkForAllowedCharacters, trim } from './../../utilities'
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
    showFacetSuggestions: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    forceRedirect: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    viewAllClassName: React.PropTypes.string,
    placeholder: React.PropTypes.string
  };

  static contextTypes = {
    config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
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
    enabledFocusBlur: true,
    showGeoLocation: false,
    categoryGroup: 'section_s',
    visibleCategoryGroups: null,
    autoFocus: false,
    forceRedirect: false,
    q: ''
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.q !== this.props.q) {
      this.setState({
        q: nextProps.q
      })
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
  clearQueryTerm = (term) => {
    this.setState({
      q: '',
      fuzzyQuery: null,
      results: [],
      isOpen: false
    })

    this.props.updateQueryTerm('')
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

    /* Get the display names of the facets */
    let facet = find(propEq('name', this.props.categoryGroup))(this.context.config.facets)

    if (allowedCharacters && !checkForAllowedCharacters(term, allowedCharacters)) {
      this.terminateAutoSuggest()
    } else {
      this.props.executeFuzzyAutoSuggest(term)
        .then((results) => {
          if (!results) return

          /* Parse payload */
          let res = []
          let categoryFound = false

          for (let i = 0; i < results.length; i++) {
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

              res.push({
                ...rest,
                suggestion_raw: payload.suggestion_raw,
                label: payload.label,
                type: payload.type
              })

              for (let j = 0; j < totalCategories; j++) {
                let [ name ] = payload.taxo_terms[j].split('|')
                let [ path ] = payload.taxo_paths ? payload.taxo_paths[j].split('|') : []
                let displayName = facet.facetNames[name] || name
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
            results: res,
            isOpen: this.state.q ? !!results.length : false
          })
        })
    }

    /* Remove currently selected item from the autosuggest */
    this.clearActiveClass()
  };

  onClear = () => {
    this.clearQueryTerm()
  };

  clearActiveClass = () => {
    let nodes = this.refs.suggestionsContainer.querySelectorAll(this.props.classNames)
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove(this.props.activeClassName)
    }
  };

  onKeyDown = (direction) => {
    let { classNames, activeClassName } = this.props
    let { suggestionsContainer } = this.refs
    let fullActiveClass = '.' + activeClassName
    let nodes = suggestionsContainer.querySelectorAll(classNames)

    if (!nodes.length) return

    let target = suggestionsContainer.querySelector(fullActiveClass)
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

    scrollIntoView(next, suggestionsContainer, {
      onlyScrollIfNeeded: true
    })
  };

  onSubmit = (event) => {
    this.closeAutoSuggest()
    /* If there is a fuzzy term */
    if (this.state.fuzzyQuery) {
      return this.onFuzzySelect(this.state.fuzzyQuery)
    }

    this.setState({
      results: [],
      isOpen: false
    })

    /* Remove all selected facets */
    /* Keep the selected facets if its a freeform search */
    this.props.removeAllFacets()

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

    this.props.executeSearch({
      forceRedirect: this.props.forceRedirect,
      searchPageUrl: this.context.config.searchPageUrl,
      routeChange: !this.props.forceRedirect
    })
  };

  onFuzzySelect = (suggestion) => {
    let { type, label, path } = suggestion
    let facet
    let isTaxonomy = type === 'taxonomy'
    let isEntity = type === 'entity'
    let isQuery = type === 'query'
    let hasQueryTerm = isQuery || (isEntity && suggestion.taxo_terms)
    let term = suggestion.suggestion_raw || suggestion.term

    this.setState({
      q: hasQueryTerm ? term : '',
      results: [],
      isOpen: false,
      fuzzyQuery: null
    })

    /* Remove all selected facets */
    this.props.removeAllFacets()

    if (isEntity || isTaxonomy) {
      /**
       * For Barack Obama in Climate
       */
      if (suggestion.taxo_label && suggestion.taxo_term) {
        facet = find(propEq('name', suggestion.taxo_label))(this.context.config.facets)
        this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term)
        this.props.updateQueryTerm(term)
      } else {
        facet = find(propEq('name', label))(this.context.config.facets)
        this.props.replaceFacet(facet, path || term)
        /* Remove query term */
        this.clearQueryTerm()
      }
    }
    if (isQuery) {
      if (suggestion.taxo_label && suggestion.taxo_term) {
        facet = find(propEq('name', suggestion.taxo_label))(this.context.config.facets)
        this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term)
      }
      this.props.updateQueryTerm(term)
    }

    return this.onSelect(suggestion)
  };

  onFocus = (event) => {
    this.setState({
      isFocused: true
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

  onSoftBlur = (event) => {
    this.setState({
      isFocused: false
    })
  };

  render () {
    var {
      showZone,
      className,
      translate,
      enabledFocusBlur
    } = this.props
    var { isFocused, fuzzyQuery, q, results, isOpen } = this.state
    var klass = classNames('ola-suggestions', { 'ola-js-hide': !isOpen })
    var klassContainer
    if (enabledFocusBlur) {
      klassContainer = classNames(className, {
        'ola-autosuggest-focus': isFocused,
        'ola-autosuggest-blur': !isFocused,
        'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
      })
    } else {
      klassContainer = className
    }
    var queryTerm = fuzzyQuery ? fuzzyQuery.term || q : q

    return (
      <div className={klassContainer}>
        <div className={this.props.containerClass}>
          <Input
            q={queryTerm}
            onChange={this.onChange}
            onClear={this.onClear}
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
            handleClose={this.closeAutoSuggest}
          />

          <div className={klass}>
            <div className='ola-suggestions-wrapper' ref='suggestionsContainer'>
              <FuzzySuggestions
                results={results}
                onSelect={this.onFuzzySelect}
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
    isPhone: state.Device.isPhone
  }
}

module.exports = connect(mapStateToProps, { executeFuzzyAutoSuggest, updateQueryTerm, replaceFacet, removeAllFacets, executeSearch, navigateToResultsPage })(injectTranslate(listensToClickOutside(AutoComplete)))

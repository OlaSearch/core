import React from 'react'
import { connect } from 'react-redux'
import listensToClickOutside from 'react-onclickoutside'
import { executeFuzzyAutoSuggest } from './../../actions/AutoSuggest'
import Input from './Input'
import { buildQueryString, getHistoryCharacter } from './../../services/urlSync'
import { checkForAllowedCharacters, trim, pickDeep } from './../../utilities'
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
    AutoSuggest: React.PropTypes.object.isRequired,
    showFacetSuggestions: React.PropTypes.bool,
    dispatch: React.PropTypes.func.isRequired,
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
    visibleCategoryGroups: ['credit-card-detail-page', 'save', 'borrow', 'invest', 'insure', 'help-centre']
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
  updateQueryTerm = (term) => {
    this.setState({
      q: term
    })
  };
  clearQueryTerm = (term) => {
    this.setState({
      q: '',
      fuzzyQuery: null,
      results: [],
      isOpen: false
    })
  };
  terminateAutoSuggest = () => {
    this.setState({
      isOpen: false,
      results: []
    })
  };
  handleClickOutside = (event) => {
    if (this.state.isOpen) {
      this.closeAutoSuggest()

      /**
       * For Fuzzy suggestion, restore the original query term
       */
      if (event && event.nativeEvent && event.nativeEvent.type === 'keydown') {
        this.clearFuzzyQueryTerm()
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
        .then((response, xhr) => {
          let results = pickDeep(response.suggest, 'suggestions')
          /* Parse payload */
          let res = []
          let categoryFound = false
          for (let i = 0; i < results.length; i++) {
            let item = results[i]
            let payload = JSON.parse(item.payload)
            if (payload.categories && !categoryFound) {
              let categories = payload.categories.filter((item) => {
                let [name] = item.split('|')
                return this.props.visibleCategoryGroups.indexOf(name) !== -1
              })
              let totalCategories = categories.length
              for (let j = 0; j < totalCategories; j++) {
                let [ name ] = payload.categories[j].split('|')
                let displayName = facet.facetNames[name] || name
                res.push({
                  ...item,
                  category_id: name,
                  category_name: displayName,
                  category_group: payload.category_group,
                  isLastCategory: j === totalCategories - 1,
                  isFirstCategory: j === 0
                })
                categoryFound = true
              }
            } else {
              res.push({ ...item, payload })
            }
          }
          this.setState({
            results: res,
            isOpen: !!results.length
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

    /* If onSelect prop is set */
    this.setState({
      results: []
    })
    if (this.props.onSelect) return this.props.onSelect(this.state.q)

    let { searchPageUrl, history } = this.context.config
    let url = buildQueryString({ q: this.state.q })
    window.location.href = searchPageUrl + getHistoryCharacter(history) + url
    event && event.preventDefault()
  };

  onFuzzySelect = (suggestion) => {
    let { payload, term } = suggestion
    let { taxo_group: taxoGroup, taxo_id } = payload
    /* If onSelect prop is set */
    if (this.props.onSelect) {
      this.closeAutoSuggest()
      this.setState({
        q: term,
        results: []
      })
      return this.props.onSelect(suggestion)
    }
    let { searchPageUrl, history } = this.context.config
    let url
    if (taxoGroup) {
      url = buildQueryString({ facet_query: [{ name: taxoGroup, selected: taxo_id }] })
    } else {
      url = buildQueryString({ q: term })
    }
    window.location.href = searchPageUrl + getHistoryCharacter(history) + url
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
            onSearchButtonClick={this.props.onSearchButtonClick}
            results={results}
            showZone={showZone}
            fuzzyQuery={fuzzyQuery}
            showGeoLocation={this.props.showGeoLocation}
            onGeoLocationSuccess={this.props.onGeoLocationSuccess}
            onGeoLocationDisable={this.props.onGeoLocationDisable}
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

module.exports = connect(null, { executeFuzzyAutoSuggest })(injectTranslate(listensToClickOutside(AutoComplete)))

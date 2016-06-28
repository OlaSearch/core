import React from 'react'
import { connect } from 'react-redux'
import listensToClickOutside from 'react-onclickoutside'
import { updateQueryTerm, executeAutoSuggest, clearQueryTerm, closeAutoSuggest, terminateAutoSuggest } from './../../actions/AutoSuggest'
import SearchResults from './../SearchResults'
import Input from './Input'
import TermSuggestion from './../SpellSuggestions/TermSuggestion'
import SpellSuggestion from './../SpellSuggestions/SpellSuggestion'
import FacetSuggestion from './FacetSuggestion'
import { buildQueryString, getHistoryCharacter } from './../../services/urlSync'
import { checkForAllowedCharacters } from './../../utilities'
import injectTranslate from './../../decorators/olaTranslate'
import scrollIntoView from 'dom-scroll-into-view'
import classNames from 'classnames'

class AutoSuggest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false
    }
  }

  static propTypes = {
    AutoSuggest: React.PropTypes.object.isRequired,
    bookmarks: React.PropTypes.array,
    showFacetSuggestions: React.PropTypes.bool,
    dispatch: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func,
    viewAllClassName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    facetSuggestionName: React.PropTypes.string
  };

  static contextTypes = {
    config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
  };

  static defaultProps = {
    showBookmarks: true,
    showFacetSuggestions: false,
    classNames: '.ola-snippet, .ola-facet-suggestion',
    activeClassName: 'ola-active',
    viewAllClassName: 'ola-autosuggest-all',
    placeholder: 'Enter keywords',
    facetSuggestionName: ''
  };

  handleClickOutside = (event) => {
    let { isOpen } = this.props.AutoSuggest
    let { dispatch } = this.props

    if (isOpen) {
      dispatch(closeAutoSuggest())
    }

    this.onBlur()
  };

  onChange = (term) => {
    let { dispatch } = this.props

    if (!term) return dispatch(clearQueryTerm())

    let { allowedCharacters } = this.context.config

    dispatch(updateQueryTerm(term))

    if (allowedCharacters && !checkForAllowedCharacters(term, allowedCharacters)) {
      dispatch(terminateAutoSuggest())
    } else {
      dispatch(executeAutoSuggest())
    }
  };

  onClear = () => {
    this.props.dispatch(clearQueryTerm())
  };

  clearActiveClass = (nodes, className) => {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove(className)
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
        this.clearActiveClass(nodes, activeClassName)
        next = nodes[Math.max(0, --index)]
        if (index < 0) next.classList.remove(activeClassName)
        else next.classList.add(activeClassName)
        break

      case 'down':
        this.clearActiveClass(nodes, activeClassName)
        next = nodes[Math.min(nodes.length - 1, ++index)]
        next.classList.add(activeClassName)
        break
    }

    scrollIntoView(next, suggestionsContainer, {
      onlyScrollIfNeeded: true
    })
  };

  onSubmit = (event) => {
    /* Check if there is active class */
    let target = this.refs.suggestionsContainer.querySelector('.' + this.props.activeClassName)
    if (target) {
      let linkTarget = target.nodeName === 'A' ? target : target.querySelector('a')
      if (linkTarget) linkTarget.click()
      return
    }
    this.handleViewAll()
    event && event.preventDefault()
  };

  handleViewAll = () => {
    let { q, facet_query } = this.props.AutoSuggest.query
    let { dispatch, onSubmit } = this.props
    let { searchPageUrl, history } = this.context.config

    /* Close autosuggest */
    dispatch(closeAutoSuggest())

    if (onSubmit) return onSubmit(q)

    /* Redirect to search results page */
    window.location.href = searchPageUrl + getHistoryCharacter(history) + buildQueryString({ q, facet_query })
  };

  onFocus = (event) => {
    this.setState({
      isFocused: true
    })

    this.props.onFocus && this.props.onFocus(event)
  };

  onBlur = (event) => {
    this.setState({
      isFocused: false
    })

    this.props.onBlur && this.props.onBlur(event)
  };

  render () {
    var {
      dispatch,
      AutoSuggest,
      bookmarks,
      showFacetSuggestions,
      viewAllClassName,
      facetSuggestionName,
      className,
      translate
    } = this.props

    var { isFocused } = this.state

    var {
      results,
      query,
      spellSuggestions,
      suggestedTerm,
      isOpen,
      totalResults,
      facets
    } = AutoSuggest

    var { q } = query
    var klass = classNames('ola-suggestions', { 'ola-js-hide': !isOpen })
    var klassContainer = classNames('ola-autosuggest', className, {
      'ola-autosuggest-focus': isFocused,
      'ola-autosuggest-blur': !isFocused
    })

    var shouldShowFacetSuggestions = showFacetSuggestions && !suggestedTerm && !spellSuggestions.length

    return (
      <div className={klassContainer}>
        <div className='ola-autosuggest-container'>
          <Input
            q={q}
            onChange={this.onChange}
            onClear={this.onClear}
            onKeyDown={this.onKeyDown}
            onSubmit={this.onSubmit}
            onFocus={this.onFocus}
            placeholder={translate('autosuggest_placeholder')}
            handleClickOutside={this.handleClickOutside}
            onSearchButtonClick={this.props.onSearchButtonClick}
          />
          <div className={klass}>
            <TermSuggestion term={suggestedTerm} />

            <SpellSuggestion
              suggestions={spellSuggestions}
              onChange={this.onChange}
              totalResults={totalResults}
              dispatch={dispatch}
            />

            <div className='ola-suggestions-wrapper' ref='suggestionsContainer'>

              {shouldShowFacetSuggestions &&
                <FacetSuggestion
                  facets={facets}
                  q={q}
                  name={facetSuggestionName}
                  dispatch={dispatch}
                  onSubmit={this.handleViewAll}
                />
              }
              <SearchResults
                results={results}
                isOpen={isOpen}
                dispatch={dispatch}
                bookmarks={bookmarks}
                isAutosuggest
                {...this.props.Device}
              />
            </div>
            <a
              className={viewAllClassName}
              onClick={this.handleViewAll}
            >{translate('autosuggest_viewall')}</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    AutoSuggest: state.AutoSuggest,
    Device: state.Device,
    bookmarks: state.AppState.bookmarks
  }
}

module.exports = connect(mapStateToProps)(injectTranslate(listensToClickOutside(AutoSuggest)))

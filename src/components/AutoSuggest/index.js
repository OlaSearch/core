import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import listensToClickOutside from '@olasearch/react-onclickoutside'
import {
  updateQueryTerm,
  executeAutoSuggest,
  clearQueryTerm,
  closeAutoSuggest,
  terminateAutoSuggest
} from './../../actions/AutoSuggest'
import SearchResults from './../SearchResults'
import Input from './Input'
import TermSuggestion from './../TermSuggestion'
import SpellSuggestion from './../SpellSuggestion'
import FacetSuggestion from './FacetSuggestion'
import { buildQueryString, getHistoryCharacter } from './../../services/urlSync'
import { checkForAllowedCharacters, trim } from './../../utilities'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'
import scrollIntoView from 'dom-scroll-into-view'
import classNames from 'classnames'
import withTheme from './../../decorators/withTheme'

/**
 * Searches a dynamic list (unbounded) for related keywords, phrases, and items, which may or may not match the precise query string.
 * * Displays instant search results
 */
class AutoSuggest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false,
      q: props.q
    }
  }

  static propTypes = {
    AutoSuggest: PropTypes.object.isRequired,
    bookmarks: PropTypes.array,
    showFacetSuggestions: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    viewAllClassName: PropTypes.string,
    placeholder: PropTypes.string,
    facetSuggestionName: PropTypes.string
  }

  static defaultProps = {
    showBookmarks: true,
    showFacetSuggestions: false,
    classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
    activeClassName: 'ola-active',
    viewAllClassName: 'ola-autosuggest-all',
    placeholder: 'Enter keywords',
    facetSuggestionName: ''
  }

  handleClickOutside = (event) => {
    if (this.props.AutoSuggest.isOpen) {
      this.props.dispatch(closeAutoSuggest())
    }
    if (!this.state.isFocused) return
    if (event && event.type === 'keydown') return
    this.onBlur()
  }

  onChange = (term, searchInput) => {
    const { dispatch, AutoSuggest } = this.props

    /* Trim text */
    if (term.length && trim(term) === '') return

    if (!term && !AutoSuggest.q) {
      dispatch(closeAutoSuggest())
      return
    }

    if (!term) return dispatch(clearQueryTerm())

    const { allowedCharacters } = this.props.config

    dispatch(updateQueryTerm(term, searchInput))

    if (
      allowedCharacters &&
      !checkForAllowedCharacters(term, allowedCharacters)
    ) {
      dispatch(terminateAutoSuggest())
    } else {
      dispatch(executeAutoSuggest())
    }

    /* Remove currently selected item from the autosuggest */
    this.clearActiveClass()
  }

  onClear = () => {
    this.props.dispatch(clearQueryTerm())
  }

  clearActiveClass = () => {
    const nodes = this.refs.suggestionsContainer.querySelectorAll(
      this.props.classNames
    )
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove(this.props.activeClassName)
    }
  }

  onKeyDown = (direction) => {
    const { classNames, activeClassName } = this.props
    const { suggestionsContainer } = this.refs
    const fullActiveClass = '.' + activeClassName
    const nodes = suggestionsContainer.querySelectorAll(classNames)

    if (!nodes.length) return

    const target = suggestionsContainer.querySelector(fullActiveClass)
    let index = target ? [].indexOf.call(nodes, target) : -1
    let next

    switch (direction) {
      case 'up':
        this.clearActiveClass()
        next = nodes[Math.max(0, --index)]
        if (index < 0) {
          next.classList.remove(activeClassName)
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
          this.clearActiveClass()
        } else {
          next.classList.add(activeClassName)
        }
        break
    }

    scrollIntoView(next, suggestionsContainer, {
      onlyScrollIfNeeded: true
    })
  }

  onSubmit = (event) => {
    /* Check if there is active class */
    const target = this.refs.suggestionsContainer.querySelector(
      '.' + this.props.activeClassName
    )
    if (target) {
      const linkTarget =
        target.nodeName === 'A' ? target : target.querySelector('a')
      if (linkTarget) linkTarget.click()
      return
    }
    this.handleViewAll()
    event && event.preventDefault()
  }

  handleViewAll = () => {
    const { q, facet_query } = this.props.AutoSuggest
    const { dispatch, onSubmit } = this.props
    const { searchPageUrl, history } = this.props.config

    /* Close autosuggest */
    dispatch(closeAutoSuggest())

    if (onSubmit) return onSubmit(q)

    /* Redirect to search results page */
    window.location.href =
      searchPageUrl +
      getHistoryCharacter(history) +
      buildQueryString({ q, facet_query })
  }

  onFocus = (event) => {
    this.setState({
      isFocused: true
    })

    this.props.onFocus && this.props.onFocus(event)
  }

  onBlur = (event) => {
    this.setState({
      isFocused: false
    })

    this.props.onBlur && this.props.onBlur(event)
  }

  render () {
    var {
      dispatch,
      AutoSuggest,
      bookmarks,
      showFacetSuggestions,
      viewAllClassName,
      facetSuggestionName,
      className,
      translate,
      theme
    } = this.props
    var { isFocused } = this.state
    var {
      results,
      q,
      spellSuggestions,
      suggestedTerm,
      isOpen,
      totalResults,
      facets
    } = AutoSuggest
    var klass = classNames('ola-suggestions', { 'ola-js-hide': !isOpen })
    var klassContainer = classNames('ola-autosuggest', className, {
      'ola-autosuggest-focus': isFocused,
      'ola-autosuggest-blur': !isFocused,
      'ola-speech-not-supported': !(
        window.SpeechRecognition || window.webkitSpeechRecognition
      )
    })
    var shouldShowFacetSuggestions =
      showFacetSuggestions && !suggestedTerm && !spellSuggestions.length

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
            isOpen={isOpen}
            placeholder={translate('autosuggest_placeholder')}
            handleClickOutside={this.handleClickOutside}
            onSearchButtonClick={this.props.onSearchButtonClick}
            results={results}
            handleClose={this.handleClickOutside}
            theme={this.props.theme}
          />
          <div className={klass}>
            <TermSuggestion
              q={q}
              totalResults={totalResults}
              term={suggestedTerm}
            />

            <div className='ola-suggestions-wrapper' ref='suggestionsContainer'>
              {shouldShowFacetSuggestions && (
                <FacetSuggestion
                  facets={facets}
                  q={q}
                  name={facetSuggestionName}
                  dispatch={dispatch}
                  onSubmit={this.handleViewAll}
                />
              )}
              <SearchResults
                results={results}
                isOpen={isOpen}
                dispatch={dispatch}
                bookmarks={bookmarks}
                isAutosuggest
                {...this.props.Device}
              />
            </div>
            <a className={viewAllClassName} onClick={this.handleViewAll}>
              {translate('autosuggest_viewall')}
            </a>
          </div>
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

function mapStateToProps (state) {
  return {
    AutoSuggest: state.AutoSuggest,
    Device: state.Device,
    bookmarks: state.AppState.bookmarks
  }
}

export default connect(mapStateToProps)(
  withTheme(withConfig(withTranslate(listensToClickOutside(AutoSuggest))))
)

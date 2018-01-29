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
import scrollIntoView from 'dom-scroll-into-view'
import classNames from 'classnames'

class AutoSuggest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false,
      fuzzyQuery: null
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

  static contextTypes = {
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  }

  static defaultProps = {
    showBookmarks: true,
    showFacetSuggestions: false,
    classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
    activeClassName: 'ola-active',
    viewAllClassName: 'ola-autosuggest-all',
    placeholder: 'Enter keywords',
    facetSuggestionName: '',
    showZone: false
  }

  handleClickOutside = (event) => {
    if (this.props.AutoSuggest.isOpen) {
      this.props.dispatch(closeAutoSuggest())
    }
    this.onBlur()
  }

  onChange = (term, searchInput) => {
    let { dispatch, AutoSuggest } = this.props

    /* Trim text */
    if (term.length && trim(term) === '') return

    if (!term && !AutoSuggest.q) {
      dispatch(closeAutoSuggest())
      return
    }

    if (!term) return dispatch(clearQueryTerm())

    let { allowedCharacters } = this.context.config

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
    let nodes = this.refs.suggestionsContainer.querySelectorAll(
      this.props.classNames
    )
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove(this.props.activeClassName)
    }
  }

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
    let target = this.refs.suggestionsContainer.querySelector(
      '.' + this.props.activeClassName
    )
    if (target) {
      let linkTarget =
        target.nodeName === 'A' ? target : target.querySelector('a')
      if (linkTarget) linkTarget.click()
      return
    }
    this.handleViewAll()
    event && event.preventDefault()
  }

  handleViewAll = () => {
    let { q, facet_query } = this.props.AutoSuggest
    let { dispatch, onSubmit } = this.props
    let { searchPageUrl, history } = this.context.config

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
      showZone,
      viewAllClassName,
      facetSuggestionName,
      className,
      translate
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
            showZone={showZone}
            handleClose={this.handleClickOutside}
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
  withTranslate(listensToClickOutside(AutoSuggest))
)

import React from 'react'
import PropTypes from 'prop-types'
import Bookmarks from './../Bookmarks'
import SpeechInput from './../Speech'
import classNames from 'classnames'
import { SEARCH_INPUTS } from './../../constants/Settings'
import {
  escapeRegEx,
  scrollTo,
  // stringToColor,
  // hexToRGBa,
  highlightTokens,
  sortArrayByLength,
  getDisplayName
} from './../../utilities'
import InputShadow from './InputShadow'
import GeoLocation from './../Geo/GeoLocation'
import ContentEditable from './../ContentEditable'
import equals from 'ramda/src/equals'
import Search from '@olasearch/icons/lib/material-search'
import Cross from '@olasearch/icons/lib/x'

export default class Input extends React.Component {
  static propTypes = {
    q: PropTypes.string,
    onChange: PropTypes.func
  }

  onClear = () => {
    /* Focus input */
    this.props.onClear(() => this.input.focus())
  }

  onFocus = (event) => {
    /**
     * If its already focused
     */
    if (this.props.isFocused) return

    /* Scroll to input */
    if (this.props.isPhone) scrollTo(this.input)

    /* Call onFocus event */
    this.props.onFocus && this.props.onFocus(event)

    if (!event.target.value) return

    /* Persist event */
    event.persist()

    setTimeout(() => this.props.onChange(event))
  }

  handleMouseDown = (event) => {
    if (!this.props.q) return
    event.persist()
    event.stopPropagation()
    /* Check if element already is focused. Only then fire */
    if (
      document.activeElement === event.target &&
      this.props.showWordSuggestion
    ) {
      setTimeout(() => this.props.onChange(event))
    }
  }

  onKeyDown = (event) => {
    var { onKeyDown, onSubmit, isOpen, q } = this.props

    switch (event.which) {
      case 27: // Esc
        /**
         * When autosuggest is closed and user presses escape key multiple times,
         * Clear query term
         */
        // if (!isOpen) return this.onClear(event)
        if (!isOpen) return this.input.select()
        return this.props.handleClickOutside(event)

      case 39: // Right
        /**
         * If fuzzy query, do nothing
         */
        if (event.shiftKey || !this.getShadowTerm()) return
        return onKeyDown('down', event)
      // return this.props.onChange(this.getShadowTerm(true))

      case 38: // Up
        /**
         * Escape key closes the autosuggests
         * Once closed, when user presses Arrow up/down, we should show the results
         */
        event.preventDefault()
        if (!isOpen && q) return this.props.onChange(event)
        return onKeyDown('up', event)

      case 40: // Down
        event.preventDefault()
        if (!isOpen && q) return this.props.onChange(event)
        return onKeyDown('down', event)

      case 37:
        return this.props.onChange(event)

      case 32: // Space
        return onKeyDown('space', event)

      case 9: // Tab
        return onKeyDown('tab', event)

      case 13: // Enter
        event.preventDefault() // Prevents firing onChange
        return onSubmit()
    }
  }

  onSearchButtonClick = () => {
    return this.props.onSearchButtonClick
      ? this.props.onSearchButtonClick()
      : this.input.focus()
  }

  handleInputChange = (arg, searchInput) => {
    this.props.onChange(arg, searchInput)

    /* Check if tokens have been changed */
    const [oldTokens, newTokens] = this.formatValue(arg.target.value, true)
    if (!newTokens || !equals(oldTokens, newTokens)) {
      setTimeout(() => this.props.onTokenChange(newTokens))
    }
  }
  handleSpeechChange = (text) => {
    this.handleInputChange(text, SEARCH_INPUTS.VOICE)
    this.props.onSubmit()
  }
  getShadowTerm = (raw = false) => {
    const { fuzzyQuery, q, results } = this.props
    const shadowTerm = !fuzzyQuery && q && results.length ? results[0].term : ''
    if (!q) return ''
    const reg = new RegExp('^' + escapeRegEx(q), 'gi')
    try {
      const exists = reg.test(shadowTerm)
      if (!exists || shadowTerm === q) {
        return ''
      }
      return raw
        ? shadowTerm
        : shadowTerm.replace(new RegExp('(' + escapeRegEx(q) + ')', 'gi'), q)
    } catch (err) {
      console.warn(err)
    }
  }
  registerRef = (input) => {
    this.input = input
  }
  formatValue = (value, returnTokens = false) => {
    if (!value) return ''
    const tokens = this.props.fuzzyTokens || this.props.tokens
    const terms = tokens
      .map(({ value }) => getDisplayName(value))
      .concat()
      .sort(sortArrayByLength)

    /* If no tokens, return value */
    if (!terms.length) return value

    /* Raw value */
    const rawValue = value

    /* Token regex */
    const regX = new RegExp(
      '(' + terms.join('|').replace(/(\(|\))/gi, '\\$1') + ')',
      'gi'
    )
    const newTokens = []
    value = value.replace(regX, (match) => {
      const escapedMatch = match.replace(/(\(|\))/gi, '\\$1')
      /* Add to list of token */
      returnTokens && newTokens.push(match)
      const name = tokens
        .filter(({ value }) => {
          return value.match(new RegExp('^' + escapedMatch + '$', 'gi'))
        })
        .reduce((acc, o) => o.name, null)
      if (!name) return match
      // const color = hexToRGBa(stringToColor(name))
      return `<span class='ola-input-tag'>${match}</span>`
    })

    return returnTokens ? [terms, newTokens] : highlightTokens(rawValue, tokens)
  }
  render () {
    var {
      q,
      placeholder,
      onBlur,
      showGeoLocation,
      showWordSuggestion,
      showSearchButton
    } = this.props

    const classes = classNames('ola-search-form-container')
    const shadowTerm = showWordSuggestion ? '' : this.getShadowTerm()
    return (
      <div className={classes}>
        <div className='ola-form-input-wrapper'>
          <ContentEditable
            innerRef={this.registerRef}
            type='text'
            value={q}
            className='ola-text-input'
            onChange={this.handleInputChange}
            onFocus={this.onFocus}
            onBlur={onBlur}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            autoFocus={this.props.autoFocus}
            formatValue={this.formatValue}
            onMouseDown={this.handleMouseDown}
          />

          <InputShadow value={shadowTerm} />
        </div>

        {q && (
          <button
            type='button'
            className='ola-clear-button'
            tabIndex='-1'
            onClick={this.onClear}
            aria-label='Clear Search'
          >
            <Cross />
          </button>
        )}

        {this.props.showAlert && null}

        {showGeoLocation ? (
          <GeoLocation
            active={false}
            onSuccess={this.props.onGeoLocationSuccess}
            onDisable={this.props.onGeoLocationDisable}
            refreshOnGeoChange={this.props.refreshOnGeoChange}
            onError={this.props.onGeoError}
            showLabel={false}
          />
        ) : null}

        <SpeechInput
          onResult={this.handleSpeechChange}
          onFinalResult={this.handleSpeechChange}
          isAutosuggest
        />

        <Bookmarks onOpen={this.props.handleClose} />

        {showSearchButton ? (
          <button
            type='button'
            className='ola-search-button'
            onClick={this.onSearchButtonClick}
            aria-label='Search'
          >
            <Search />
          </button>
        ) : null}
      </div>
    )
  }
}

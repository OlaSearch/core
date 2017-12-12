import React from 'react'
import PropTypes from 'prop-types'
import Bookmarks from './../Bookmarks'
import History from './../History'
import SpeechInput from './../Speech'
import Zone from './../Zone'
import classNames from 'classnames'
import { SEARCH_INPUTS } from './../../constants/Settings'
import {
  escapeRegEx,
  scrollTo,
  stringToColor,
  hexToRGBa
} from './../../utilities'
import InputShadow from './InputShadow'
import GeoLocation from './../Geo/GeoLocation'
import ContentEditable from './../ContentEditable'
import equals from 'ramda/src/equals'

export default class Input extends React.Component {
  static propTypes = {
    q: PropTypes.string,
    onChange: PropTypes.func
  }

  onClear = (event) => {
    /* Focus input */
    this.props.onClear(() => this.input.focus())
  }

  onFocus = (event) => {
    /* Scroll to input */
    if (this.props.isPhone) scrollTo(this.input)

    /* Call onFocus event */
    this.props.onFocus && this.props.onFocus(event)

    if (!event.target.value) return

    /* Persist event */
    event.persist()

    setTimeout(() => this.props.onChange(event))
  }

  onChangeZone = () => {
    this.input.focus()
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
    let [oldTokens, newTokens] = this.formatValue(arg.target.value, true)
    if (!newTokens || !equals(oldTokens, newTokens)) {
      setTimeout(() => this.props.onTokenChange(newTokens))
    }
  }
  handleSpeechChange = (text) => {
    this.handleInputChange(text, SEARCH_INPUTS.VOICE)
    this.props.onSubmit()
  }
  getShadowTerm = (raw = false) => {
    let { fuzzyQuery, q, results } = this.props
    let shadowTerm = !fuzzyQuery && q && results.length ? results[0].term : ''
    if (!q) return ''
    let reg = new RegExp('^' + escapeRegEx(q), 'gi')
    if (!reg.test(shadowTerm) || shadowTerm === q) {
      return ''
    } else {
      return raw
        ? shadowTerm
        : shadowTerm.replace(new RegExp('(' + escapeRegEx(q) + ')', 'gi'), q)
    }
  }
  registerRef = (input) => {
    this.input = input
  }
  formatValue = (value, returnTokens = false) => {
    if (!value) return ''
    const terms = this.props.tokens.map(({ value }) => value)
    /* If no tokens, return value */
    if (!terms.length) return value

    /* Token regex */
    const regX = new RegExp('\\b(' + terms.join('|') + ')\\b', 'gi')
    const newTokens = []
    value = value.replace(regX, (match, startToken) => {
      /* Add to list of token */
      returnTokens && newTokens.push(match)
      let name = this.props.tokens.filter(({ value }) => value === match).reduce((acc, o) => o.name, null)
      if (!name) return match
      let color = hexToRGBa(stringToColor(name))
      return `<span style='background-color: ${color}' class='ola-input-tag'>${match}</span>`
    })

    return returnTokens ? [terms, newTokens] : value
  }
  render () {
    var { q, placeholder, onBlur, showZone, showGeoLocation, showWordSuggestion } = this.props

    let klass = classNames('ola-search-form-container', {
      'ola-search-zone-enabled': showZone
    })
    let shadowTerm = showWordSuggestion ? '' : this.getShadowTerm()
    return (
      <div className={klass}>
        {showZone && <Zone isAutosuggest onChange={this.onChangeZone} />}
        <div className='ola-form-input-wrapper'>
          <ContentEditable
            ref={this.registerRef}
            type='text'
            value={q}
            className='ola-text-input ola-text-input-round'
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
            onClick={this.onFocus}
          />

          <InputShadow value={shadowTerm} />
        </div>

        {q && (
          <button
            type='button'
            className='ola-clear-button'
            tabIndex='-1'
            onClick={this.onClear}
          />
        )}

        {this.props.showAlert && null}

        {showGeoLocation ? (
          <GeoLocation
            active={false}
            onSuccess={this.props.onGeoLocationSuccess}
            onFailure={this.props.onGeoLocationFailure}
            onDisable={this.props.onGeoLocationDisable}
            onError={this.props.onGeoError}
          />
        ) : null}

        <SpeechInput
          onResult={this.handleSpeechChange}
          onFinalResult={this.handleSpeechChange}
          isAutosuggest
        />

        <History onOpen={this.props.handleClose} />

        <Bookmarks onOpen={this.props.handleClose} />

        <button
          type='button'
          className='ola-search-button'
          onClick={this.onSearchButtonClick}
        />
      </div>
    )
  }
}

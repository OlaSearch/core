import React from 'react'
import PropTypes from 'prop-types'
import Bookmarks from './../Bookmarks'
import History from './../History'
import SpeechInput from './../Speech'
import Zone from './../Zone'
import classNames from 'classnames'
import { SEARCH_INPUTS } from './../../constants/Settings'

export default class Input extends React.Component {
  static propTypes = {
    q: PropTypes.string,
    onChange: PropTypes.func
  };

  onClear = (event) => {
    event && event.preventDefault()

    /* Do not call blur event when its a button */
    if (event.target.nodeName === 'INPUT' && !event.target.value) {
      event.target.blur()
      this.props.handleClickOutside(event)
      return
    }

    /* Clear query term */
    this.props.onClear()

    /* Focus input */
    this.refs.Input.focus()
  };

  onFocus = (event) => {
    this.props.onFocus && this.props.onFocus(event)

    if (!event.target.value) return

    /* Persist event */
    event.persist()

    setTimeout(() => this.props.onChange(event.target.value))
  };

  onChangeZone = () => {
    this.refs.Input.focus()
  };

  onKeyDown = (event) => {
    var { onKeyDown, onSubmit, isOpen, q } = this.props
    switch (event.which) {
      case 27: // Esc
        /**
         * When autosuggest is closed and user presses escape key multiple times,
         * Clear query term
         */
        if (!isOpen) return this.onClear(event)
        return this.props.handleClickOutside(event)

      case 38: // Up
        /**
         * Escape key closes the autosuggests
         * Once closed, when user presses Arrow up/down, we should show the results
         */
        event.preventDefault()
        if (!isOpen && q) return this.props.onChange(q)
        return onKeyDown('up')

      case 40: // Down
        event.preventDefault()
        if (!isOpen && q) return this.props.onChange(q)
        return onKeyDown('down')

      case 9: // Tab
        break
      case 13: // Enter
        return onSubmit()
    }
  };

  onSearchButtonClick = () => {
    return this.props.onSearchButtonClick ? this.props.onSearchButtonClick() : this.refs.Input.focus()
  };

  handleInputChange = (arg, searchInput) => {
    this.props.onChange(arg.target ? arg.target.value : arg, searchInput)
  };
  handleSpeechChange = (text) => {
    this.handleInputChange(text, SEARCH_INPUTS.VOICE)
  };
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.q !== this.props.q ||
      nextProps.results !== this.props.results
    )
  }
  render () {
    var {
      q,
      placeholder,
      onBlur,
      showZone
    } = this.props

    /**
     * Show clear or submit button
     */

    var button = q
      ? <button type='reset' className='ola-clear-button' onClick={this.onClear} />
      : <button type='button' className='ola-search-button' onClick={this.onSearchButtonClick} />

    let klass = classNames('ola-search-form-container', {
      'ola-search-zone-enabled': showZone
    })

    return (
      <div className={klass}>
        {showZone &&
          <Zone
            isAutosuggest
            onChange={this.onChangeZone}
          />
        }
        <input
          ref='Input'
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
        />

        {button}

        <SpeechInput
          onResult={this.handleSpeechChange}
          onFinalResult={this.handleSpeechChange}
          isAutosuggest
        />

        <Bookmarks />

        <History />
      </div>
    )
  }
}

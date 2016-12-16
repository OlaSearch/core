import React from 'react'
import Bookmarks from './../Bookmarks'
import History from './../History'
import SpeechInput from './../Speech'
import Zone from './../Zone'
import classNames from 'classnames'
import { SEARCH_INPUTS } from './../../constants/Settings'
import { escapeRegEx, scrollTo } from './../../utilities'
import InputShadow from './InputShadow'
import GeoLocation from './../Geo/GeoLocation'

export default class Input extends React.Component {
  static propTypes = {
    q: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  onClear = (event) => {
    // event && event.preventDefault()

    // /* Do not call blur event when its a button */
    // if (event.target.nodeName === 'INPUT' && !event.target.value) {
    //   event.target.blur()
    //   this.props.handleClickOutside(event)
    //   return
    // }

    /* Clear query term */
    this.props.onClear()

    /* Focus input */
    this.refs.Input.focus()
  };

  onFocus = (event) => {
    /* Scroll to input */
    if (this.props.isPhone) scrollTo(this.refs.Input)

    /* Call onFocus event */
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
        // if (!isOpen) return this.onClear(event)
        if (!isOpen) return this.refs.Input.select()
        return this.props.handleClickOutside(event)

      case 39: // Right
        /**
         * If fuzzy query, do nothing
         */
        if (event.shiftKey || !this.getShadowTerm()) return
        return onKeyDown('down')
        // return this.props.onChange(this.getShadowTerm(true))

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
        this.props.onBlur && this.props.onBlur(event)
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
    this.props.onSubmit()
  };
  getShadowTerm = (raw = false) => {
    let { fuzzyQuery, q, results } = this.props
    let shadowTerm = !fuzzyQuery && q && results.length ? results[0].term : ''
    if (!q) return ''
    let reg = new RegExp('^' + escapeRegEx(q), 'gi')
    if (!reg.test(shadowTerm) || shadowTerm === q) {
      return ''
    } else {
      return raw ? shadowTerm : shadowTerm.replace(new RegExp('(' + escapeRegEx(q) + ')', 'gi'), q)
    }
  };
  render () {
    var {
      q,
      placeholder,
      onBlur,
      showZone,
      showGeoLocation
    } = this.props

    let klass = classNames('ola-search-form-container', {
      'ola-search-zone-enabled': showZone
    })
    let shadowTerm = this.getShadowTerm()

    return (
      <div className={klass}>
        {showZone &&
          <Zone
            isAutosuggest
            onChange={this.onChangeZone}
          />
        }
        <div className='ola-form-input-wrapper'>
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
            autoFocus={this.props.autoFocus}
          />

          <InputShadow
            value={shadowTerm}
          />
        </div>

        {q && <button type='button' className='ola-clear-button' onClick={this.onClear} />}

        {showGeoLocation
          ? <GeoLocation
            active={false}
            onSuccess={this.props.onGeoLocationSuccess}
            onFailure={this.props.onGeoLocationFailure}
            onDisable={this.props.onGeoLocationDisable}
            onError={this.props.onGeoError}
          />
          : null
        }

        <SpeechInput
          onResult={this.handleSpeechChange}
          onFinalResult={this.handleSpeechChange}
          isAutosuggest
        />

        <History onOpen={this.props.handleClose} />

        <Bookmarks onOpen={this.props.handleClose} />

        <button type='button' className='ola-search-button' onClick={this.onSearchButtonClick} />
      </div>
    )
  }
}

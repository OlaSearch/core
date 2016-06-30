import React from 'react'
import Bookmarks from './../Bookmarks'
import History from './../History'
import SpeechInput from './../Speech'

export default class Input extends React.Component {
  static propTypes = {
    q: React.PropTypes.string,
    onChange: React.PropTypes.func
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

  onKeyDown = (event) => {
    var { onKeyDown, onSubmit } = this.props
    switch (event.which) {

      case 27: // Esc
        this.onClear(event)
        break
      case 38: // Up
        onKeyDown('up')
        break

      case 40: // Down
        onKeyDown('down')
        break

      case 9: // Tab
        break
      case 13: // Enter
        onSubmit()
        break
    }
  };

  onSearchButtonClick = () => {
    return this.props.onSearchButtonClick ? this.props.onSearchButtonClick() : this.refs.Input.focus()
  };

  handleInputChange = (arg) => {
    this.props.onChange(arg.target ? arg.target.value : arg)
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.q !== this.props.q
  }
  render () {
    var {
      q,
      placeholder,
      onBlur
    } = this.props

    /* Show clear or submit button */

    var button = q
      ? <button type='reset' className='ola-clear-button' onClick={this.onClear}></button>
      : <button type='button' className='ola-search-button' onClick={this.onSearchButtonClick} />

    return (
      <div className='ola-search-form-container'>
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
          onResult={this.handleInputChange}
          onFinalResult={this.handleInputChange}
        />

        <Bookmarks />

        <History />
      </div>
    )
  }
}

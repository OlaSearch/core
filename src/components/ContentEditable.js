import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders an input field as contenteditable
 * @example ./src/components/ContentEditable.md
 */
export default class ContentEditable extends React.Component {
  static defaultProps = {
    formatValue: null
  }
  static propTypes = {
    formatValue: PropTypes.func
  }
  updateFakeEl = () => {
    this.fakeEl.innerHTML = this.props.formatValue
      ? this.props.formatValue(this.props.value)
      : this.props.value
  }
  componentDidMount () {
    this.updateFakeEl()
  }
  registerFakeRef = (el) => {
    this.fakeEl = el
  }
  componentDidUpdate (prevProps) {
    this.updateFakeEl()
  }
  registerRef = (el) => {
    this._input = el
    this.props.innerRef && this.props.innerRef(el)
  }
  render () {
    let {
      formatValue,
      onMatchChange,
      value,
      placeholder,
      innerRef,
      ...rest
    } = this.props
    /* iOS 8 bug where placeholder is displayed even when value is not empty */
    return (
      <div className='ContentEditableWrapper'>
        <input
          type='text'
          className='ola-text-input'
          ref={this.registerRef}
          {...rest}
          value={value}
          placeholder={value ? '' : placeholder}
        />
        <div
          ref={this.registerFakeRef}
          contentEditable
          readOnly
          className='ContentEditable-Fake'
          tabIndex={-1}
        />
      </div>
    )
  }
}

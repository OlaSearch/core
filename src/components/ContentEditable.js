import React from 'react'
import equals from 'ramda/src/equals'

export default class ContentEditable extends React.Component {
  static defaultProps = {
    formatValue: null
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
  registerRef = (el) => (this._input = el)
  render () {
    let { formatValue, onMatchChange, value, placeholder, ...rest } = this.props
    /* iOS 8 bug where placeholder is displayed even when value is not empty */
    return (
      <div className='ContentEditableWrapper'>
        <input
          type='text'
          className='ola-text-input ola-text-input-round'
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

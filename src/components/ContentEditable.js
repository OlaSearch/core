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
  static defaultProps = {
    matches: []
  }
  componentDidUpdate (prevProps) {
    this.updateFakeEl()
  }
  registerRef = (el) => (this._input = el)
  render () {
    let { formatValue, onMatchChange, ...rest } = this.props
    return (
      <div className='ContentEditableWrapper'>
        <input
          type='text'
          className='ola-text-input ola-text-input-round'
          ref={this.registerRef}
          {...rest}
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

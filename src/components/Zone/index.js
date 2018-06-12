import React from 'react'
import { connect } from 'react-redux'
import SelectBox from './../SelectBox'

class Zone extends React.Component {
  handleChange = (event) => {}
  static defaultProps = {
    values: []
  }
  render () {
    const { values, field } = this.props
    if (!values.length) return null
    return (
      <div className='ola-zone'>
        <SelectBox onChange={this.handleChange} value={''} inline>
          {values.map(({ name, displayName }, idx) => {
            return (
              <option key={idx} value={name}>
                {displayName}
              </option>
            )
          })}
        </SelectBox>
      </div>
    )
  }
}

export default connect(null, {})(Zone)

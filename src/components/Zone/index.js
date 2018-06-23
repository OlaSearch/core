import React from 'react'
import { connect } from 'react-redux'
import SelectBox from './../SelectBox'

function Zone ({ values }) {
  function handleChange () {}
  if (!values.length) return null
  return (
    <div className='ola-zone'>
      <SelectBox onChange={handleChange} value={''} inline>
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

Zone.defaultProps = {
  values: []
}

export default connect(null)(Zone)

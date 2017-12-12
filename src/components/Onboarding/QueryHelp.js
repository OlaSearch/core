import React from 'react'
import { connect } from 'react-redux'

function QueryHelp ({ isNewUser }) {
  if (!isNewUser) return null
  return (
    <div className='ola-query-help'>
      You can use long queries such as :{' '}
      <strong>
        what is the gdp of cambodia and thailand in the last 3 years
      </strong>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isNewUser: state.Context.isNewUser
  }
}

module.exports = connect(mapStateToProps)(QueryHelp)

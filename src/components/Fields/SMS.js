import React from 'react'
import { connect } from 'react-redux'

const SMS = ({ number, body, iconLeft = null, iconRight = null, label, Device, placeholder = '' }) => {
  let { isApple, isPhone } = Device

  if (!isPhone || !number) return placeholder ? <p className='ola-field ola-field-sms'>{placeholder}</p> : null

  let bodyText = isApple && isApple.device ? '&body' : '?body'
  let link = `sms:${number}${bodyText}=${body}`

  return (
    <a
      href={link}
      className='ola-btn ola-btn-sms'
    >
      {iconLeft}
      {label}
      {iconRight}
    </a>
  )
}

function mapStateToProps (state) {
  return {
    Device: state.Device
  }
}

module.exports = connect(mapStateToProps)(SMS)

import React from 'react'
import { connect } from 'react-redux'
import FieldLabel from './FieldLabel'

function SMS ({ number, body, iconLeft = null, iconRight = null, label, Device, placeholder = '', fieldLabel }) {
  let { isApple, isPhone } = Device

  if (!isPhone || !number) return placeholder ? <p className='ola-field ola-field-sms'>{placeholder}</p> : null

  let bodyText = isApple && isApple.device ? '&body' : '?body'
  let link = `sms:${number}${bodyText}=${body}`

  return (
    <div className='ola-field ola-field-sms'>
      <FieldLabel label={fieldLabel} />
      <a
        href={link}
        className='ola-btn ola-btn-sms'
      >
        {iconLeft}
        {label}
        {iconRight}
      </a>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    Device: state.Device
  }
}

module.exports = connect(mapStateToProps)(SMS)

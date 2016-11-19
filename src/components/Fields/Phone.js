import React from 'react'
import { sanitizePhone } from './../../utilities'
import injectTranslate from './../../decorators/OlaTranslate'

const Phone = (props) => {
  let { phone, label, translate, ...rest } = props

  if (!phone) return null

  let url = 'tel://' + sanitizePhone(phone)

  return <a href={url} className='ola-btn ola-btn-call' {...rest}>{label || translate('call_label')}</a>
}

module.exports = injectTranslate(Phone)

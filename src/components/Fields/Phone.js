import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const Phone = (props) => {
  let { phone, translate, ...rest } = props

  if (!phone) return null

  let url = 'tel://' + phone

  return <a href={url} className='ola-btn ola-btn-call' {...rest}>{translate('call_label')}</a>
}

module.exports = injectTranslate(Phone)

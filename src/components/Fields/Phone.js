import React from 'react'
import { sanitizePhone } from './../../utilities'
import injectTranslate from './../../decorators/OlaTranslate'
import withLogger from './../../decorators/OlaLogger'

const Phone = (props) => {
  let { phone, label, translate, log, onClick, result, ...rest } = props

  if (!phone) return null

  let url = 'tel://' + sanitizePhone(phone)

  return (
    <a
      href={url}
      className='ola-cta-button ola-btn-call'
      onClick={(event) => {
        log({
          eventType: 'C',
          result: result,
          eventCategory: 'Call',
          eventAction: 'click'
        })
        onClick && onClick(event, result)
      }}
      {...rest}>
      {label || translate('call_label')}
    </a>
  )
}

module.exports = withLogger(injectTranslate(Phone))

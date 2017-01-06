import React from 'react'
import { sanitizePhone } from './../../utilities'
import injectTranslate from './../../decorators/OlaTranslate'
import withLogger from './../../decorators/OlaLogger'

const Phone = (props) => {
  let { phone, label, translate, log, onClick, result, snippetId, ...rest } = props

  if (!phone) return null

  let url = 'tel://' + sanitizePhone(phone)

  function handleClick (event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Call',
      eventAction: 'click',
      snippetId: snippetId
    })
    onClick && onClick(event, result)
  }

  return (
    <a
      href={url}
      className='ola-cta-button ola-btn-call'
      onClick={handleClick}
      {...rest}>
      {label || translate('call_label')}
    </a>
  )
}

module.exports = withLogger(injectTranslate(Phone))

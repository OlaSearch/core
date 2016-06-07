import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Phone = (props) => {
  let { phone, title, ...rest } = props

  if (!phone) return NO_SCRIPT_TAG

  let url = 'tel://' + phone

  return <a href={url} className='ola-btn ola-btn-call' {...rest}>{title}</a>
}

Phone.defaultProps = {
  title: 'Call'
}

module.exports = Phone

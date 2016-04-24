import React from 'react'

const Phone = (props) => {
  let { phone, title, ...rest } = props

  if (!phone) return <noscript />

  let url = 'tel://' + phone

  return <a href={url} className='ola-btn ola-btn-call' {...rest}>{title}</a>
}

Phone.defaultProps = {
  title: 'Call'
}

module.exports = Phone

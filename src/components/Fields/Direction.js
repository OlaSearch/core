import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Directions = (props) => {
  var { latlong, ...rest } = props

  if (!latlong) return NO_SCRIPT_TAG

  var url = `https://www.google.com/maps?q=${latlong}`

  return <a className='ola-btn ola-btn-directions' {...rest} href={url}>Get directions</a>
}

module.exports = Directions

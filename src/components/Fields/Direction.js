import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const Directions = (props) => {
  var { latlong, translate, ...rest } = props

  if (!latlong) return null

  var url = `https://www.google.com/maps?q=${latlong}`

  return <a className='ola-btn ola-btn-directions' {...rest} href={url}>{translate('get_directions_label')}</a>
}

module.exports = injectTranslate(Directions)

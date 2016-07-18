import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const Directions = (props) => {
  var { latlong, translate, iconLeft = null, iconRight = null, ...rest } = props

  if (!latlong) return null

  var url = `https://www.google.com/maps/dir//${latlong}`

  return (
    <a className='ola-btn ola-btn-directions' href={url} {...rest}>
      {iconLeft}
      {translate('get_directions_label')}
      {iconRight}
    </a>
  )
}

module.exports = injectTranslate(Directions)

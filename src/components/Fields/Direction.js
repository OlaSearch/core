import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'
import withLogger from './../../decorators/OlaLogger'

const Directions = (props) => {
  var { latlong, translate, label, iconLeft = null, iconRight = null, onClick, result, log, ...rest } = props

  if (!latlong) return null
  if (typeof latlong === 'object') {
    latlong = `${latlong.lat},${latlong.lon}`
  }

  var url = `https://www.google.com/maps/dir//${latlong}`

  return (
    <a className='ola-btn ola-btn-directions'
      onClick={(event) => {
        log({
          eventType: 'C',
          result: result,
          eventCategory: 'Get Directions',
          eventAction: 'click',
          debounce: true,
          snippetId: props.snippetId
        })
        onClick && onClick(event)
      }}
      href={url}
      {...rest}>
      {iconLeft}
      {label || translate('get_directions_label')}
      {iconRight}
    </a>
  )
}

module.exports = injectTranslate(withLogger(Directions))

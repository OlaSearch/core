import React from 'react'
import injectTranslate from './../../decorators/injectTranslate'
import withLogger from './../../decorators/withLogger'
import FieldLabel from './FieldLabel'
import { isArray } from 'util';

function Directions (props) {
  var {
    latlong,
    translate,
    label,
    iconLeft = null,
    iconRight = null,
    onClick,
    result,
    log,
    fieldLabel,
    snippetId,
    showIfEmpty,
    distanceFieldName,
    collectionId,
    ...rest
  } = props

  if (!latlong) return null
  if (Array.isArray(latlong) && latlong.length) {
    latlong = latlong[0] /* Take the first latlng */
  }
  else if (typeof latlong === 'object') {
    latlong = `${latlong.lat},${latlong.lon}`
  }

  const url = `https://www.google.com/maps/dir//${latlong}`
  /* Calculate distance */
  const distanceValue = result[distanceFieldName]
  const distance = distanceValue ? `${parseFloat(Math.round(distanceValue * 100) / 100).toFixed(2)} ${translate('distance_unit')}` : null

  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Get Directions',
      eventAction: 'click',
      debounce: true,
      snippetId
    })
    onClick && onClick(event)
  }

  return (
    <div className='ola-field ola-field-directions'>
      <FieldLabel label={fieldLabel} />
      <a
        className='ola-btn ola-btn-directions'
        onClick={handleClick}
        href={url}
        {...rest}
      >
        {iconLeft}
        {label || translate('get_directions_label')}
        {iconRight}
      </a>
      {distance
        ? <div className='ola-field-distance'>
            {distance}
          </div>
        : null
      }
    </div>
  )
}

Directions.defaultProps = {
  distanceFieldName: 'ola_distance'
}

module.exports = injectTranslate(withLogger(Directions))

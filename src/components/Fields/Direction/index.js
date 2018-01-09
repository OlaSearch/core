import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../../../decorators/injectTranslate'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'

/**
 * Displays a Get directions button with distance
 */
function Directions (props) {
  var {
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
    locationFieldName,
    collectionId,
    ...rest
  } = props

  let latlong = result[locationFieldName]
  if (!latlong && !showIfEmpty) return null
  if (Array.isArray(latlong) && latlong.length) {
    latlong = latlong[0] /* Take the first latlng */
  } else if (typeof latlong === 'object') {
    latlong = `${latlong.lat},${latlong.lon}`
  }

  const url = `https://www.google.com/maps/dir//${latlong}`
  /* Calculate distance */
  const distanceValue = result[distanceFieldName]
  const distance = distanceValue
    ? `${parseFloat(Math.round(distanceValue * 100) / 100).toFixed(
        2
      )} ${translate('distance_unit')}`
    : null

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
        target='_blank'
        {...rest}
      >
        {iconLeft}
        {label || translate('get_directions_label')}
        {iconRight}
      </a>
      {distance ? <div className='ola-field-distance'>{distance}</div> : null}
    </div>
  )
}

Directions.propTypes = {
  distanceFieldName: PropTypes.string,
  locationFieldName: PropTypes.string,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  result: PropTypes.object,
  translate: PropTypes.func,
  fieldLabel: PropTypes.string,
}

Directions.defaultProps = {
  distanceFieldName: 'ola_distance',
  locationFieldName: 'ola_location',
  result: {},
  fieldLabel: null
}

module.exports = injectTranslate(withLogger(Directions))

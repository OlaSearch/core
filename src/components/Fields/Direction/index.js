import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../../../decorators/withTranslate'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'
import MapPin from '@olasearch/icons/lib/map-pin'

/**
 * Displays a Get directions button with distance
 */
function Directions (props) {
  var {
    translate,
    locationName,
    label,
    iconSize,
    iconRight,
    onClick,
    result,
    log,
    fieldLabel,
    snippetId,
    showIfEmpty,
    distanceFieldName,
    locationFieldName,
    collectionId,
    displayIcon,
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
      debounce: false,
      snippetId
    })
    onClick && onClick(event)
  }

  return (
    <div className='ola-field ola-field-directions'>
      <FieldLabel label={fieldLabel} />
      <a
        className='ola-btn ola-flex ola-btn-directions'
        onClick={handleClick}
        href={url}
        target='_blank'
        {...rest}
      >
        {displayIcon && (
          <span className='ola-flex-icon'>
            <MapPin size={iconSize} />
          </span>
        )}
        {locationName && (
          <span className='ola-flex-content'>
            {locationName}{' '}
            {distance ? (
              <span className='ola-field-distance'>{distance}</span>
            ) : null}
          </span>
        )}
        {label && <span className='ola-flex-content'>{label}</span>}
        {iconRight && <span className='ola-flex-icon'>{iconRight}</span>}
      </a>
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
  fieldLabel: PropTypes.string
}

Directions.defaultProps = {
  distanceFieldName: 'ola_distance',
  locationFieldName: 'ola_location',
  result: {},
  iconSize: 20,
  displayIcon: false,
  iconRight: null,
  fieldLabel: null
}

module.exports = withTranslate(withLogger(Directions))
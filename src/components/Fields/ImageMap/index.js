import React from 'react'
import PropTypes from 'prop-types'
import Thumbnail from './../Thumbnail'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'

/**
 * Displays a Google map image
 */
function ImageMap (props) {
  var {
    latlong,
    key,
    width,
    height,
    onClick,
    result,
    log,
    fieldLabel,
    logPayload
  } = props

  if (!latlong) return null

  if (typeof latlong === 'object') {
    latlong = `${latlong.lat},${latlong.lon}`
  }

  let url = `https://www.google.com/maps?q=${latlong}`
  let map = `https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=${width}x${height}&maptype=roadmap&markers=color:blue|label:A|${latlong}&key=${key}`

  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Map',
      eventAction: 'click',
      eventLabel: 'Map',
      snippetId: props.snippetId,
      payload: logPayload
    })
    onClick && onClick(event, result)
  }

  return (
    <div className='ola-field ola-field-map'>
      <FieldLabel label={fieldLabel} />
      <a
        href={url}
        target='_blank'
        className='field field-url'
        onClick={handleClick}
      >
        <Thumbnail thumbnail={map} thumbnail_mobile={map} />
      </a>
    </div>
  )
}

ImageMap.defaultProps = {
  key: '',
  width: 200,
  height: 200
}

ImageMap.propTypes = {
  /**
   * Latlong of the location
   */
  latlong: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * Google map api key
   */
  key: PropTypes.string,
  /**
   * Width of the image map
   */
  width: PropTypes.number,
  /**
   * Height of the image map
   */
  height: PropTypes.number
}

module.exports = withLogger(ImageMap)

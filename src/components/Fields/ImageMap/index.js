import React from 'react'
import Thumbnail from './../Thumbnail'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'

/**
 * Displays a Google map image
 */
function ImageMap (props) {
  var {
    latlong,
    apiKey,
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
  let map = `https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=${width}x${height}&maptype=roadmap&markers=color:blue|label:A|${latlong}&key=${apiKey}`

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

Map.defaultProps = {
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY',
  width: 200,
  height: 200
}

module.exports = withLogger(ImageMap)

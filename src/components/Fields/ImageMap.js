import React from 'react'
import Thumbnail from './Thumbnail'
import withLogger from './../../decorators/OlaLogger'
import FieldLabel from './FieldLabel'

const Map = (props) => {
  var { latlong, apiKey, width, height, onClick, result, log, fieldLabel } = props

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
      snippetId: props.snippetId
    })
    onClick && onClick(event, result)
  }

  return (
    <div classname='ola-field ola-field-map'>
      <FieldLabel label={fieldLabel} />
      <a
        href={url}
        className='field field-url'
        onClick={handleClick}
      >
        <Thumbnail
          thumbnail={map}
          thumbnail_mobile={map}
        />
      </a>
    </div>
  )
}

Map.defaultProps = {
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY',
  width: 200,
  height: 200
}

module.exports = withLogger(Map)

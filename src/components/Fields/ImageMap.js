import React from 'react'
import Thumbnail from './Thumbnail'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Map = (props) => {
  var { latlong, apiKey, width, height } = props

  if (!latlong) return NO_SCRIPT_TAG

  if (typeof latlong === 'object') {
    latlong = `${latlong.lat},${latlong.lon}`
  }

  let url = `https://www.google.com/maps?q=${latlong}`
  let map = `https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=${width}x${height}&maptype=roadmap&markers=color:blue|label:A|${latlong}&key=${apiKey}`

  return (
    <a
      href={url}
      className='field field-url'
    >
      <Thumbnail
        thumbnail={map}
        thumbnail_mobile={map}
      />
    </a>
  )
}

Map.defaultProps = {
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY',
  width: 200,
  height: 200
}

module.exports = Map

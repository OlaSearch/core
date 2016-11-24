import React from 'react'
import Thumbnail from './Thumbnail'
import { NO_SCRIPT_TAG } from './../../constants/Settings'
import withLogger from './../../decorators/OlaLogger'

const Map = (props) => {
  var { latlong, apiKey, width, height, onClick, result } = props

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
      onClick={(event) => {
        props.log({
          eventType: 'C',
          result,
          eventCategory: 'Map',
          eventAction: 'click',
          eventLabel: 'Map',
          snippetId: props.snippetId,
          collectionId: props.collectionId
        })
        onClick && onClick(event, result)
      }}
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

module.exports = withLogger(Map)

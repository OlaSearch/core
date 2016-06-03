import React from 'react'
import Thumbnail from './Thumbnail'

const Map = (props) => {
  var { latlong, apiKey } = props

  if (!latlong) return <noscript />

  let url = `https://www.google.com/maps?q=${latlong}`
  let map = `https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x200&maptype=roadmap&markers=color:blue|label:A|${latlong}&key=${apiKey}`

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
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY'
}

module.exports = Map

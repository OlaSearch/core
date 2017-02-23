import React from 'react'
import GoogleMaps from './maputils'

class AnswerMap extends React.Component {
  componentDidMount () {
    GoogleMaps.load({ apiKey: '12' }, this.initMap)
  }
  initMap = () => {
    this.map = new google.maps.Map(this.mapEl, {
      center: {lat: -34.0622928, lng: 23.3755341},
      zoom: 4
    })

    let google = window.google

    this.bounds = new google.maps.LatLngBounds()

    /* Add click handler to map */
    this.map.addListener('click', this.handleMapClick)

    /* Info window */
    this.infowindow = new google.maps.InfoWindow({
      content: 'Loading'
    })

    this.markers = []

    /* Max zoom */
    google.maps.event.addListenerOnce(this.map, 'bounds_changed', (event) => {
      if (this.map.getZoom() > 8) {
        this.map.setZoom(7)
      }
    })

    /* Add markers */
    this.refreshMap()
  };
  handleMapClick = (event) => {
    if (this.infowindow) this.infowindow.close()
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.data !== this.props.data
  }
  componentDidUpdate (prevProps, prevState) {
    this.clearAllMarkers()
    this.refreshMap()
  }
  clearAllMarkers = () => {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
  };
  handleMarkerClick = (marker) => {
    let { title: titleKey } = this.props.data
    let { result } = marker
    let title = result[titleKey]
    let content = `
      <div className='ola-gmap-infowindow'>
        <p>${title}</p>
      </div>
    `
    this.infowindow.setContent(content)
    this.infowindow.open(this.map, marker)
  };
  refreshMap = () => {
    let { data } = this.props
    let { record_data, location: locationKey } = data

    record_data.forEach((result) => {
      let [ lat, lng ] = result[locationKey].split(',')
      let position = { lat: parseFloat(lat), lng: parseFloat(lng) }
      let latLngPosition = new google.maps.LatLng(position.lat, position.lng)
      let google = window.google

      let marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: result.title,
        result
      })

      this.markers.push(marker)

      /* Add click handler to marker */
      marker.addListener('click', () => this.handleMarkerClick(marker))

      this.bounds.extend(latLngPosition)
    })

    /* Fit to bounds */

    this.map.fitBounds(this.bounds)
  }
  registerMap = (el) => {
    this.mapEl = el
  };
  render () {
    return (
      <div className='ola-answer-map'>
        <div ref={this.registerMap} className='ola-answer-gmap' />
      </div>
    )
  }
}

module.exports = AnswerMap

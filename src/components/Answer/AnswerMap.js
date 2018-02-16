import React from 'react'
import PropTypes from 'prop-types'
import GoogleMaps from './maputils'

class AnswerMap extends React.Component {
  static defaultProps = {
    markerIcon: null
  }
  componentDidMount () {
    GoogleMaps.load(
      { apiKey: 'AIzaSyAfccsQVW0CrUzGHQ1AhQpnCYhWjZgs7bw' },
      this.context.window,
      this.context.document,
      this.initMap
    )
    this.window = this.context.window || window
  }
  static contextTypes = {
    window: PropTypes.object,
    document: PropTypes.object
  }
  initMap = () => {
    const { google } = this.window
    this.map = new google.maps.Map(this.mapEl, {
      center: { lat: -34.0622928, lng: 23.3755341 },
      zoom: 4,
      scrollwheel: false
    })

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
      if (this.map.getZoom() > 12) {
        this.map.setZoom(12)
      }
    })

    /* Add markers */
    this.refreshMap()
  }
  handleMapClick = (event) => {
    if (this.infowindow) this.infowindow.close()
  }
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.data !== this.props.data ||
      nextProps.results !== this.props.results
    )
  }
  componentDidUpdate (prevProps, prevState) {
    console.log(prevProps, this.props)
    this.clearAllMarkers()
    this.refreshMap()
  }
  clearAllMarkers = () => {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
  }
  handleMarkerClick = (marker) => {
    let { title } = marker
    let content = `
      <div className='ola-gmap-infowindow'>
        <p>${title}</p>
      </div>
    `
    this.infowindow.setContent(content)
    this.infowindow.open(this.map, marker)
  }
  refreshMap = () => {
    let { data, results } = this.props
    const { element_keys, source, title } = data
    const { google } = this.window
    /**
     * Source of the data
     */
    if (source) {
      data = results.map((result) => ({
        title: result[element_keys['title']],
        location: result[element_keys['location']]
      }))
    }

    data.filter(({ location }) => location).forEach(({ title, location }) => {
      /* Get the first location */
      if (location && location.length) location = location[0]
      let [lat, lng] = location.split(',')
      let position = { lat: parseFloat(lat), lng: parseFloat(lng) }
      let latLngPosition = new google.maps.LatLng(position.lat, position.lng)

      let marker = new google.maps.Marker({
        position,
        map: this.map,
        title,
        icon: this.props.markerIcon
      })

      this.markers.push(marker)

      /* Add click handler to marker */
      marker.addListener('click', () => this.handleMarkerClick(marker))

      this.bounds.extend(latLngPosition)
    })

    /* Final add user's location */
    if (this.props.location) {
      let [lat, lng] = this.props.location.split(',')
      let position = { lat: parseFloat(lat), lng: parseFloat(lng) }
      let latLngPosition = new google.maps.LatLng(position.lat, position.lng)
      let marker = new google.maps.Marker({
        position,
        map: this.map,
        icon: new google.maps.MarkerImage(
          '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
          new google.maps.Size(22, 22),
          new google.maps.Point(0, 18),
          new google.maps.Point(11, 11)
        )
      })
      this.bounds.extend(latLngPosition)
    }

    /* Fit to bounds */

    this.map.fitBounds(this.bounds)
  }
  registerMap = (el) => {
    this.mapEl = el
  }
  render () {
    return (
      <div className='ola-answer-map'>
        <div ref={this.registerMap} className='ola-answer-gmap' />
      </div>
    )
  }
}

module.exports = AnswerMap

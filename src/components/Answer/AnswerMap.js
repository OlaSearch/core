import React from 'react'
import PropTypes from 'prop-types'
import GoogleMaps from './maputils'
import cx from 'classnames'
import Direction from './../Fields/Direction'
import { getDocument, isBrowser } from './../../utilities'

/**
 * Displays a google map
 */
class AnswerMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasData: false,
      error: false
    }
  }
  static propTypes = {
    /**
     * Display a custom marker icon
     */
    markerIcon: PropTypes.any,
    /**
     * answer card object
     */
    card: PropTypes.object,
    /**
     * Window
     */
    window: PropTypes.object,
    /**
     * Document
     */
    document: PropTypes.object
  }
  static defaultProps = {
    markerIcon: null,
    window: isBrowser() ? window : null,
    defaultZoom: 4,
    document: getDocument()
  }
  componentDidMount () {
    GoogleMaps.load(
      { apiKey: 'AIzaSyAfccsQVW0CrUzGHQ1AhQpnCYhWjZgs7bw' },
      this.props.window,
      this.props.document,
      this.lazyInitMap
    )
  }
  lazyInitMap = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(this.initMap)
    })
  }
  initMap = () => {
    const { defaultZoom } = this.props
    const { google } = this.props.window
    const { zoom } = this.props.card
    this.map = new google.maps.Map(this.mapEl, {
      center: { lat: -34.0622928, lng: 23.3755341 },
      zoom: zoom ? parseInt(zoom) : defaultZoom,
      // maxZoom: zoom ? parseInt(zoom) : null,
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
    // google.maps.event.addListenerOnce(this.map, 'bounds_changed', this.setMaxZoom)

    /* Add markers */
    this.refreshMap()
  }
  setMaxZoom = () => {
    const { zoom } = this.props.card
    if (!zoom) return
    const intZoom = parseInt(zoom)
    if (this.map.getZoom() === intZoom) return
    this.map.setZoom(intZoom)
  }
  handleMapClick = (event) => {
    if (this.infowindow) this.infowindow.close()
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.card !== this.props.card ||
      nextProps.results !== this.props.results ||
      this.state.hasData !== nextState.hasData
    )
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.hasData !== this.state.hasData) return
    this.clearAllMarkers()
    this.refreshMap()
  }
  clearAllMarkers = () => {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
  }
  handleMarkerClick = (marker) => {
    const { title } = marker
    const content = `
      <div className='ola-gmap-infowindow'>
        <p>${title}</p>
      </div>
    `
    this.infowindow.setContent(content)
    this.infowindow.open(this.map, marker)
  }
  refreshMap = () => {
    const { card, results } = this.props
    const { source, title, element_keys } = card
    var { elements = [] } = card
    const { google } = this.props.window
    /**
     * Source of the data
     */
    if (source) {
      elements = results.map((result) => ({
        title: result[element_keys['title']],
        location: result[element_keys['location']]
      }))
    }
    /* Only display markers with location */
    elements = elements.filter(({ location }) => location)

    /* Check if any data exists */
    const hasData = elements.length > 0

    this.setState({
      hasData
    })
    /* Do nothing if no markers */
    if (!hasData) return

    elements.forEach(({ title, location }) => {
      /* Get the first location */
      if (Array.isArray(location) && location.length) location = location[0]
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

    google.maps.event.addListenerOnce(this.map, 'idle', this.setMaxZoom)
  }
  registerMap = (el) => {
    this.mapEl = el
  }
  render () {
    const classes = cx('ola-answer-map', {
      'ola-answer-map-empty': !this.state.hasData
    })
    const { card } = this.props
    const { direction, elements } = card
    const location = direction && elements.length ? elements[0].location : null
    return (
      <div className={classes}>
        <div className='ola-answer-map-element'>
          <div ref={this.registerMap} className='ola-answer-gmap' />
          {location ? (
            <Direction
              result={{
                location
              }}
              locationFieldName='location'
              label='Get directions'
            />
          ) : null}
        </div>
      </div>
    )
  }
}

module.exports = AnswerMap

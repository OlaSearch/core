import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { removeContext, requestGeoLocation } from './../../actions/Context'
import { executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/injectTranslate'
import { log } from './../../actions/Logger'

class GeoLocation extends React.Component {
  constructor (props) {
    super(props)
    if (props.active) this.getLocation()
    this._debouceLocation = this.requestGeoLocation
  }
  static defaultProps = {
    active: false
  }
  static contextTypes = {
    config: PropTypes.object
  }
  componentDidUpdate (prevProps) {
    if (prevProps.active !== this.props.active && prevProps.active) {
      // Ask for users gelocation
      this.getLocation()
    }
    this.prompt(this.props)
  }
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.Context !== this.props.Context ||
      nextProps.q !== this.props.q ||
      nextProps.isLoading === this.props.isLoading
    )
  }
  requestGeoLocation = () => {
    this.props.requestGeoLocation(this.onSuccess, this.onError)
  }
  prompt = (props) => {
    let _props = props || this.props
    let { q, isLoading } = _props
    let {
      location,
      isRequestingLocation,
      hasRequestedLocation
    } = _props.Context
    let { geoLocationKeywords } = this.context.config

    if (
      !location &&
      !isLoading &&
      !isRequestingLocation &&
      !hasRequestedLocation &&
      geoLocationKeywords &&
      q.match(new RegExp(geoLocationKeywords, 'gi'))
    ) {
      /* Prompt and ask for location */
      this._debouceLocation()
    }
  }
  getLocation = () => {
    /* If location is already stored */
    if (this.props.Context.location) {
      this.props.removeContext('geo')
      /* Refresh results */
      if (this.props.refreshOnGeoChange) this.props.executeSearch()
      this.props.onDisable && this.props.onDisable()
      return
    }

    this.props.log({
      eventType: 'C',
      eventCategory: 'Geolocation button',
      eventAction: 'request_location',
      eventLabel: 'Geolocation',
      debounce: true
    })

    this.props.requestGeoLocation(this.onSuccess, this.onError)
  }
  onSuccess = (results) => {
    if (this.props.refreshOnGeoChange) {
      this.props.executeSearch()
    }
    this.props.onSuccess && this.props.onSuccess(results)
  }
  onError = (results) => {
    this.props.onError && this.props.onError(results)
  }
  render () {
    if (!('geolocation' in navigator)) return null

    let { Context, active, translate } = this.props
    let { isRequestingLocation } = Context
    let isGeoEnabled = active || !!Context.location
    let klass = classNames('ola-link-geo', {
      'ola-link-geo-requesting': isRequestingLocation,
      'ola-link-geo-active': isGeoEnabled
    })
    let hintklass = classNames('ola-btn-hint hint--top', {
      'hint--always': isRequestingLocation
    })
    let title = isRequestingLocation
      ? translate('geo_location_requesting')
      : isGeoEnabled
        ? translate('geo_location_enabled')
        : translate('geo_location_prompt')
    return (
      <button
        type='button'
        className={klass}
        onClick={this.getLocation}
        disabled={isRequestingLocation}
      >
        <span className={hintklass} aria-label={title} />
      </button>
    )
  }
}

function mapStateToProps (state) {
  return {
    Context: state.Context,
    isLoading: state.AppState.isLoading,
    q: state.QueryState.q
  }
}

export default connect(mapStateToProps, {
  executeSearch,
  log,
  removeContext,
  requestGeoLocation
})(injectTranslate(GeoLocation))

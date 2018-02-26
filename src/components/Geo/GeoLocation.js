import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
  removeContextLocation,
  requestGeoLocation
} from './../../actions/Context'
import { executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import { log } from './../../actions/Logger'
import Navigation from '@olasearch/icons/lib/navigation'

class GeoLocation extends React.Component {
  constructor (props) {
    super(props)
    if (props.active) this.getLocation()
    this._debouceLocation = this.requestGeoLocation
  }
  static defaultProps = {
    active: false,
    icon: null,
    showLabel: false
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
      this.props.removeContextLocation()
      /* Refresh results */
      return this.props.onSuccess && this.props.onSuccess()
    }

    this.props.log({
      eventType: 'C',
      eventCategory: 'Geolocation button',
      eventAction: 'request_location',
      eventLabel: 'Geolocation',
      payload: this.props.logPayload,
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

    const { Context, active, translate, showLabel, disabled } = this.props
    const { isRequestingLocation } = Context
    const isGeoEnabled = active || !!Context.location
    const klass = classNames('ola-link-geo', this.props.className, {
      'ola-link-geo-requesting': isRequestingLocation,
      'ola-link-geo-active': isGeoEnabled
    })

    const title = isRequestingLocation
      ? translate('geo_location_requesting')
      : isGeoEnabled
        ? translate('geo_location_enabled')
        : translate('geo_location_prompt')
    return (
      <button
        type='button'
        className={klass}
        onClick={this.getLocation}
        disabled={disabled || isRequestingLocation}
      >
        <Navigation size={18} />
        {showLabel && (
          <span className='ola-link-geo-text' aria-label={title}>
            {title}
          </span>
        )}
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

module.exports = connect(mapStateToProps, {
  executeSearch,
  log,
  removeContextLocation,
  requestGeoLocation
})(withTranslate(GeoLocation))

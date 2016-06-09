import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { removeContext, requestGeoLocation } from './../../actions/Context'
import once from 'ramda/src/once'

class GeoLocation extends React.Component {
  static defaultProps = {
    active: false,
    textRequesting: 'Getting your current location',
    textEnabled: 'Stop using current location',
    textPrompt: 'Use my current location'
  };
  static contextTypes = {
    config: React.PropTypes.object
  };
  constructor (props) {
    super(props)
    if (props.active) this.getLocation()
    this._debouceLocation = once(this.requestGeoLocation)
  }
  componentDidUpdate (nextProps) {
    if (nextProps.active !== this.props.active && nextProps.active) {
      // Ask for users gelocation
      this.getLocation()
    }

    this.prompt(nextProps)
  }
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.Context !== this.props.Context ||
      nextProps.QueryState.q !== this.props.QueryState.q ||
      nextProps.AppState.isLoading === this.props.AppState.isLoading
    )
  }
  requestGeoLocation = () => {
    this.props.dispatch(requestGeoLocation(this.onSuccess, this.onError))
  };
  prompt = (props) => {
    let _props = props || this.props
    let { q } = _props.QueryState
    let { isLoading } = _props.AppState
    let { location, isRequestingLocation, hasRequestedLocation } = _props.Context
    let { geoLocationKeywords } = this.context.config

    if (!location &&
      !isLoading &&
      !isRequestingLocation &&
      !hasRequestedLocation &&
      geoLocationKeywords &&
      q.match(new RegExp(geoLocationKeywords, 'gi'))) {
      /* Prompt and ask for location */
      this._debouceLocation()
    }
  };
  getLocation = () => {
    /* If location is already stored */
    if (this.props.Context.location) {
      this.props.dispatch(removeContext('geo'))
      this.props.onDisable && this.props.onDisable()
      return
    }

    this.props.dispatch(requestGeoLocation(this.onSuccess, this.onError))
  }
  onSuccess = (results) => {
    this.props.onSuccess && this.props.onSuccess(results)
  };
  onError = (results) => {
    this.props.onError && this.props.onError(results)
  };
  render () {
    if (!('geolocation' in navigator)) return null

    let { Context, active, textPrompt, textRequesting, textEnabled } = this.props
    let { isRequestingLocation } = Context
    let isGeoEnabled = active || !!Context.location
    let klass = classNames('ola-link-geo', {
      'ola-link-geo-requesting': isRequestingLocation,
      'ola-link-geo-active': isGeoEnabled
    })
    let hintklass = classNames('ola-btn-hint hint--top', {
      'hint--always': isRequestingLocation
    })
    let title = isRequestingLocation ? textRequesting : isGeoEnabled ? textEnabled : textPrompt
    return (
      <button className={klass} onClick={this.getLocation}>
        <span className={hintklass} aria-label={title} />
      </button>
    )
  }
}

function mapStateToProps (state) {
  return {
    Context: state.Context,
    AppState: state.AppState,
    QueryState: state.QueryState
  }
}

export default connect(mapStateToProps)(GeoLocation)

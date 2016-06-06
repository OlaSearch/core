import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { removeContext, requestGeoLocation } from './../../actions/Context'
import { indexOf } from 'ramda'

class GeoLocation extends React.Component {
  static defaultProps = {
    active: false,
    keywords: '\\b(atm|branch|branches)\\b'
  };
  constructor (props) {
    super(props)
    if (props.active) this.getLocation()
  }
  componentDidUpdate (nextProps) {
    if (nextProps.active !== this.props.active && nextProps.active) {
      // Ask for users gelocation
      this.getLocation()
    }

    this.prompt(nextProps)
  }
  prompt = (props) => {
    let _props = props || this.props
    let { q } = _props.QueryState
    let { isLoading } = _props.AppState
    let { location, isRequestingLocation, hasRequestedLocation } = _props.Context

    if (!location &&
      !isLoading &&
      !isRequestingLocation &&
      !hasRequestedLocation &&
      q.match(new RegExp(_props.keywords,'gi'))) {
      /* Prompt and asl */
      this.props.dispatch(requestGeoLocation(this.onSuccess, this.onError))
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
    let { Context, active } = this.props
    let { isRequestingLocation } = Context
    let isGeoEnabled = active || !!Context.location
    let klass = classNames('ola-link-geo', {
      'ola-link-geo-requesting': isRequestingLocation,
      'ola-link-geo-active': isGeoEnabled
    })
    let hintklass = classNames('ola-btn-hint hint--top', {
      'hint--always': isRequestingLocation
    })
    let title = isRequestingLocation ? 'Getting your current location' : isGeoEnabled ? 'Stop using current location' : 'Use my current location'
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

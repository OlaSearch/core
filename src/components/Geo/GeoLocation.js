import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { removeContext } from './../../actions/Search'

class GeoLocation extends React.Component {
  static defaultProps = {
    active: false,
  };
  constructor (props) {
    super(props)

    if (props.active) this.getLocation()

    this.state = {
      isRequesting: false
    }
  }
  componentDidUpdate (nextProps) {
    if (nextProps.active !== this.props.active && nextProps.active) {
      // Ask for users gelocation
      this.getLocation()
    }
  }
  getLocation = () => {
    /* If location is already stored */
    if (this.props.Context.location) {
      this.props.dispatch(removeContext('geo'))
      this.props.onDisable && this.props.onDisable()
      return
    }
    if (navigator.geolocation) {
      this.setState({
        isRequesting: true
      })
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
    }
  }
  onSuccess = (results) => {
    this.props.onSuccess && this.props.onSuccess(results)
    this.setState({
      isRequesting: false
    })
  };
  onError = (results) => {
    this.props.onError && this.props.onError(results)
    this.setState({
      isRequesting: false
    })
  };
  render () {
    let { Context } = this.props
    let { isRequesting, active } = this.state
    let klass = classNames('ola-link-geo', {
      'ola-link-geo-requesting': isRequesting,
      'ola-link-geo-active': active || !!Context.location
    })
    return <button className={klass} onMouseDown={this.getLocation}><span>Get my location</span></button>
  }
}

function mapStateToProps( state ){
  return {
    Context: state.Context
  }
}

export default connect(mapStateToProps)(GeoLocation)
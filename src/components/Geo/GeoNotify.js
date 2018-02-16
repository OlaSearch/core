import React from 'react'
import GeoLocation from './GeoLocation'
import { connect } from 'react-redux'
import { executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'

function GeoNotify ({
  answer,
  location,
  executeSearch,
  isPhone,
  translate,
  ...rest
}) {
  /* Does the intent require user's location */
  const askForLocation = answer && answer.location
  /**
   * do we need to ask for location
   */
  if ((!askForLocation && !location) || isPhone) return null
  // if (!suggestLocation || isPhone) return null
  return (
    <div className='ola-location-notify'>
      <span>
        {location
          ? translate('showing_nearby_results')
          : translate('share_location')}
      </span>
      <GeoLocation onSuccess={executeSearch} {...rest} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    location: state.Context.location,
    answer: state.AppState.answer,
    isPhone: state.Device.isPhone
  }
}

module.exports = withTranslate(
  connect(mapStateToProps, { executeSearch })(GeoNotify)
)

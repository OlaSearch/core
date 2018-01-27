import React from 'react'
import GeoLocation from './GeoLocation'
import { connect } from 'react-redux'
import { executeSearch } from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'

function GeoNotify ({ answer, location, executeSearch, isPhone, translate }) {
  /* Does the intent require user's location */
  const suggestLocation = answer && answer.location
  if (!suggestLocation || isPhone) return null
  return (
    <div className='ola-location-notify'>
      <span>
        {location
          ? translate('showing_nearby_results')
          : translate('share_location')}
      </span>
      <GeoLocation onSuccess={executeSearch} />
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

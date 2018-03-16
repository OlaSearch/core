import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAlert, deleteAlert } from './../../actions/Alert'
import cx from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withLogger from './../../decorators/withLogger'

/**
 * Add a new alert button
 */
function AddAlert ({
  q,
  queriesById,
  queryIds,
  translate,
  createAlert,
  deleteAlert,
  log,
  inProgressAlert,
  logPayload
}) {
  if (!q) return null
  let exists = queryIds.some((id) => q === queriesById[id].query)
  let classes = cx('ola-btn', 'ola-alert-add', {
    'ola-alert-add-disabled': exists
  })
  function handleClick () {
    let queryId
    if (exists) {
      queryId = queryIds
        .filter((id) => q === queriesById[id].query)
        .reduce((acc, obj) => obj, null)
    }
    exists ? queryId && deleteAlert(queryId) : createAlert(q)
    /* Log */
    log({
      eventType: 'C',
      eventCategory: 'alert',
      eventAction: 'click',
      eventLabel: exists ? 'Remove' : 'Add',
      payload: logPayload
    })
  }
  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={inProgressAlert}
    >
      {exists
        ? translate('alert_button_remove')
        : translate('alert_button_add')}
    </button>
  )
}

AddAlert.propTypes = {
  /**
   * Input query
   */
  q: PropTypes.string,
  /**
   * Array of query ids to monitor
   */
  queryIds: PropTypes.array,
  /**
   * Key value pair for each query id
   */
  queriesById: PropTypes.object,
  /**
   * Function to delete an alert
   */
  deleteAlert: PropTypes.func
}

function mapStateToProps (state) {
  return {
    queryIds: state.AppState.queryIds,
    queriesById: state.AppState.queriesById,
    inProgressAlert: state.AppState.inProgressAlert
  }
}

export default connect(mapStateToProps, {
  createAlert,
  deleteAlert
})(withLogger(withTranslate(AddAlert)))

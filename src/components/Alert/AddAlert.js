import React from 'react'
import { connect } from 'react-redux'
import { createAlert, deleteAlert } from './../../actions/Alert'
import cx from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withLogger from './../../decorators/withLogger'

function AddAlert ({
  q,
  queriesById,
  queryIds,
  translate,
  createAlert,
  deleteAlert,
  log,
  inProgressAlert
}) {
  if (!q) return null
  let exists = queryIds.some((id) => q === queriesById[id].query)
  let classes = cx('ola-alert-add', {
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
      eventLabel: exists ? 'Remove' : 'Add'
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

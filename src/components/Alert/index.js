import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DateParser from './../../utilities/dateParser'
import { fetchAlerts, deleteAlert, createAlert } from './../../actions/Alert'

/**
 * Query monitoring - Show list of queries that the user is monitoring
 */
class Alert extends React.Component {
  componentDidMount () {
    this.props.fetchAlerts()
  }
  static propTypes = {
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
  render () {
    let { queryIds, queriesById, deleteAlert } = this.props
    return (
      <div className='ola-alerts'>
        {queryIds.map((id) => {
          let { query, docIds, timestamp } = queriesById[id]
          return (
            <Query
              key={id}
              query={query}
              docs={docIds}
              timestamp={timestamp}
              id={id}
              onDelete={deleteAlert}
            />
          )
        })}
      </div>
    )
  }
}

function Query ({ id, query, docs, timestamp, onDelete }) {
  function handleDelete () {
    onDelete(id)
  }
  const docLen = docs.length
  const docTmpl = docLen > 0 ? `- ${docLen} doc${docLen > 1 ? 's' : ''}` : null
  return (
    <div className='ola-alerts-item'>
      <a>
        {query} {docTmpl}
      </a>
      <span>Added on {DateParser.format(timestamp, 'D MMM YYYY')}</span>
      <button type='button' onClick={handleDelete}>
        Delete query
      </button>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    queryIds: state.AppState.queryIds,
    queriesById: state.AppState.queriesById
  }
}

export default connect(mapStateToProps, {
  fetchAlerts,
  deleteAlert,
  createAlert
})(Alert)

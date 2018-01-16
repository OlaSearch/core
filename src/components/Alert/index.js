import React from 'react'
import { connect } from 'react-redux'
import DateParser from './../../utilities/dateParser'
import { fetchAlerts, deleteAlert, createAlert } from './../../actions/Alert'

class Alert extends React.Component {
  componentDidMount () {
    this.props.fetchAlerts()
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

const Query = ({ id, query, docs, timestamp, onDelete }) => {
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

module.exports = connect(mapStateToProps, {
  fetchAlerts,
  deleteAlert,
  createAlert
})(Alert)

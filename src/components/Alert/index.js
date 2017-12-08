import React from 'react'
import { connect } from 'react-redux'
import { fetchAlerts, deleteAlert, createAlert } from './../../actions/Alert'

class Alert extends React.Component {
  componentDidMount () {
    this.props.fetchAlerts()
    // this.props.createAlert('fox' + Math.random())
  }
  render () {
    let { queryIds, queriesById, deleteAlert } = this.props
    return (
      <div>
        {queryIds.map((id) => {
          let { query, docs } = queriesById[id]
          return (
            <Query
              key={id}
              query={query}
              docs={docs}
              id={id}
              onDelete={deleteAlert}
            />
          )
        })}
      </div>
    )
  }
}

const Query = ({ id, query, docs, onDelete }) => {
  function handleDelete () {
    onDelete(id)
  }
  return (
    <div>
      <a>{query}</a>
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

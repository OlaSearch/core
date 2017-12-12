import types from './../constants/ActionTypes'

export function fetchAlerts () {
  return (dispatch, getState) => {
    const { userId } = getState().Context
    dispatch({
      types: [
        types.REQUEST_ALERT,
        types.REQUEST_ALERT_SUCCESS,
        types.REQUEST_ALERT_FAILURE
      ],
      processData: (response) => {
        let queryIds = response.map(({ queryId }) => queryId)
        let queriesById = response.reduce((acc, obj) => {
          acc[obj.queryId] = obj
          return acc
        }, {})
        return {
          ...response,
          extra: {
            queryIds,
            queriesById
          }
        }
      },
      query: {},
      meta: {
        log: false,
        apiOptions: {
          path: '/docs',
          method: 'GET',
          params: {
            userId
          }
        }
      },
      api: 'alert'
    })
  }
}

export function deleteAlert (queryId) {
  return (dispatch, getState) => {
    let payload = { queryId }
    dispatch({
      types: [
        types.REQUEST_DELETE_ALERT,
        types.REQUEST_DELETE_ALERT_SUCCESS,
        types.REQUEST_DELETE_ALERT_FAILURE
      ],
      query: {},
      meta: {
        log: false,
        apiOptions: {
          method: 'POST',
          path: '/queries/remove',
          params: payload
        }
      },
      payload,
      api: 'alert'
    })
  }
}

export function removeDocs (queryId) {
  return (dispatch, getState) => {
    let payload = { queryId }
    dispatch({
      types: [
        types.REQUEST_DELETE_ALERT_DOCS,
        types.REQUEST_DELETE_ALERT_DOCS_SUCCESS,
        types.REQUEST_DELETE_ALERT_DOCS_FAILURE
      ],
      query: {},
      meta: {
        log: false,
        apiOptions: {
          method: 'POST',
          path: '/docs/remove',
          params: payload
        }
      },
      payload,
      api: 'alert'
    })
  }
}

export function createAlert (query) {
  return (dispatch, getState) => {
    const { userId } = getState().Context
    let payload = { userId, query }
    dispatch({
      types: [
        types.REQUEST_CREATE_ALERT,
        types.REQUEST_CREATE_ALERT_SUCCESS,
        types.REQUEST_CREATE_ALERT_FAILURE
      ],
      processData: (response) => {
        let { queryId, query, timestamp, docIds } = response
        return {
          ...response,
          extra: {
            queryId,
            queriesById: {
              [queryId]: {
                query, timestamp, docIds
              }
            }
          }
        }
      },
      query: {},
      meta: {
        log: false,
        apiOptions: {
          method: 'POST',
          path: '/queries/add',
          params: payload
        }
      },
      payload,
      api: 'alert'
    })
  }
}

export function viewedAlert (query) {
  return (dispatch, getState) => {}
}

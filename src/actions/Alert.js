import types from './../constants/ActionTypes'

/**
 * Fetch alerts using alerts api
 */
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
        const queryIds = response.map(({ queryId }) => queryId)
        const queriesById = response.reduce((acc, obj) => {
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

/**
 * Delete an alert by id
 * @param  {number} queryId
 * @return {Object}
 */
export function deleteAlert (queryId) {
  return (dispatch) => {
    const payload = { queryId }
    return dispatch({
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

/**
 * Remove documents for a specific query
 * @param  {number} queryId
 * @return {Object}
 */
export function removeDocs (queryId) {
  return (dispatch) => {
    const payload = { queryId }
    return dispatch({
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

/**
 * Create a new alert for a query
 * @param  {string} query
 * @return {Object}
 */
export function createAlert (query) {
  return (dispatch, getState) => {
    const { userId } = getState().Context
    const payload = { userId, query }
    return dispatch({
      types: [
        types.REQUEST_CREATE_ALERT,
        types.REQUEST_CREATE_ALERT_SUCCESS,
        types.REQUEST_CREATE_ALERT_FAILURE
      ],
      processData: (response) => {
        const { queryId, query, timestamp, docIds } = response
        return {
          ...response,
          extra: {
            queryId,
            queriesById: {
              [queryId]: {
                query,
                timestamp,
                docIds
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

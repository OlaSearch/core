import types from './../constants/ActionTypes'

export function initGuide (payload) {
  return {
    type: types.INIT_GUIDE,
    payload
  }
}

export function executeSearch (payload) {
  return (dispatch, getState) => {
    var { query } = getState().Guide

    dispatch({
      types: [
        types.REQUEST_GUIDE,
        types.REQUEST_GUIDE_SUCCESS,
        types.REQUEST_GUIDE_FAILURE
      ],
      query,
      api: 'search',
      payload
    })
  }
}

export function incrementIndex () {
  return {
    type: types.INCREMENT_GUIDE
  }
}

export function decrementIndex () {
  return {
    type: types.DECREMENT_GUIDE
  }
}

export function replaceFacet (facet, value) {
  return {
    type: types.REPLACE_FACET_GUIDE,
    facet,
    value
  }
}

export function clearFacetAfterIndex (index) {
  return {
    type: types.CLEAR_FACET_AFTER_INDEX,
    index
  }
}

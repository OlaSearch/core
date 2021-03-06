import alite from '@olasearch/alite'
import querystring from 'query-string'
import { urlappend } from './../utilities'

/**
 * Default method
 */
const DEFAULT_REQUEST_METHOD = 'POST'

/**
 * Get alerts
 * @param  {Object} urlParams
 * @param  {Object} params
 * @param  {Object} config
 */
export function alert (urlParams = null, params, config) {
  const { ajaxOptions, api } = config
  var url = api.alert
  if (urlParams) {
    url = urlappend(url, querystring.stringify(urlParams, { strict: true }))
  }
  return alite({
    ...ajaxOptions,
    method: DEFAULT_REQUEST_METHOD,
    url,
    data:
      method === DEFAULT_REQUEST_METHOD
        ? {
          data: JSON.stringify(params)
        }
        : params
  })
}

/**
 * Fetch machine comprehension answer
 * @param  {Object} urlParams
 * @param  {Object} params
 * @param  {Object} config
 */
export function mc (urlParams = null, params, config) {
  const { ajaxOptions, api } = config
  var url = api.mc
  if (urlParams) {
    url = urlappend(url, querystring.stringify(urlParams, { strict: true }))
  }
  return alite({
    ...ajaxOptions,
    url,
    method: DEFAULT_REQUEST_METHOD,
    data: {
      data: JSON.stringify(params)
    }
  })
}

/**
 * Fetch context information
 * @param  {Object} urlParams
 * @param  {Object} params
 * @param  {Object} config
 */
export function context (urlParams = null, params, config) {
  const { ajaxOptions, api } = config
  var url = api.context
  if (urlParams) {
    url = urlappend(url, querystring.stringify(urlParams, { strict: true }))
  }
  return alite({
    ...ajaxOptions,
    method: DEFAULT_REQUEST_METHOD,
    url,
    data: {
      data: JSON.stringify(params)
    }
  })
}

export default {
  alert,
  mc,
  context
}

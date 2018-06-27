import alite from '@olasearch/alite'
import querystring from 'query-string'
import { urlappend } from './../utilities'

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
  const method = 'POST'
  return alite({
    ...ajaxOptions,
    method,
    url,
    data:
      method === 'POST'
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
export function mc (urlParams = null, params, url = api.mc) {
  const { ajaxOptions, api } = config
  var url = api.mc
  if (urlParams) {
    url = urlappend(url, querystring.stringify(urlParams, { strict: true }))
  }
  return alite({
    ...ajaxOptions,
    url,
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

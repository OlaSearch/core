/**
 * Due to full browser support
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 *
 * Polyfill removed on 27/01/2018
 */
import { isBrowser } from './../utilities'

export default (isBrowser() ? window.sessionStorage : null)

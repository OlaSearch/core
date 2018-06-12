/**
 * Due to full browser support, Polyfill removed on 27/01/2018
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 */
import { isBrowser } from './../utilities'

export default (isBrowser() ? window.sessionStorage : null)

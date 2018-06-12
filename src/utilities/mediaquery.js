import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  BREAKPOINT_PHONE
} from './../constants/Settings'

/**
 * Check if the current device width is of Desktop breakpoint
 * @return {Boolean}
 */
export function isDesktopMedia () {
  return isMedia(`(min-width: ${BREAKPOINT_DESKTOP})`)
}

/**
 * Check if the current device width is of Tablet breakpoint
 * @return {Boolean}
 */
export function isTabletMedia () {
  return isMedia(
    `(min-width: ${BREAKPOINT_PHONE} and max-width: ${BREAKPOINT_TABLET})`
  )
}

/**
 * Check if the current device width is of Phone breakpoint
 * @return {Boolean}
 */
export function isPhoneMedia () {
  return isMedia(`(max-width: ${BREAKPOINT_PHONE})`)
}

/**
 * Utility function to match media query
 * @return {Boolean}
 */
export function isMedia (query) {
  if (!window.matchMedia) return
  const mql = window.matchMedia(query)
  return mql.matches
}

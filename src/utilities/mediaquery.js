import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  BREAKPOINT_PHONE
} from './../constants/Settings'

export function isDesktopMedia () {
  return isMedia(`(min-width: ${BREAKPOINT_DESKTOP})`)
}

export function isTabletMedia () {
  return isMedia(
    `(min-width: ${BREAKPOINT_PHONE} and max-width: ${BREAKPOINT_TABLET})`
  )
}

export function isPhoneMedia () {
  return isMedia(`(max-width: ${BREAKPOINT_PHONE})`)
}

export function isMedia (query) {
  if (!window.matchMedia) return
  const mql = window.matchMedia(query)
  return mql.matches
}

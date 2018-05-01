import { BREAKPOINT_DESKTOP } from './../constants/Settings'

export function mediaNotDesktop () {
  if (!window.matchMedia) return
  const mql = window.matchMedia(`(max-width: ${BREAKPOINT_DESKTOP})`)
  return mql.matches
}

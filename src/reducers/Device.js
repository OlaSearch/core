// @flow
import {
  phone,
  android,
  apple,
  tablet,
  seven_inch as sevenInch
} from 'ismobilejs'

/* Structure
  {
    isApple: {
      device,
      ipod,
      phone,
      tablet
    },
    isAndroid: {
      device,
      phone,
      tablet
    },
    other: {
      blackberry,
      blackberry10,
      chrome,
      device,
      firefox,
      opera
    },
    phone,
    seven_inch,
    tablet
  }
*/

type State = {
  isAndroid: Object,
  isApple: Object,
  isTablet: boolean,
  isPhone: boolean,
  isDesktop: boolean
}

var initialState = {
  isAndroid: android,
  isApple: apple,
  isPhone: phone,
  isTablet: tablet,
  isDesktop: !phone && !tablet && !sevenInch
}

export default (state: State = initialState, action: Object) => {
  return state
}

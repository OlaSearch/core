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

var initialState = {
  isPhone: phone,
  isAndroid: android,
  isApple: apple,
  isTablet: tablet,
  isDesktop: !phone && !tablet && !sevenInch
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

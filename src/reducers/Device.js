import isMobile from 'ismobilejs'

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
    }
  }
*/

var initialState = {
  isPhone: isMobile.phone,
  isAndroid: isMobile.android,
  isApple: isMobile.apple,
  isTablet: isMobile.tablet
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

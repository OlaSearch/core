// @flow
import types from './../constants/ActionTypes'

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
  isDesktop: boolean,
  connection: string
}

var initialState = {
  isAndroid: android,
  isApple: apple,
  isPhone: phone,
  isTablet: tablet,
  isDesktop: !phone && !tablet && !sevenInch,
  connection: 'online'
}

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_CONNECTION:
      return {
        ...state,
        connection: action.status
      }
    default:
      return state
  }
}

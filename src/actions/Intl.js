import types from './../constants/ActionTypes';

export function setLocale( payload ){

	return {
		type: types.SET_LOCALE,
		payload
	}
}


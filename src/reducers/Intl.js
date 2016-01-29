import translations from './../translations';
import types from './../constants/ActionTypes';
import storage from './../services/storage';

var locale = storage.get('locale') || 'en';

var initialState = {	
	formats: {},	
	locales: translations[locale]['locales'],
	messages: translations[locale]['messages'],	
}

export default (state = initialState, action) => {	
	switch(action.type){

		case types.SET_LOCALE:			
			var { payload } = action;
			
			storage.set('locale', payload)

			return {
				...state,
				locales: translations[payload]['locales'],
				messages: translations[payload]['messages']
			}

		default:
			return state
	}
}
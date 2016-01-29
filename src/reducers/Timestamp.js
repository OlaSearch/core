import types from './../constants/ActionTypes';

var initialState = {		
	timestamp: null,
}

export default (state = initialState, action) => {
	
	switch(action.type){

		case types.REQUEST_SEARCH:
		case types.REQUEST_GUIDE:
		case types.REQUEST_AUTOSUGGEST:
			return {
				...state,
				timestamp: new Date().getTime()
			}

		default: 
			return state
	}
}
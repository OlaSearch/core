import isMobile from 'ismobilejs';

var initialState = {	
	isPhone: isMobile.phone,
	isTablet: isMobile.tablet
}

export default (state = initialState, action) => {
	switch(action.type){
		default:
			return state
	}
}
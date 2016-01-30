import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './../reducers/index';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createOlaMiddleWare from './../middleware/OlaMiddleware';

const __DEV__ = process.NODE_ENV == 'production'? false : true;

const disabledActions = ['UPDATE_QUERY_TERM', 'REQUEST_SEARCH', 'CLEAR_QUERY_TERM', 'ADD_HISTORY', 'UPDATE_QUERY_TERM_AUTOSUGGEST', 'REQUEST_AUTOSUGGEST'];

/* Logger */

const logger = createLogger({
	collapsed: true,
	predicate: (getState, action) => __DEV__ && disabledActions.indexOf(action.type) == -1
});

const createOlaStore = (options) => {

		let olaMiddleWare = createOlaMiddleWare(options)

		if(process.env.NODE_ENV === 'production'){
			return applyMiddleware(thunk, olaMiddleWare)(createStore)(reducers)
		}
		
		return compose(
			applyMiddleware(thunk, olaMiddleWare, logger),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)(createStore)(reducers)
}

export default { createOlaStore }
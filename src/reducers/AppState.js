import types from './../constants/ActionTypes';
import storage from './../services/storage';
import { buildQueryString, character as hashCharacter } from './../services/urlSync';
import { flatten, equals } from 'ramda';

var initialState = {	
	totalResults: 0,
	results: [],
	facets: [],
	spellSuggestions: [],
	suggestedTerm: '',
	isLoading: false,
	bookmarks: storage.get('bookmarks') || [],
	history: storage.get('history') || [],
	locale: 'en-US',
	error: null
}

export default (state = initialState, action) => {
	
	switch(action.type){

		case types.REQUEST_SEARCH:
			return {
				...state,
				isLoading: true
			};
		
		case types.REQUEST_SEARCH_SUCCESS:

			var { results, appendResult } = action;
			
			if(appendResult) {
				
				return {
					...state,
					results: [ ...state.results, ...action.results ],
					isLoading: false,
				}

			}
			
			return {
				...state, 
				results,
				facets: action.facets,
				spellSuggestions: action.spellSuggestions,
				totalResults: action.totalResults,
				suggestedTerm: action.suggestedTerm,
				isLoading: false
			};

		case types.REQUEST_SEARCH_FAILURE:
			
			var error = {
				status : action.error.status,
				statusText: action.error.statusText
			};

			return {
				...state,
				error
			};

		case types.ADD_BOOKMARK:

			var _bookmarks = [...state.bookmarks, action.snippet];

			storage.set('bookmarks', _bookmarks);

			return {
				...state,
				bookmarks: _bookmarks
			};

		case types.REMOVE_BOOKMARK:

			var _bookmarks = [
					...state.bookmarks.filter( 
						(bookmark) => bookmark.id != action.snippet.id 
					)
				];

			storage.set('bookmarks', _bookmarks);

			return {
				...state,
				bookmarks: _bookmarks
			};
		
		case types.ADD_HISTORY:
			
			var query = {...action.query};
			
			var { q } = query;
			
			/* Remove Page, perPage and referrer */
			
			delete query['page'];
			delete query['per_page'];
			delete query['referrer'];
			
			/* Get selected facets */
			
			var facets = flatten(query.facet_query.map( (item) => item.selected))
			
			/* Check if it already exists */
			
			var exists = state.history
				.filter( (item) => item.q == q && equals(item.facets, facets));
			
			/* Check if history already exists */
			
			if(exists.length) return state;
			
			var _history = [{
				q: q,
				url: hashCharacter + buildQueryString(query),
				dateAdded: new Date().getTime(),
				facets
			}, ...state.history];
			
			storage.set('history', _history);
			
			return {
				...state,
				history: _history
			}
		
		case types.CLEAR_HISTORY:
			
			// storage.set('history', []);
			
			return {
				...state,
				history: []
			}

		case types.SET_LOCALE:
			return {
				...state,
				locale: action.payload
			}
		
		default:
			return state;
	}
}
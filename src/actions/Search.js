import types from './../constants/ActionTypes';
import { addHistory } from './History';
import { pushState } from './../services/urlSync';
import { debounce } from './../utilities';

/* Update Browser URL */
const updateUrl = debounce(pushState, 300);

/* Adds to History */
const addToHistory = debounce(addOlaHistory, 600);

export function addOlaHistory(dispatchInstance, query){	

	dispatchInstance( addHistory(query) )

}

export function updateQueryTerm(term){
	return {
		type: types.UPDATE_QUERY_TERM,
		term
	}
}

export function clearQueryTerm(){

	return {
		type: types.CLEAR_QUERY_TERM
	}
}

export function loadMore(){
	return ( dispatch, getState ) => {

		var currentPage = getState().QueryState.page

		dispatch( changePage( ++currentPage ) )

		dispatch( 
			executeSearch({
				routeChange: false,
				appendResult: true
			})
		)
	}
}

export function executeSearch(payload){

	return (dispatch, getState) => {

		/* Check if there is a suggested term */

		var query = getState().QueryState;

		dispatch({
			types: [
				types.REQUEST_SEARCH, 
				types.REQUEST_SEARCH_SUCCESS, 
				types.REQUEST_SEARCH_FAILURE
			],			
			query: query,
			api: 'search',
			payload: payload,
			executeFromSpellSuggest: executeFromSpellSuggest
		});

		/**
		 * Check if route should be enabled
		 * Implement debounce
		 */
		
		if(!payload || payload.routeChange) {
			
			/* Update Browser URL */
			
			updateUrl(query)
			
			/* Add History */
			
			addToHistory(dispatch, query)
		}
		
	}
}

export function executeFromSpellSuggest(payload){
	
	return (dispatch, getState) => {

		var { suggestedTerm } = payload

		var query = {
			...getState().QueryState,
			q: suggestedTerm
		};

		dispatch({
			types: [
				types.REQUEST_SEARCH, 
				types.REQUEST_SEARCH_SUCCESS, 
				types.REQUEST_SEARCH_FAILURE
			],
			shouldCallAPI: (state) => true,
			query: query,
			api: 'search',
			payload: payload,			
			suggestedTerm: suggestedTerm
		})

	}
}


export function addFacet(facet, value){

	return ( dispatch, getState) => {

		acceptSuggestedTerm( dispatch, getState);

		dispatch({
			type: types.ADD_FACET,
			facet, value
		})
	}
}


export function removeFacet(facet, value){

	return {
		type: types.REMOVE_FACET,
		facet, value
	}
}

export function replaceFacet(facet, value){

	return {
		type: types.REPLACE_FACET,
		facet, value
	}
}

export function removeAllFacets(){

	return {
		type: types.REMOVE_ALL_FACETS
	}
}

/* Change page */

export function changePage(page){

	return ( dispatch, getState) => {

		acceptSuggestedTerm( dispatch, getState);

		dispatch({
			type: types.CHANGE_PAGE,
			page
		})
	}
}

/* Change per page */

export function changePerPage(perPage){
	return {
		type: types.CHANGE_PER_PAGE,
		perPage
	}
}

/*
 * When a new query is Suggested and User continues the search, update the term to the new suggested term
 */

function acceptSuggestedTerm( dispatch, getState){

	var { suggestedTerm } = getState().AppState;

	if(suggestedTerm){
		dispatch( updateQueryTerm( suggestedTerm) )
	}
}

/* Change sort */

export function changeSort(sort){
	return {
		type: types.CHANGE_SORT,
		sort
	}
}

export function updateStateFromQuery( config ){

	return {
		type: types.UPDATE_STATE_FROM_QUERY,
		config
	}
}

export function initSearch( options ){
	
	return (dispatch, getState) => {

		var { config } = options;
		
		/* Always pass configuration to @parseQueryString handler */

		dispatch(updateStateFromQuery( config ))

		/* Disable Route change initally */

		dispatch(
			executeSearch({ 
				routeChange: false,
			})
		)
	}
}
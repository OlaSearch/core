import expect from 'expect'
import reducer from './../../src/reducers/AppState'
import * as types from './../../src/constants/ActionTypes'

/* Initial State */

var initialState = {	
	totalResults: 0,
	results: [],
	facets: [],
	spellSuggestions: [],
	suggestedTerm: '',
	isLoading: false,
	bookmarks: [],
	history: [],
	locale: 'en-US',
	error: null
}

var snippetMock = {
	id: 2,
	title: 'My title'
};

describe('App State Reducer', () => {

	beforeEach( (done) => {

		window.localStorage = window.sessionStorage = {
		    getItem: function (key) {
		        return this[key];
		    },
		    setItem: function (key, value) {
		        this[key] = value;
		    }
		};
		done()
	})
	
	it('should show error', () => {

		expect(
			reducer(initialState, {
				type: types.REQUEST_SEARCH_FAILURE,
				error: {
					status: '404',
					statusText: 'Server cannot be found'
				}
			})
		).toEqual({
			...initialState,
			error: {
				status: '404',
				statusText: 'Server cannot be found'
			}
		})
	})

	it('show loading indicator', () => {

		expect(
			reducer(initialState, {
				type: types.REQUEST_SEARCH
			})
		).toEqual({
			...initialState,
			isLoading: true
		})
	})

	it('show add bookmark', () => {

		expect(
			reducer(initialState, {
				type: types.ADD_BOOKMARK,
				snippet: snippetMock
			})
		).toEqual({
			...initialState,
			bookmarks: [{ ...snippetMock}]
		})
	})

	it('show remove bookmark', () => {

		expect(
			reducer(initialState, {
				type: types.REMOVE_BOOKMARK,
				snippet: snippetMock
			})
		).toEqual({
			...initialState,
			bookmarks: []
		})
	})

	it('show clear history', () => {

		expect(
			reducer(initialState, {
				type: types.CLEAR_HISTORY
			})
		).toEqual({
			...initialState,
			history: []
		})
	})
})

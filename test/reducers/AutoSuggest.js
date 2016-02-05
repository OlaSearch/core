import expect from 'expect'
import reducer from './../../src/reducers/AutoSuggest'
import * as types from './../../src/constants/ActionTypes'

/* Initial State */

var initialState = {
	query : {
		q: '',
		per_page: 20,
		page: 1,
	},
	totalResults: 0,
	results: [],	
	spellSuggestions: [],
	suggestedTerm: '',
	isLoading: false,
	isOpen: false
}

var snippetMock = {
	id: 2,
	title: 'My title'
};

describe('Autosuggest Reducer', () => {

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

	it('should return initialstate', () => {

		expect(
			reducer(initialState, {
				type: 'ANY'
			})
		).toEqual(
			initialState
		)
	})

	it('should clear query term', () => {

		expect(
			reducer(initialState, {
				type: types.CLEAR_QUERY_TERM_AUTOSUGGEST
			})
		).toEqual(
			initialState
		)
	})

	it('should show loading', () => {

		expect(
			reducer(initialState, {
				type: types.REQUEST_AUTOSUGGEST
			})
		).toEqual({
			...initialState,
			isLoading: true
		})
	})

	it('should open suggestions container', () => {

		expect(
			reducer(initialState, {
				type: types.OPEN_AUTOSUGGEST
			})
		).toEqual({
			...initialState,
			isOpen: true
		})
	})

	it('should close suggestions container', () => {

		expect(
			reducer(initialState, {
				type: types.CLOSE_AUTOSUGGEST
			})
		).toEqual({
			...initialState,
			isOpen: false
		})
	})
	
})

import expect from 'expect'
import reducer from './../../src/reducers/Guide'
import * as types from './../../src/constants/ActionTypes'
import config from './../../src/CONFIG.SAMPLE';

var questions = config.facets.filter( (facet) => facet.question);
var fields = questions.map( (q) => q.name);

var initialState = {
	query: {
		facet_field: fields,
		per_page: 0,
		page: 1,
        facet_limit: 2000,
		facet_query: [],
	},
    index: 0,
	facets: questions,
	results: [],
	isLoading: false
};

describe('Guide Reducer', () => {

	it('should increment question INCREMENT_GUIDE', () => {

		var output = reducer( initialState , {
				type: types.INCREMENT_GUIDE
		})

		expect( output.index).toBe(1)

		output = reducer( output , {
			type: types.INCREMENT_GUIDE
		});

		expect( output.index).toBe(questions.length - 1)

	})

	it('should decrement question DECREMENT_GUIDE', () => {

		var output = reducer( initialState , {
				type: types.DECREMENT_GUIDE
		})

		expect( output.index).toBe(0)

	})

	it('should request next question REQUEST_GUIDE', () => {

		var output = reducer( initialState , {
				type: types.REQUEST_GUIDE
		})

		expect( output.isLoading).toBe(true)

	})

	it('should request next question REQUEST_GUIDE_SUCCESS', () => {

		var output = reducer( initialState , {
				type: types.REQUEST_GUIDE_SUCCESS,
				fl: ''
		})

		expect( output.isLoading).toBe(false)

	})
})
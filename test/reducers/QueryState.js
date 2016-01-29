import expect from 'expect'
import reducer from './../../src/reducers/QueryState'
import * as types from './../../src/constants/ActionTypes'
import { parseUrl } from './../../src/services/urlSync';

/* Initial State */

var initialState = {
	q: '',
	page: 1,
	per_page: 10,
	facet_query: [],
	sort: '',
	filters: [],
};

var facetStub = {					
	name: "genres_sm",
	displayName: "Genre",
	type: "string",
}

describe('Query State Reducer', () => {
	
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(initialState)
	})

	it('should UPDATE_QUERY_TERM', () => {

		var term = 'Terminator';

		expect(
			reducer( initialState , {
				type: types.UPDATE_QUERY_TERM,
				term: term
			})
		).toEqual({
			...initialState, 
			q: term
		})
	});


	it('should CLEAR_QUERY_TERM', () => {

		var term = 'Terminator';

		expect(
			reducer( initialState , {
				type: types.CLEAR_QUERY_TERM
			})
		).toEqual({
			...initialState, 
			q: ''
		})
	});

	it('should UPDATE_STATE_FROM_QUERY (Empty)', () => {

		expect(
			reducer( initialState , {
				type: types.UPDATE_STATE_FROM_QUERY
			})
		).toEqual({
			...initialState, 
			q: '',
			referrer: ''
		})
	});

	it('should UPDATE_STATE_FROM_QUERY q, facet_query', () => {

		window.location.href = 'http://www.site.com/search?q=&page=1&per_page=10&facet_query=genres_sm:Documentary,Comedy';

		var output = reducer( initialState , {
				type: types.UPDATE_STATE_FROM_QUERY
			});
				
		expect(
			output.facet_query[0].selected.indexOf('Documentary')
		).toEqual(0)

		expect(
			output.facet_query[0].selected.indexOf('Comedy')
		).toEqual(1)
	});


	it('should UPDATE_STATE_FROM_QUERY Range', () => {

		window.location.href = 'http://www.site.com/search?q=&page=1&per_page=10&facet_query=audience_score_i:60,80,20,40';

		var output = reducer( initialState , {
				type: types.UPDATE_STATE_FROM_QUERY
			});
				
		expect(
			output.facet_query[0].selected
		).toEqual([["60","80"], ["20","40"]])		
		
	});	

	it('should UPDATE_STATE_FROM_QUERY Page number', () => {

		window.location.href = 'http://www.site.com/search?q=&page=10';

		var output = reducer( initialState , {
				type: types.UPDATE_STATE_FROM_QUERY
			});
				
		expect(
			output.page
		).toEqual('10')
	});

	it('should UPDATE_STATE_FROM_QUERY Per Page', () => {

		window.location.href = 'http://www.site.com/search?q=&per_page=100';

		var output = reducer( initialState , {
				type: types.UPDATE_STATE_FROM_QUERY
			});
				
		expect(
			output.per_page
		).toEqual('100')
	});


	/**
	 * Facets
	 */

	it('should ADD_FACET (Single)', () => {
		
		var output = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: 'facet 1',
				facet: facetStub
			}
		);

		expect( output.facet_query[0] ).toEqual(
				{
					displayName: "Genre",
					name: "genres_sm",
					type: "string",
					selected: ["facet 1"],
					multiSelect: undefined,
					label: undefined,
					template: undefined,
				}
			
		)
	});

	it('should ADD_FACET (Multiple)', () => {

		var output = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: ['facet 1', 'facet 2'],
				facet: facetStub
			}
		);

		expect( output.facet_query[0] ).toEqual(
				{
					displayName: "Genre",
					name: "genres_sm",
					type: "string",
					selected: [["facet 1", "facet 2"]],
					multiSelect: undefined,
					label: undefined,
					template: undefined,
				}
			
		)
	});

	it('should ADD_FACET (Rating + Range)', () => {

		var output = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: [0, 20,40,60],
				facet: {					
					name: "audience_score_i",
					displayName: "Rating",
					type: "rating",
				}
			}
		);

		expect( output.facet_query[0] ).toEqual(
				{
					displayName: "Rating",
					name: "audience_score_i",
					type: "rating",
					selected: [["0", "20","40","60"]],
					multiSelect: undefined,
					label: undefined,
					template: undefined,
				}
			
		)
	});

	it('should REMOVE_FACET (Single)', () => {

		
		var output = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: 'facet 1',
				facet: facetStub
			}
		);

		expect( reducer(
			output, {
				type: types.REMOVE_FACET,
				facet: facetStub,
				value : 'facet 1'
			}
		)).toEqual({
			...initialState,
			facet_query: []
		})

	});

	it('should REMOVE_FACET (Multiple)', () => {

		
		var output = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: ['facet 1', 'facet 2'],
				facet: facetStub
			}
		);

		expect( reducer(
			output, {
				type: types.REMOVE_FACET,
				facet: facetStub,
				value : ['facet 1', 'facet 2']
			}
		)).toEqual({
			...initialState,
			facet_query: []
		})
		
	});

	it('should REMOVE_FACET (Range)', () => {

		
		var output_1 = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: [ 10, 20],
				facet: facetStub
			}
		);

		var output_2 = reducer( output_1, 
			{
				type: types.ADD_FACET,
				value: [ 20, 40],
				facet: facetStub
			}
		);

		var output = reducer(
			output_2, {
				type: types.REMOVE_FACET,
				facet: facetStub,
				value : [10,20]
			}
		)

		expect(  output.facet_query[0].selected ).toEqual([["20", "40"]])

	});

	it('should REPLACE_FACET', () => {

		
		var output_1 = reducer( initialState, 
			{
				type: types.ADD_FACET,
				value: 'facet 1',
				facet: facetStub
			}
		);

		var output = reducer( output_1, 
			{
				type: types.REPLACE_FACET,
				value: 'facet 2',
				facet: facetStub
			}
		);

		expect(  output.facet_query[0].selected ).toEqual(['facet 2'])

	});
	
	it('should REMOVE_ALL_FACETS', () => {

		expect(
			reducer( initialState, {
				type: types.REMOVE_ALL_FACETS				
			})
		).toEqual({
			...initialState, 
			facet_query: []
		})
	})
	

	/**
	 * Page
	 */
	
	it('should CHANGE_PAGE', () => {

		expect(
			reducer( initialState, {
				type: types.CHANGE_PAGE,
				page: 10
			})
		).toEqual({
			...initialState, 
			page: 10
		})
	})

	/**
	 * Change sort	 
	 */
	it('should CHANGE_SORT', () => {

		expect(
			reducer( initialState, {
				type: types.CHANGE_SORT,
				sort: 'title_s asc'
			})
		).toEqual({
			...initialState, 
			sort: 'title_s asc'
		})
	})
})

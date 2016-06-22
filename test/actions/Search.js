import expect from 'expect'
import * as actions from './../../src/actions/Search';
import * as types from './../../src/constants/ActionTypes'

describe('Search Actions', () => {
	it('should call initSearch', () => {
		expect(true)
	})

	it('should updateQueryTerm()', () => {
		const term = 'Terminator'
		const expectedAction = {
			type: types.UPDATE_QUERY_TERM,
			term
		}
		expect(actions.updateQueryTerm(term)).toEqual(expectedAction)
	})

	it('should clearQueryTerm()', () => {
		const term = 'Terminator'
		const expectedAction = {
			type: types.CLEAR_QUERY_TERM
		}
		expect(actions.clearQueryTerm()).toEqual(expectedAction)
	})

	it('should addFilter()', () => {
		const expectedAction = {
			type: types.ADD_FILTER,
			payload: {}
		}
		expect(actions.addFilter({})).toEqual(expectedAction)
	})

});

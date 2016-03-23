import types from './../constants/ActionTypes';
import { parseQueryString } from './../services/urlSync';
import { checkIfFacetExists, castNumberToStringArray } from './../utilities';
import { indexOf } from 'ramda';

var initialState = {
	q: '',
	page: 1,
	per_page: 10,
	facet_query: [],
	sort: '',
	filters: []
}

export default (state = initialState, action) => {
	
	switch(action.type){

		case types.ADD_FILTER:
			/* Remove duplicate */

			var { filter, value } = action.payload;			
			var { name } = filter;
			var index = checkIfFacetExists( state.filters, name );

			if(index == null){

				return {
					...state,
					filters: [ ...state.filters, { ...filter, value }]
				}
			}else{

				/* Update the value */

				var newFilter = state.filters.slice(0);
				newFilter[ index ].value = value

				return {
					...state,
					filters: newFilter,
					page: 1
				}
			}
			

		case types.REMOVE_FILTER:
			
			var { name } = action.payload;

			return {
				...state,
				filters: state.filters.filter( item => item.name != name ),
				page: 1
			}

		case types.CLEAR_FILTERS:
			return {
				...state,
				filters: []
			}

		case types.UPDATE_STATE_FROM_QUERY:
			return {
				...parseQueryString(initialState, action.config),
				referrer: ''
			}

		case types.UPDATE_QUERY_TERM:
			return {
				...state, 
				q: action.term,
				page: 1
			};

		case types.CLEAR_QUERY_TERM:			
			return {
				...state, 
				q: '',
				page: 1,
			};


		case types.ADD_FACET:

			/* Check if key exists then update selected =[] OR Add new record with selected[] */

			var { value, facet } = action;
			var { name, displayName, type, multiSelect, template, label } = facet;

			var fq = state.facet_query.slice(0);
			var index = checkIfFacetExists(fq, name);

			/**
			 * Always convert Array to strings 
			 * [1, 2] => ["1", "2"]
			 */
			if(value instanceof Array){
				value = castNumberToStringArray( value )
			}
			
			if(index == null){
				fq.push({
					name, type, displayName, multiSelect, template, label,
					selected: [value]
				});

			}else{
				
				fq[index].selected.push(value)
			}			

			return {
				...state,
				facet_query: fq,
				page: 1,
			};

		case types.REMOVE_FACET:

			var fq = state.facet_query.slice(0);
			var { value, facet } = action;

			if(value instanceof Array){
				value = castNumberToStringArray( value )
			}
			
			for(var i = fq.length - 1; i >= 0; i--){

				var cur = fq[i];

				var { selected } = cur;
				
				if(cur.name == facet.name){
					
					/* Remove selections if No value is supplied */
					
					if(!value) selected = [];					

					selected.splice(
						indexOf(value, selected), 1
					)

					if(!selected.length)  fq = [...fq.slice(0, i), ...fq.slice(i + 1) ]
				}
			}

			return {
				...state,
				facet_query: fq,
				page: 1,
			};

		case types.REPLACE_FACET:

			/* Check if key exists then update selected =[] OR Add new record with selected[] */

			var { value, facet } = action;

			var { name, displayName, type, multiSelect, template, label } = facet;
			var fq = state.facet_query.slice(0);

			var index = checkIfFacetExists(fq, name);			
			
			if(index == null){
				fq = [...fq, {
					name, type, displayName, multiSelect, template, label,
					selected: [value]
				}];

			}else{
				
				fq[index].selected = [value]
			}			
			
			return {
				...state,
				facet_query: fq,
				page: 1,
			};

		case types.REMOVE_ALL_FACETS:
			return {
				...state,
				facet_query: [],
				page: 1,
			}

		case types.CHANGE_SORT:		
			return {
				...state,
				sort: action.sort,
				page: 1,
			}
		
		case types.CHANGE_PAGE:
			
			return {
				...state,
				page: action.page
			};

		case types.CHANGE_PER_PAGE:
			return {
				...state,
				per_page: action.perPage
			}

		default:
			return state;
	}
}
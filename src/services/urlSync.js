import queryString from 'query-string';
import { parseRangeValues } from './../utilities';

var urlSync = { 
	character: '?',
	pushState: function(qs) {
		
		if(history.pushState){
			window.history.pushState(null, '', urlSync.character + urlSync.buildQueryString(qs))
		}

	},
	replaceState: function(qs) {
		
		if(history.replaceState){
			window.history.replaceState(null, '', urlSync.character + urlSync.buildQueryString(qs));
		}
	},
	buildQueryString: function(params){

		var str = [];
		
		for(var i in params){

			var name = i,
				value = params[i];

			if(name == 'facet_query'){
				value = value.map( (item) => item.name + ':' + item.selected)				
			}

			if(name == 'filters'){				
				value = value.map( (item) => {
					
					var { name, value } = item;

					if(typeof value == 'object') value = queryString.stringify( value )

					return name + ':' + value
				})
			}

			/**
			 * Check if Value is an array
			 */
			
			if(Array.isArray(value)){

				for(var j = 0; j < value.length; j ++){

					str.push(
						encodeURIComponent(name) + "=" + 
						encodeURIComponent(value[j])
					)
				}
			}
			else{

				str.push(
					encodeURIComponent(name) + "=" + 
					encodeURIComponent(value)
				)
			}
		}

		return str.join('&');

	},
	parseQueryString: function(initialState, config){

		var qs = queryString.parse(window.location.search);

		/**
		 * Facets		 
		 */
		
		if(qs.hasOwnProperty('facet_query')){
			
			var facetQuery = qs.facet_query;
			var { facets : configFacets } = config;

			if(typeof facetQuery == 'string') facetQuery = JSON.parse("[\"" + facetQuery + "\"]")
		
			var fq = facetQuery.map( (item) => {

				var [ name, value ] = item.split(':')
				
				value = value.split(',');

				var facet = configFacets.filter( (facet) => facet.name == name).reduce( (a, b) => a);
				var { type } = facet;

				if( (type == 'range' || type == 'rating' || type == 'daterange')
					&& value.length > 1){
										
					value = parseRangeValues(value)
				}
				
				return {
					...facet,
					selected: value
				}

			});

			/* Extend */

			qs = {
				...qs,
				facet_query: fq
			}
		}

		/**
		 * Filters
		 * Field level filtering
		 */
		if(qs.hasOwnProperty('filters')){

			var { filters } = qs;
			var { filters: configFilters } = config;

			if(typeof filters == 'string') filters = JSON.parse("[\"" + filters + "\"]")

			var filterQuery = filters.map( filter => {

				var [ name, value ] = filter.split(':')

				/* Parse query string */

				if(value.indexOf('=') != -1) value = queryString.parse( value );

				var currentFilter = configFilters.filter( filter => filter.name == name ).reduce( (a, b) => a)

				return {
					...currentFilter,
					value: value
				}
			})

			qs = {
				...qs,
				filters: filterQuery
			}
		}
		

		return {
			...initialState,
			...qs,
		}

	}
};

module.exports = urlSync
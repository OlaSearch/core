import queryString from 'query-string';
import { parseRangeValues } from './../utilities';

var urlSync = { 
	character: '?',
	pushState: function(qs) {
		
		window.history.pushState(null, '', urlSync.character + urlSync.buildQueryString(qs))

	},
	replaceState: function(qs) {
		
		window.history.replaceState(null, '', urlSync.character + urlSync.buildQueryString(qs));
	},
	buildQueryString: function(params){

		var str = [];
		
		for(var i in params){

			var name = i,
				value = params[i];

			if(name == 'facet_query'){				
				value = value.map( (item) => item.name + ':' + item.selected)				
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
		
		if(qs.hasOwnProperty('facet_query')){
			
			var facetQuery = qs.facet_query;

			if(typeof facetQuery == 'string') facetQuery = JSON.parse("[\"" + facetQuery + "\"]")
		
			var fq = facetQuery.map( (item) => {

				var hay = item.split(':'),
					name = hay[0],
					value = hay[1].split(',');

				var facet = config.facets.filter( (facet) => facet.name == name)[0];
				var { type } = facet;

				if( (type == 'range' || type == 'rating')
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
		

		return {
			...initialState,
			...qs,
		}

	}
};

module.exports = urlSync
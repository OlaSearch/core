'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

var urlSync = {
	character: '?',
	pushState: function pushState(qs) {

		window.history.pushState(null, '', urlSync.character + urlSync.buildQueryString(qs));
	},
	replaceState: function replaceState(qs) {

		window.history.replaceState(null, '', urlSync.character + urlSync.buildQueryString(qs));
	},
	buildQueryString: function buildQueryString(params) {

		var str = [];

		for (var i in params) {

			var name = i,
			    value = params[i];

			if (name == 'facet_query') {
				value = value.map(function (item) {
					return item.name + ':' + item.selected;
				});
			}

			/**
    * Check if Value is an array
    */

			if (Array.isArray(value)) {

				for (var j = 0; j < value.length; j++) {

					str.push(encodeURIComponent(name) + "=" + encodeURIComponent(value[j]));
				}
			} else {

				str.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
			}
		}

		return str.join('&');
	},
	parseQueryString: function parseQueryString(initialState, config) {

		var qs = _queryString2['default'].parse(window.location.search);

		if (qs.hasOwnProperty('facet_query')) {

			var facetQuery = qs.facet_query;

			if (typeof facetQuery == 'string') facetQuery = JSON.parse("[\"" + facetQuery + "\"]");

			var fq = facetQuery.map(function (item) {

				var hay = item.split(':'),
				    name = hay[0],
				    value = hay[1].split(',');

				var facet = config.facets.filter(function (facet) {
					return facet.name == name;
				})[0];
				var type = facet.type;

				if ((type == 'range' || type == 'rating') && value.length > 1) {

					value = (0, _utilities.parseRangeValues)(value);
				}

				return _extends({}, facet, {
					selected: value
				});
			});

			/* Extend */

			qs = _extends({}, qs, {
				facet_query: fq
			});
		}

		return _extends({}, initialState, qs);
	}
};

module.exports = urlSync;
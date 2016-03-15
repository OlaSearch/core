'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlSync = {
	character: '?',
	pushState: function pushState(qs) {

		if (history.pushState) {
			window.history.pushState(null, '', urlSync.character + urlSync.buildQueryString(qs));
		}
	},
	replaceState: function replaceState(qs) {

		if (history.replaceState) {
			window.history.replaceState(null, '', urlSync.character + urlSync.buildQueryString(qs));
		}
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
				var _item$split = item.split(':');

				var _item$split2 = _slicedToArray(_item$split, 2);

				var name = _item$split2[0];
				var value = _item$split2[1];


				value = value.split(',');

				var facet = config.facets.filter(function (facet) {
					return facet.name == name;
				}).reduce(function (a, b) {
					return a;
				});
				var type = facet.type;


				if ((type == 'range' || type == 'rating' || type == 'daterange') && value.length > 1) {

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
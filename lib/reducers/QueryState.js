'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	q: '',
	page: 1,
	per_page: 10,
	facet_query: [],
	sort: '',
	filters: []
};

exports['default'] = function () {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];


	switch (action.type) {

		case _ActionTypes2['default'].ADD_FILTER:
			return _extends({}, state, {
				filters: [].concat(_toConsumableArray(state.filters), [action.payload])
			});

		case _ActionTypes2['default'].REMOVE_FILTER:
			var _action$payload = action.payload;
			var name = _action$payload.name;
			var value = _action$payload.value;

			var filters = [].concat(_toConsumableArray(state.filters.filter(function (filter) {
				return filter.name != name;
			})));

			return _extends({}, state, {
				filters: filters
			});

		case _ActionTypes2['default'].CLEAR_FILTERS:
			return _extends({}, state, {
				filters: []
			});

		case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
			return _extends({}, (0, _urlSync.parseQueryString)(initialState, action.config), {
				referrer: ''
			});

		case _ActionTypes2['default'].UPDATE_QUERY_TERM:
			return _extends({}, state, {
				q: action.term,
				page: 1
			});

		case _ActionTypes2['default'].CLEAR_QUERY_TERM:
			return _extends({}, state, {
				q: '',
				page: 1
			});

		case _ActionTypes2['default'].ADD_FACET:

			/* Check if key exists then update selected =[] OR Add new record with selected[] */

			var value = action.value;
			var facet = action.facet;
			var name = facet.name;
			var displayName = facet.displayName;
			var type = facet.type;
			var multiSelect = facet.multiSelect;
			var template = facet.template;
			var label = facet.label;


			var fq = state.facet_query.slice(0);
			var index = (0, _utilities.checkIfFacetExists)(fq, name);

			/**
    * Always convert Array to strings 
    * [1, 2] => ["1", "2"]
    */
			if (value instanceof Array) {
				value = (0, _utilities.castNumberToStringArray)(value);
			}

			if (index == null) {
				fq.push({
					name: name, type: type, displayName: displayName, multiSelect: multiSelect, template: template, label: label,
					selected: [value]
				});
			} else {

				fq[index].selected.push(value);
			}

			return _extends({}, state, {
				facet_query: fq,
				page: 1
			});

		case _ActionTypes2['default'].REMOVE_FACET:

			var fq = state.facet_query.slice(0);
			var value = action.value;
			var facet = action.facet;


			if (value instanceof Array) {
				value = (0, _utilities.castNumberToStringArray)(value);
			}

			for (var i = fq.length - 1; i >= 0; i--) {

				var cur = fq[i];

				var selected = cur.selected;


				if (cur.name == facet.name) {

					/* Remove selections if No value is supplied */

					if (!value) selected = [];

					selected.splice((0, _ramda.indexOf)(value, selected), 1);

					if (!selected.length) fq = [].concat(_toConsumableArray(fq.slice(0, i)), _toConsumableArray(fq.slice(i + 1)));
				}
			}

			return _extends({}, state, {
				facet_query: fq,
				page: 1
			});

		case _ActionTypes2['default'].REPLACE_FACET:

			/* Check if key exists then update selected =[] OR Add new record with selected[] */

			var value = action.value;
			var facet = action.facet;
			var name = facet.name;
			var displayName = facet.displayName;
			var type = facet.type;
			var multiSelect = facet.multiSelect;
			var template = facet.template;
			var label = facet.label;

			var fq = state.facet_query.slice(0);

			var index = (0, _utilities.checkIfFacetExists)(fq, name);

			if (index == null) {
				fq = [].concat(_toConsumableArray(fq), [{
					name: name, type: type, displayName: displayName, multiSelect: multiSelect, template: template, label: label,
					selected: [value]
				}]);
			} else {

				fq[index].selected = [value];
			}

			return _extends({}, state, {
				facet_query: fq,
				page: 1
			});

		case _ActionTypes2['default'].REMOVE_ALL_FACETS:
			return _extends({}, state, {
				facet_query: [],
				page: 1
			});

		case _ActionTypes2['default'].CHANGE_SORT:
			return _extends({}, state, {
				sort: action.sort,
				page: 1
			});

		case _ActionTypes2['default'].CHANGE_PAGE:

			return _extends({}, state, {
				page: action.page
			});

		case _ActionTypes2['default'].CHANGE_PER_PAGE:
			return _extends({}, state, {
				per_page: action.perPage
			});

		default:
			return state;
	}
};
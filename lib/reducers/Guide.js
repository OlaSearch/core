'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
    query: {
        facet_field: [],
        per_page: 0,
        page: 1,
        facet_limit: 2000,
        facet_query: []
    },
    index: 0,
    facets: [],
    isLoading: false
};

exports['default'] = function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {

        case _ActionTypes2['default'].INIT_GUIDE:
            var _action$payload = action.payload;
            var questions = _action$payload.questions;
            var fields = _action$payload.fields;


            return _extends({}, state, {
                query: _extends({}, state.query, {
                    facet_field: fields
                }),
                facets: questions
            });

        case _ActionTypes2['default'].INCREMENT_GUIDE:
            return _extends({}, state, {
                index: Math.min(state.facets.length - 1, ++state.index)
            });

        case _ActionTypes2['default'].DECREMENT_GUIDE:
            return _extends({}, state, {
                index: Math.max(0, --state.index)
            });

        case _ActionTypes2['default'].REQUEST_GUIDE:
            return _extends({}, state, {
                isLoading: true
            });

        case _ActionTypes2['default'].REQUEST_GUIDE_SUCCESS:
            var fl = action.fl;
            var index = action.index;
            var facets = action.facets;

            if (!fl) return _extends({}, state, { isLoading: false });

            var activeFacet = facets.filter(function (f) {
                return f.name == fl;
            }).reduce(function (a, b) {
                return a;
            });

            return _extends({}, state, {
                isLoading: false,
                facets: [].concat(_toConsumableArray(state.facets.slice(0, index)), [_extends({}, state.facets[index], { values: activeFacet.values })], _toConsumableArray(state.facets.slice(index + 1)))
            });

        case _ActionTypes2['default'].REPLACE_FACET_GUIDE:
            var value = action.value;
            var facet = action.facet;
            var name = facet.name;
            var displayName = facet.displayName;
            var type = facet.type;
            var multiSelect = facet.multiSelect;
            var template = facet.template;
            var label = facet.label;

            var fq = state.query.facet_query.slice(0);

            var index = (0, _utilities.checkIfFacetExists)(fq, name);

            if (index == null) {
                fq.push({
                    name: name, type: type, displayName: displayName, multiSelect: multiSelect, template: template, label: label,
                    selected: [value]
                });
            } else {

                fq[index].selected = [value];
            }
            return _extends({}, state, {
                query: _extends({}, state.query, {
                    facet_query: fq
                })
            });

        case _ActionTypes2['default'].CLEAR_FACET_AFTER_INDEX:
            var _Object$assign = Object.assign({}, state.query);

            var facet_query = _Object$assign.facet_query;


            facet_query.splice(action.index + 1, facet_query.length);

            return _extends({}, state, {
                query: _extends({}, state.query, {
                    facet_query: facet_query
                })
            });

        default:
            return state;
    }
};
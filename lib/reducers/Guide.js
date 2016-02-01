'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var _utilities = require('./../utilities');

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

exports['default'] = function (state, action) {
    if (state === undefined) state = initialState;

    switch (action.type) {

        case _constantsActionTypes2['default'].INIT_GUIDE:
            var _action$payload = action.payload,
                questions = _action$payload.questions,
                fields = _action$payload.fields;

            return _extends({}, state, {
                query: _extends({}, state.query, {
                    facet_field: fields
                }),
                facets: questions
            });

        case _constantsActionTypes2['default'].INCREMENT_GUIDE:
            return _extends({}, state, {
                index: Math.min(state.facets.length - 1, ++state.index)
            });

        case _constantsActionTypes2['default'].DECREMENT_GUIDE:
            return _extends({}, state, {
                index: Math.max(0, --state.index)
            });

        case _constantsActionTypes2['default'].REQUEST_GUIDE:
            return _extends({}, state, {
                isLoading: true
            });

        case _constantsActionTypes2['default'].REQUEST_GUIDE_SUCCESS:
            var fl = action.fl,
                index = action.index,
                facets = action.facets;

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

        case _constantsActionTypes2['default'].REPLACE_FACET_GUIDE:
            var value = action.value,
                facet = action.facet;
            var name = facet.name,
                displayName = facet.displayName,
                type = facet.type,
                multiSelect = facet.multiSelect,
                template = facet.template,
                label = facet.label;

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

        case _constantsActionTypes2['default'].CLEAR_FACET_AFTER_INDEX:
            var _Object$assign = Object.assign({}, state.query),
                facet_query = _Object$assign.facet_query;

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

module.exports = exports['default'];
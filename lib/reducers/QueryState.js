'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

var _indexOf = require('ramda/src/indexOf');

var _indexOf2 = require('../../.babelhelper.js').interopRequireDefault(_indexOf);

var _omit = require('ramda/src/omit');

var _omit2 = require('../../.babelhelper.js').interopRequireDefault(_omit);

var initialState = {
  q: '',
  page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: ''
};

/* Prevents redeclared variables for `JS Standard` compatiblity */
var fq, facet, value, index, props;

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].ADD_FILTER:
      /* Remove duplicate */
      var _action$payload = action.payload;
      var filter = _action$payload.filter;
      var selected = _action$payload.selected;

      index = (0, _utilities.checkIfFacetExists)(state.filters, filter.name);

      if (index === null) {
        return require('../../.babelhelper.js')['extends']({}, state, {
          filters: [].concat(require('../../.babelhelper.js').toConsumableArray(state.filters), [require('../../.babelhelper.js')['extends']({}, filter, { selected: selected })])
        });
      } else {
        /* Update the value */
        var newFilter = state.filters.slice(0);
        newFilter[index].selected = selected;

        return require('../../.babelhelper.js')['extends']({}, state, {
          filters: newFilter,
          page: 1
        });
      }

    case _ActionTypes2['default'].REMOVE_FILTER:
      var name = action.payload.name;


      return require('../../.babelhelper.js')['extends']({}, state, {
        filters: state.filters.filter(function (item) {
          return item.name !== name;
        }),
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_FILTERS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        filters: []
      });

    case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      return require('../../.babelhelper.js')['extends']({}, (0, _urlSync.parseQueryString)(state, action.config), {
        referrer: ''
      });

    case _ActionTypes2['default'].UPDATE_QUERY_TERM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: action.term,
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: '',
        page: 1
      });

    case _ActionTypes2['default'].ADD_FACET:
      /* Check if key exists then update selected =[] OR Add new record with selected[] */
      value = action.value;
      facet = action.facet;
      props = (0, _omit2['default'])('values', facet);
      fq = state.facet_query.slice(0);
      index = (0, _utilities.checkIfFacetExists)(fq, facet.name);

      /**
       * Always convert Array to strings
       * [1, 2] => ["1", "2"]
       */
      if (value instanceof Array) value = (0, _utilities.castNumberToStringArray)(value);

      if (index === null) {
        fq.push(require('../../.babelhelper.js')['extends']({}, props, {
          selected: [value]
        }));
      } else {
        fq[index].selected.push(value);
      }

      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: fq,
        page: 1
      });

    case _ActionTypes2['default'].REMOVE_FACET:
      fq = state.facet_query.slice(0);
      facet = action.facet;
      value = action.value;

      if (value instanceof Array) value = (0, _utilities.castNumberToStringArray)(value);

      for (var i = fq.length - 1; i >= 0; i--) {
        var cur = fq[i];
        var _selected = cur.selected;


        if (cur.name === facet.name) {
          /* Remove selections if No value is supplied */

          if (!value) _selected = [];

          _selected.splice((0, _indexOf2['default'])(value, _selected), 1);

          if (!_selected.length) fq = [].concat(require('../../.babelhelper.js').toConsumableArray(fq.slice(0, i)), require('../../.babelhelper.js').toConsumableArray(fq.slice(i + 1)));
        }
      }

      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: fq,
        page: 1
      });

    case _ActionTypes2['default'].REPLACE_FACET:
      /* Check if key exists then update selected =[] OR Add new record with selected[] */
      value = action.value;
      facet = action.facet;
      props = (0, _omit2['default'])('values', facet);
      fq = state.facet_query.slice(0);
      index = (0, _utilities.checkIfFacetExists)(fq, facet.name);

      if (index === null) {
        fq = [].concat(require('../../.babelhelper.js').toConsumableArray(fq), [require('../../.babelhelper.js')['extends']({}, props, {
          selected: [value]
        })]);
      } else {
        fq[index].selected = [value];
      }

      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: fq,
        page: 1
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: [],
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_SORT:
      return require('../../.babelhelper.js')['extends']({}, state, {
        sort: action.sort || '',
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_PAGE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        page: action.page
      });

    case _ActionTypes2['default'].CHANGE_PER_PAGE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        per_page: action.perPage
      });

    case _ActionTypes2['default'].CHANGE_VIEW:
      return require('../../.babelhelper.js')['extends']({}, state, {
        view: action.view
      });

    default:
      return state;
  }
};
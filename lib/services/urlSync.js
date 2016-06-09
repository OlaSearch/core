'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var urlSync = {
  character: '?',
  pushState: function pushState(qs, type) {
    var char = urlSync.getHistoryCharacter(type);
    if (window.history.pushState) {
      window.history.pushState(null, '', char + urlSync.buildQueryString(qs));
    }
  },
  getHistoryCharacter: function getHistoryCharacter(type) {
    return type === 'pushState' ? '?' : '#/?';
  },
  replaceState: function replaceState(qs, type) {
    var char = urlSync.getHistoryCharacter(type);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', char + urlSync.buildQueryString(qs));
    }
  },
  buildQueryString: function buildQueryString(params) {
    var str = [];

    for (var name in params) {
      var value = params[name];
      if (name === 'facet_query') {
        value = value.map(function (item) {
          return item.name + ':' + item.selected;
        });
      }

      if (name === 'filters') {
        value = value.map(function (item) {
          var name = item.name;
          var selected = item.selected;


          if ((typeof selected === 'undefined' ? 'undefined' : _typeof(selected)) === 'object') selected = _queryString2['default'].stringify(selected);

          return name + ':' + selected;
        });
      }

      /**
       * Check if Value is an array
       */

      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value[i]));
        }
      } else {
        value && str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
      }
    }

    return str.join('&');
  },
  parseQueryString: function parseQueryString(initialState, config) {
    var loc = config.history ? config.history === 'pushState' ? window.location.search : window.location.hash.slice(2) : window.location.search;
    var qs = _queryString2['default'].parse(loc);
    var facetQuery = qs.facet_query;
    var filters = qs.filters;
    var facetQueryObject = {};
    var filtersObject = {};

    /**
     * Validate query string
     */

    for (var p in qs) {
      if ((p === 'page' || p === 'per_page') && isNaN(qs[p])) {
        qs[p] = initialState[p];
      }
    }

    /**
     * Facets
     */

    if (facetQuery) {
      var configFacets = config.facets;


      if (typeof facetQuery === 'string') facetQuery = JSON.parse('["' + facetQuery + '"]');

      var fq = facetQuery.map(function (item) {
        var _item$split = item.split(':');

        var _item$split2 = _slicedToArray(_item$split, 2);

        var name = _item$split2[0];
        var value = _item$split2[1];

        value = value.split(',');

        var facet = configFacets.filter(function (facet) {
          return facet.name === name;
        }).reduce(function (a, b) {
          return a;
        });
        var type = facet.type;

        if (_Settings.RANGE_FACETS.indexOf(type) !== -1 && value.length > 1) {
          value = (0, _utilities.parseRangeValues)(value);
        }

        return _extends({}, facet, {
          selected: value
        });
      });

      /* Extend */

      facetQueryObject = {
        facet_query: fq
      };
    }

    /**
     * Filters
     * Field level filtering
     */
    if (filters) {
      if (typeof filters === 'string') filters = JSON.parse('["' + filters + '"]');

      var filterQuery = filters.map(function (filter) {
        var _filter$split = filter.split(':');

        var _filter$split2 = _slicedToArray(_filter$split, 2);

        var name = _filter$split2[0];
        var value = _filter$split2[1];

        /* Parse query string */

        if (value.indexOf('=') !== -1) value = _queryString2['default'].parse(value);

        var currentFilter = (0, _find2['default'])((0, _propEq2['default'])('name', name))(config.filters);

        return _extends({}, currentFilter, {
          selected: value
        });
      });

      filtersObject = {
        filters: filterQuery
      };
    }

    return _extends({}, initialState, qs, facetQueryObject, filtersObject);
  }
};

module.exports = urlSync;
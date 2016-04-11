'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

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
    return type == 'pushState' ? '?' : '#/?';
  },
  replaceState: function replaceState(qs, type) {
    var char = urlSync.getHistoryCharacter(type);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', char + urlSync.buildQueryString(qs));
    }
  },
  buildQueryString: function buildQueryString(params) {
    var str = [];

    for (var i in params) {
      var name = i;
      var value = params[i];

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
        for (var j = 0; j < value.length; j++) {
          str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value[j]));
        }
      } else {
        str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
      }
    }

    return str.join('&');
  },
  parseQueryString: function parseQueryString(initialState, config) {
    var loc = config.history ? config.history == 'pushState' ? window.location.search : window.location.hash.slice(2) : window.location.search;
    var qs = _queryString2['default'].parse(loc);

    /**
     * Facets
     */

    if (qs.hasOwnProperty('facet_query')) {
      var facetQuery = qs.facet_query;
      var configFacets = config.facets;


      if (typeof facetQuery === 'string') facetQuery = JSON.parse('[\"' + facetQuery + '\"]');

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


        if ((type === 'range' || type === 'rating' || type === 'daterange') && value.length > 1) {
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

    /**
     * Filters
     * Field level filtering
     */
    if (qs.hasOwnProperty('filters')) {
      var _qs = qs;
      var filters = _qs.filters;
      var configFilters = config.filters;


      if (typeof filters === 'string') filters = JSON.parse('[\"' + filters + '\"]');

      var filterQuery = filters.map(function (filter) {
        var _filter$split = filter.split(':');

        var _filter$split2 = _slicedToArray(_filter$split, 2);

        var name = _filter$split2[0];
        var value = _filter$split2[1];

        /* Parse query string */

        if (value.indexOf('=') !== -1) value = _queryString2['default'].parse(value);

        var currentFilter = configFilters.filter(function (filter) {
          return filter.name === name;
        }).reduce(function (a, b) {
          return a;
        });

        return _extends({}, currentFilter, {
          selected: value
        });
      });

      qs = _extends({}, qs, {
        filters: filterQuery
      });
    }

    return _extends({}, initialState, qs);
  }
};

module.exports = urlSync;
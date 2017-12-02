'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.character = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.pushState = pushState;
exports.getHistoryCharacter = getHistoryCharacter;
exports.replaceState = replaceState;
exports.buildQueryString = buildQueryString;
exports.parseQueryString = parseQueryString;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _propEq = require('rambda/lib/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _find = require('rambda/lib/find');

var _find2 = _interopRequireDefault(_find);

var _flatten = require('rambda/lib/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var QUERY_ALT_NAME = 'keywords';

var character = exports.character = '?';

function pushState(qs, type, replaceQueryParamName) {
  var char = getHistoryCharacter(type);
  if (window.history.pushState) {
    /* Deprecated hash */
    window.history.pushState(null, '', char + buildQueryString(qs, replaceQueryParamName));
  }
}

function getHistoryCharacter(type) {
  return type === 'pushState' ? '?' : '#/?';
}

function replaceState(qs, type) {
  var char = getHistoryCharacter(type);
  if (window.history.replaceState) {
    window.history.replaceState(null, '', char + buildQueryString(qs));
  }
}

function buildQueryString(params, replaceQueryParamName) {
  var str = [];
  /* Loop */
  for (var name in params) {
    /* Omit */
    if (_Settings.REMOVE_FROM_QUERY_STRING.indexOf(name) !== -1) continue;
    if (replaceQueryParamName && name === QUERY_ALT_NAME) continue;
    var value = params[name];
    if (name === 'q' && replaceQueryParamName) {
      name = QUERY_ALT_NAME;
    }
    /* Facets */
    if (name === 'facet_query') {
      value = value.map(function (item) {
        return item.name + ':' + (0, _flatten2['default'])(item.selected).join('+');
      });
    }

    /* Filters */
    if (name === 'filters') {
      value = value.filter(function (item) {
        return !item.hidden;
      }).map(function (item) {
        var name = item.name,
            selected = item.selected;

        if ((typeof selected === 'undefined' ? 'undefined' : (0, _typeof3['default'])(selected)) === 'object') {
          selected = _queryString2['default'].stringify(selected);
        }
        return name + ':' + selected;
      });
    }

    /**
     * Check if Value is an array
     */

    if (Array.isArray(value)) {
      for (var i = 0, len = value.length; i < len; i++) {
        str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value[i]));
      }
    } else {
      value && str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    }
  }

  return str.join('&');
}

function parseQueryString(initialState, config) {
  var loc = window.location.search; /* Deprecated hash */
  var qs = _queryString2['default'].parse(loc);
  var _qs = qs,
      filters = _qs.filters,
      facetQuery = _qs.facet_query;

  var facetQueryObject = { facet_query: [] };
  var filtersObject = { filters: []
    /**
     * If no qs
     */
  };if (!(0, _keys2['default'])(qs).length) qs = { q: ''
    /**
     * Validate query string
     */
  };for (var p in qs) {
    /* prevent XSS */
    qs[p] = _xssFilters2['default'].inHTMLData(qs[p]);

    if (config.replaceQueryParamName && p === QUERY_ALT_NAME) {
      qs['q'] = _xssFilters2['default'].inHTMLData(qs[p]);
    }

    if (p === 'page' || p === 'per_page') {
      if (isNaN(qs[p])) {
        qs[p] = initialState[p];
      } else {
        qs[p] = parseInt(qs[p]);
      }
    }
  }

  /**
   * Facets
   */
  if (facetQuery) {
    var configFacets = config.facets;

    if (typeof facetQuery === 'string') {
      try {
        facetQuery = JSON.parse('["' + facetQuery + '"]');
      } catch (e) {
        facetQuery = [];
      }
    }

    var fq = facetQuery.filter(function (item) {
      var _item$split = item.split(':'),
          name = _item$split[0],
          value = _item$split[1];

      if (!value) return false;
      return (0, _find2['default'])((0, _propEq2['default'])('name', name))(configFacets);
    }).map(function (item) {
      var _item$split2 = item.split(/:(.+)?/),
          name = _item$split2[0],
          value = _item$split2[1]; /* Split the first : Date strings can contain : */


      value = value.split('+');
      var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(configFacets);
      if (_Settings.RANGE_FACETS.indexOf(facet.type) !== -1 && value.length > 1) {
        value = (0, _utilities.parseRangeValues)(value);
      }

      return (0, _extends3['default'])({}, facet, {
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
    if (typeof filters === 'string') {
      try {
        filters = JSON.parse('["' + filters + '"]');
      } catch (e) {
        filters = [];
      }
    }

    var filterQuery = filters.map(function (item) {
      var _item$split3 = item.split(':'),
          name = _item$split3[0],
          value = _item$split3[1];
      /* Parse query string */


      if (value.indexOf('=') !== -1) value = _queryString2['default'].parse(value);

      var currentFilter = (0, _find2['default'])((0, _propEq2['default'])('name', name))(config.filters);

      return (0, _extends3['default'])({}, currentFilter, {
        selected: value
      });
    });

    filtersObject = {
      filters: filterQuery
    };
  }
  return (0, _extends3['default'])({}, initialState, qs, facetQueryObject, filtersObject);
}
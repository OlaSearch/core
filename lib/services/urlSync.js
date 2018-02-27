'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
    if (replaceQueryParamName && name === _Settings.QUERY_ALT_NAME) continue;
    var value = params[name];
    if (name === 'q' && replaceQueryParamName) {
      name = _Settings.QUERY_ALT_NAME;
    }
    /* Facets */
    if (name === 'facet_query') {
      value = value.filter(function (_ref) {
        var fromIntentEngine = _ref.fromIntentEngine;
        return !fromIntentEngine;
      }) /* Remove facets set by intent engine */
      .map(function (item) {
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
          selected = (0, _flatten2['default'])(selected).join('+');
        }
        return name + ':' + selected;
      });
    }

    /* Tokens */
    if (name === 'tokens') {
      value = value.map(function (_ref2) {
        var startToken = _ref2.startToken,
            endToken = _ref2.endToken,
            val = _ref2.value,
            name = _ref2.name;

        return name + ':' + val + ':' + startToken + ':' + endToken;
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
      facetQuery = _qs.facet_query,
      tokens = _qs.tokens;

  var facetQueryObject = { facet_query: []
    /**
     * Default filters from config
     */
  };var defaultFilters = [];
  if (config.filters && config.filters.length) {
    for (var i = 0, len = config.filters.length; i < len; i++) {
      var selected = config.filters[i].selected;

      defaultFilters.push((0, _extends3['default'])({}, config.filters[i], { selected: selected }));
    }
  }
  var filtersObject = { filters: defaultFilters };
  var tokensObject = { tokens: []
    /**
     * If no qs
     */
  };if (!(0, _keys2['default'])(qs).length) qs = { q: ''

    /**
     * If no q
     */
  };if (!qs['q']) qs['q'] = '';

  /**
   * Validate query string
   */
  for (var p in qs) {
    /**
     * Validate type
     * TODO: Validate all incoming query strings
     */
    if (p === 'skip_facet_fields' && !Array.isArray(qs[p])) {
      qs[p] = [qs[p]];
      continue;
    }
    /* prevent XSS */
    qs[p] = _xssFilters2['default'].inHTMLData(qs[p]);

    if (config.replaceQueryParamName && p === _Settings.QUERY_ALT_NAME) {
      qs['q'] = _xssFilters2['default'].inHTMLData(qs[p]);
    }

    if (p === 'skip_facet_fields') {
      qs[p] = qs[p].split(',');
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
   * tokens
   */
  if (tokens) {
    if (typeof tokens === 'string') {
      tokens = [tokens];
    }
    tokensObject = {
      tokens: tokens.map(function (t) {
        var _t$split = t.split(':'),
            name = _t$split[0],
            value = _t$split[1],
            startToken = _t$split[2],
            endToken = _t$split[3];

        return {
          name: name,
          value: value,
          startToken: parseInt(startToken),
          endToken: parseInt(endToken)
        };
      })
    };
  }

  /**
   * Facets
   */
  if (facetQuery) {
    var configFacets = config.facets;

    if (typeof facetQuery === 'string') {
      facetQuery = [facetQuery];
    }
    /**
     * Create facet_query
     * 26 Feb 2018 @vinay: I was accepting only facets that are in the config file. Validate facet names from fieldMapping
     */
    var fq = facetQuery.filter(function (item) {
      var _item$split = item.split(':'),
          name = _item$split[0],
          value = _item$split[1];

      return name in config.fieldMappings;
      // if (!value) return false
      // return find(propEq('name', name))(configFacets)
    }).map(function (item) {
      /* Split the first : Date strings can contain : */
      var _item$split2 = item.split(/:(.+)?/),
          name = _item$split2[0],
          value = _item$split2[1];

      value = value.split('+');
      var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(configFacets);
      /**
       * Create a facet if it doesnt exist
       */
      if (!facet) {
        facet = (0, _Settings.CREATE_FILTER_OBJECT)({
          name: name,
          displayName: config.fieldLabels[name],
          type: 'string',
          fromIntentEngine: false
        });
      }

      if (_Settings.RANGE_FACETS.indexOf(facet.type) !== -1 && value.length > 1) {
        value = (0, _utilities.parseRangeValues)(value);
      }
      return (0, _extends3['default'])({}, facet, {
        selected: value,
        isToken: tokensObject.tokens.some(function (_ref3) {
          var n = _ref3.name,
              v = _ref3.value;
          return n === name && value.indexOf(v) !== -1;
        })
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
      filters = [filters];
    }

    var filterQuery = filters.map(function (item) {
      var _item$split3 = item.split(/:(.+)?/),
          name = _item$split3[0],
          value = _item$split3[1];
      /* Split the value + */


      value = value.split('+');

      var currentFilter = (0, _find2['default'])((0, _propEq2['default'])('name', name))(config.filters);

      return (0, _extends3['default'])({}, currentFilter, {
        selected: value
      });
    });

    filtersObject = {
      filters: [].concat(defaultFilters, filterQuery)
    };
  }

  return (0, _extends3['default'])({}, initialState, qs, facetQueryObject, filtersObject, tokensObject);
}
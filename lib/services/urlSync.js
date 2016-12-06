'use strict';

var _queryString = require('query-string');

var _queryString2 = require('../../.babelhelper.js').interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _propEq = require('ramda/src/propEq');

var _propEq2 = require('../../.babelhelper.js').interopRequireDefault(_propEq);

var _find = require('ramda/src/find');

var _find2 = require('../../.babelhelper.js').interopRequireDefault(_find);

var _flatten = require('ramda/src/flatten');

var _flatten2 = require('../../.babelhelper.js').interopRequireDefault(_flatten);

var _xssFilters = require('xss-filters');

var _xssFilters2 = require('../../.babelhelper.js').interopRequireDefault(_xssFilters);

var REMOVE_FROM_QUERY_STRING = ['isSearchActive', 'searchInput', 'enriched_q', 'per_page', 'skip_intent', 'projectId', 'env'];

var urlSync = {
  character: '?',
  pushState: function pushState(qs, type) {
    var char = urlSync.getHistoryCharacter(type);
    if (window.history.pushState) {
      if (type !== 'pushState') {
        var r = new RegExp(/\/(.*)?\//gi);
        var matches = r.exec(window.location.hash);
        if (matches) {
          window.location.hash = char + urlSync.buildQueryString(qs);
        }
      }
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
    /* Loop */
    for (var name in params) {
      /* Omit */
      if (REMOVE_FROM_QUERY_STRING.indexOf(name) !== -1) continue;
      var value = params[name];

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
          var name = item.name;
          var selected = item.selected;

          if ((typeof selected === 'undefined' ? 'undefined' : require('../../.babelhelper.js')['typeof'](selected)) === 'object') selected = _queryString2['default'].stringify(selected);
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
    var filters = qs.filters;
    var facetQuery = qs.facet_query;

    var facetQueryObject = {};
    var filtersObject = {};
    /**
     * Validate query string
     */
    for (var p in qs) {
      /* prevent XSS */
      qs[p] = _xssFilters2['default'].inHTMLData(qs[p]);

      if (p === 'page' || p === 'per_page') {
        if (isNaN(qs[p])) {
          qs[p] = initialState[p];
        } else {
          qs[p] = parseInt(qs[p]);
        }
      }
      /* Validate states: Prevent over-ride */
      if (!qs['per_page']) qs['per_page'] = initialState['per_page'];
      if (!qs['page']) qs['page'] = initialState['page'];
      if (!qs['q']) qs['q'] = '';
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
        var _item$split = item.split(':');

        var _item$split2 = require('../../.babelhelper.js').slicedToArray(_item$split, 1);

        var name = _item$split2[0];

        return (0, _find2['default'])((0, _propEq2['default'])('name', name))(configFacets);
      }).map(function (item) {
        var _item$split3 = item.split(/:(.+)?/);

        var _item$split4 = require('../../.babelhelper.js').slicedToArray(_item$split3, 2);

        var name = _item$split4[0];
        var value = _item$split4[1]; /* Split the first : Date strings can contain : */

        value = value.split('+');
        var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(configFacets);

        var type = facet.type;

        if (_Settings.RANGE_FACETS.indexOf(type) !== -1 && value.length > 1) {
          value = (0, _utilities.parseRangeValues)(value);
        }

        return require('../../.babelhelper.js')['extends']({}, facet, {
          selected: value
        });
      });

      /* Extend */
      facetQueryObject = {
        facet_query: fq
      };
    } else {
      facetQueryObject = {
        facet_query: []
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
        var _item$split5 = item.split(':');

        var _item$split6 = require('../../.babelhelper.js').slicedToArray(_item$split5, 2);

        var name = _item$split6[0];
        var value = _item$split6[1];
        /* Parse query string */

        if (value.indexOf('=') !== -1) value = _queryString2['default'].parse(value);

        var currentFilter = (0, _find2['default'])((0, _propEq2['default'])('name', name))(config.filters);

        return require('../../.babelhelper.js')['extends']({}, currentFilter, {
          selected: value
        });
      });

      filtersObject = {
        filters: filterQuery
      };
    } else {
      filtersObject = {
        filters: []
      };
    }

    return require('../../.babelhelper.js')['extends']({}, initialState, qs, facetQueryObject, filtersObject);
  }
};

module.exports = urlSync;
'use strict';

var _queryString = require('query-string');

var _queryString2 = require('../../.babelhelper.js').interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _propEq = require('ramda/src/propEq');

var _propEq2 = require('../../.babelhelper.js').interopRequireDefault(_propEq);

var _find = require('ramda/src/find');

var _find2 = require('../../.babelhelper.js').interopRequireDefault(_find);

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


      if (typeof facetQuery === 'string') facetQuery = JSON.parse('["' + facetQuery + '"]');

      var fq = facetQuery.map(function (item) {
        var _item$split = item.split(':');

        var _item$split2 = require('../../.babelhelper.js').slicedToArray(_item$split, 2);

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
      if (typeof filters === 'string') filters = JSON.parse('["' + filters + '"]');

      var filterQuery = filters.map(function (filter) {
        var _filter$split = filter.split(':');

        var _filter$split2 = require('../../.babelhelper.js').slicedToArray(_filter$split, 2);

        var name = _filter$split2[0];
        var value = _filter$split2[1];

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
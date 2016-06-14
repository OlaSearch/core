'use strict';

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var utilities = {
  supplant: function supplant(s, d) {
    for (var p in d) {
      s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
    }
    return s;
  },
  arrayJoin: function arrayJoin(suffix, arr) {
    var separator = arguments.length <= 2 || arguments[2] === undefined ? ', ' : arguments[2];

    if (!Array.isArray(arr)) return arr;
    return arr ? suffix + arr.join(separator) : null;
  },
  checkIfFacetExists: function checkIfFacetExists(facets, name) {
    for (var i = 0; i < facets.length; i++) {
      if (facets[i].name === name) {
        return i;
      }
    }

    return null;
  },
  getValuesFromSelect: function getValuesFromSelect(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, len = options.length; i < len; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }

    return result;
  },

  now: Date.now || function () {
    return new Date().getTime();
  },
  debounce: function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function later() {
      var last = utilities.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = utilities.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  },
  parseRangeValues: function parseRangeValues(value) {
    /* [1, 2, 3, 4] => [1, 2], [3, 4] */

    var valueArray = [];
    var len = value.length;

    for (var i = 0; i < len; i += 2) {
      valueArray.push([value[i], value[i + 1]]);
    }

    return valueArray;
  },
  castNumberToStringArray: function castNumberToStringArray(numberArray) {
    return numberArray.map(function (item) {
      return item.toString();
    });
  },
  createHTMLMarkup: function createHTMLMarkup(html) {
    return { __html: html };
  },
  getDisplayName: function getDisplayName(haystack, needle) {
    if (!haystack) return needle;

    if (haystack[needle]) return haystack[needle];

    return needle;
  },
  getMatchingSnippet: function getMatchingSnippet(rules, result) {
    if (!rules) return false;
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i].rules;
      var matched = true;
      if (Array.isArray(rule)) {
        for (var j = 0; j < rule.length; j++) {
          var _rule$j = rule[j];
          var field = _rule$j.field;
          var value = _rule$j.value;

          var fieldValue = result[field];
          if (!fieldValue || fieldValue && !fieldValue.toString().match(new RegExp(value, 'gi'))) matched = false;
        }
      } else {
        for (var field in rule) {
          var _fieldValue = result[field];
          if (!_fieldValue || _fieldValue && !_fieldValue.toString().match(new RegExp(rule[field], 'gi'))) matched = false;
        }
      }
      if (matched) return rules[i].template;
    }
    return false;
  },
  generateSlug: function generateSlug(value) {
    return value.toString().toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  },
  checkForAllowedCharacters: function checkForAllowedCharacters(query, characters) {
    if (!query || !characters) return true;
    var _regExp = new RegExp(characters, 'gi');
    return _regExp.test(query);
  },
  getComponentDisplayName: function getComponentDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  },
  translateKey: function translateKey(path, obj, safe) {
    return obj[path] || path;
    // return path.split('.').reduce((prev, curr) => {
    //   return !safe ? prev[curr] : (prev ? prev[curr] : undefined)
    // }, obj)
  },
  getFacetsToDisplay: function getFacetsToDisplay(selected, facets, facetsToDisplay) {
    var selections = (0, _flatten2['default'])(selected.map(function (item) {
      return item.selected;
    }));
    var names = [];
    var defaultNames = facetsToDisplay['*'];
    var hasKey = false;

    /* Loop through selections and find Facets to display */

    selections.forEach(function (item) {
      if (facetsToDisplay.hasOwnProperty(item)) {
        names = facetsToDisplay[item];
        hasKey = true;
      }
    });

    /* If there are no keys in `facetsToDisplay` Return all facets */

    if (!hasKey) names = defaultNames;

    /* Found */

    return facets.filter(function (facet) {
      return !facet.tab && names.indexOf(facet.name) !== -1;
    });
  }
};

module.exports = utilities;
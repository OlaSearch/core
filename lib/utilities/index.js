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
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ', ';

    if (!Array.isArray(arr)) return arr;
    return (suffix || '') + arr.join(separator);
  },
  checkIfFacetExists: function checkIfFacetExists(facets, name) {
    return facets.some(function (item) {
      return item.name === name;
    });
  },
  now: function now() {
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
  castNumberToStringArray: function castNumberToStringArray(values) {
    if (!Array.isArray(values)) throw new Error('Argument is Invalid');
    return values.map(function (item) {
      return item.toString();
    });
  },
  createHTMLMarkup: function createHTMLMarkup(html) {
    if (Array.isArray(html)) html = html.join('');
    return { __html: html };
  },
  getDisplayName: function getDisplayName(haystack, needle) {
    if (!haystack) return needle;
    if (needle in haystack) return haystack[needle];
    return needle;
  },
  getMatchingSnippet: function getMatchingSnippet(rules, result) {
    if (!rules) return false;
    for (var i = 0, len = rules.length; i < len; i++) {
      var rule = rules[i].rules;
      var matched = true;
      if (Array.isArray(rule)) {
        for (var j = 0, _len = rule.length; j < _len; j++) {
          var _rule$j = rule[j],
              field = _rule$j.field,
              value = _rule$j.value;

          var fieldValue = result[field];
          if (!fieldValue || fieldValue && !fieldValue.toString().match(new RegExp(value, 'gi'))) matched = false;
        }
      } else {
        for (var field in rule) {
          var _fieldValue = result[field];
          if (!_fieldValue || _fieldValue && !_fieldValue.toString().match(new RegExp(rule[field] + '$', 'gi'))) matched = false;
        }
      }
      if (matched) return rules[i].template;
    }
    return false;
  },
  checkForAllowedCharacters: function checkForAllowedCharacters(query, characters) {
    if (!query || !characters) return true;
    var _regExp = new RegExp(characters, 'gi');
    return _regExp.test(query);
  },
  getComponentDisplayName: function getComponentDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name;
  },
  translateKey: function translateKey(path, obj, safe) {
    return obj[path] === null ? '' : obj[path] || path;
  },
  getFacetsToDisplay: function getFacetsToDisplay(selected, facets, facetsToDisplay) {
    var selections = (0, _flatten2['default'])(selected.map(function (item) {
      return item.selected;
    }));
    var names = [];
    var defaultNames = facetsToDisplay['*'];
    var hasKey = false;

    /* Loop through selections and find Facets to display */
    for (var i = 0, len = selections.length; i < len; i++) {
      if (facetsToDisplay.hasOwnProperty(selections[i])) {
        names = facetsToDisplay[selections[i]];
        hasKey = true;
      }
    }

    /* If there are no keys in `facetsToDisplay` Return all facets */
    if (!hasKey) names = defaultNames || [];

    /**
     * Found
     * Ignore tabs
     */
    return facets.filter(function (facet) {
      return !facet.tab && names.indexOf(facet.name) !== -1;
    }).sort(function (a, b) {
      var aIndex = names.indexOf(a.name);
      var bIndex = names.indexOf(b.name);
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      return 0;
    });
  },
  sanitizeAnchor: function sanitizeAnchor(str) {
    if (!str) return null;
    if (typeof str !== 'string') str = str.toString();
    return str.toLowerCase().replace(/<(\/?)em>/gi, '') // remove solr's <em> tags..
    .replace(/<em.*?>/gi, '').replace(/[^a-z0-9_\s-]/gi, '') // make alphanumeric (removes all other characters)
    .replace(/[\s-]+/gi, ' ') // clean up multiple dashes or whitespaces
    .replace(/[\s_]/gi, '-'); // convert whitespaces and underscore to dash
  },
  sanitizePhone: function sanitizePhone(str) {
    if (typeof str !== 'string') str = str.toString();
    return str.split('/').shift().replace(/[a-z_\s-()]/gi, '');
  },
  trim: function trim(str) {
    if (typeof str !== 'string') str = str.toString();
    return str.replace(/^\s+|\s+$/g, '');
  },
  triggerEvent: function triggerEvent(el, name, options) {
    var event;
    if (window.CustomEvent) {
      event = new window.CustomEvent(name, options);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(name, true, true, options);
    }
    el.dispatchEvent(event);
  },
  pickDeep: function pickDeep(obj, key) {
    if (!obj) return null;
    if (Object.keys(obj).indexOf(key) !== -1) return obj[key];
    for (var i in obj) {
      return utilities.pickDeep(obj[i], key);
    }
    return null;
  },
  truncate: function truncate(str, length) {
    var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

    if (str.toString().length > length) {
      return str.substr(0, length).split(' ').slice(0, -1).join(' ') + ellipsis;
    }
    return str;
  },
  escapeRegEx: function escapeRegEx(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  },
  toNestedArray: function toNestedArray(data) {
    var rootLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var parentNode = arguments[2];

    var output = [];
    for (var i = 0, len = data.length; i < len; i++) {
      var count = data[i].count;
      var items = data[i].name.split('/');
      var hasParent = items.length > rootLevel;
      if (hasParent) {
        var parent = rootLevel ? items.length === rootLevel ? null : items.slice(0, items.length - 1).join('/') || null : items.slice(0, items.length - 1).join('/') || null;
        output.push({
          displayName: items.pop(),
          count: count,
          parent: parent,
          name: data[i].name
        });
      }
    }

    function getNestedChildren(arr, parent) {
      var out = [];
      for (var _i in arr) {
        if (arr[_i].parent === parent) {
          var children = getNestedChildren(arr, arr[_i].name);
          if (children.length) {
            arr[_i].children = children;
          }
          out.push(arr[_i]);
        }
      }
      return out;
    }
    return getNestedChildren(output, parentNode === '' ? null : parentNode);
  },
  uuid: function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  getKey: function getKey(key, namespace) {
    return namespace ? key + '_' + namespace : key;
  },
  isSvg: function isSvg(path) {
    return path.split('.').pop().indexOf('svg') === 0;
  },
  scrollTo: function scrollTo(element) {
    /* To be implemented */
  },
  getCoords: function getCoords(element) {
    var box = element.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  },
  isValidUrl: function isValidUrl(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regexp.test(str);
  },
  formatText: function formatText(str, label) {
    if (utilities.isValidUrl(str)) {
      return React.createElement(
        'a',
        { className: 'ola-email-link', href: str },
        label
      );
    }
    return str;
  }
};

module.exports = utilities;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.supplant = supplant;
exports.arrayJoin = arrayJoin;
exports.checkIfFacetExists = checkIfFacetExists;
exports.now = now;
exports.debounce = debounce;
exports.parseRangeValues = parseRangeValues;
exports.castNumberToStringArray = castNumberToStringArray;
exports.createHTMLMarkup = createHTMLMarkup;
exports.getDisplayName = getDisplayName;
exports.getMatchingSnippet = getMatchingSnippet;
exports.checkForAllowedCharacters = checkForAllowedCharacters;
exports.getComponentDisplayName = getComponentDisplayName;
exports.translateKey = translateKey;
exports.sortHistory = sortHistory;
exports.getFacetsToDisplay = getFacetsToDisplay;
exports.sanitizeAnchor = sanitizeAnchor;
exports.sanitizePhone = sanitizePhone;
exports.trim = trim;
exports.triggerEvent = triggerEvent;
exports.pickDeep = pickDeep;
exports.truncate = truncate;
exports.escapeRegEx = escapeRegEx;
exports.toNestedArray = toNestedArray;
exports.uuid = uuid;
exports.getKey = getKey;
exports.isSvg = isSvg;
exports.scrollTo = scrollTo;
exports.getCoords = getCoords;
exports.decimalAdjust = decimalAdjust;
exports.isValidUrl = isValidUrl;
exports.formatText = formatText;
exports.sanitizeNumbers = sanitizeNumbers;
exports.mergeResultsWithHistory = mergeResultsWithHistory;
exports.getCaretPosition = getCaretPosition;
exports.redirect = redirect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flatten = require('rambda/modules/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function supplant(s, d) {
  for (var p in d) {
    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
  }
  return s;
}

function arrayJoin(suffix, arr) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ', ';

  if (!Array.isArray(arr)) return arr;
  return (suffix || '') + arr.join(separator);
}

function checkIfFacetExists(facets, name) {
  return facets.some(function (item) {
    return item.name === name;
  });
}

function now() {
  return new Date().getTime();
}

function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function later() {
    var last = now() - timestamp;
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
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

function parseRangeValues(value) {
  /* [1, 2, 3, 4] => [1, 2], [3, 4] */
  var valueArray = [];
  var len = value.length;

  for (var i = 0; i < len; i += 2) {
    valueArray.push([value[i], value[i + 1]]);
  }

  return valueArray;
}

function castNumberToStringArray(values) {
  if (!Array.isArray(values)) throw new Error('Argument is Invalid');
  return values.map(function (item) {
    return item.toString();
  });
}

function createHTMLMarkup(html) {
  if (Array.isArray(html)) html = html.join('');
  return { __html: html };
}

function getDisplayName(haystack, needle) {
  if (!haystack) return needle;
  if (needle in haystack) return haystack[needle];
  return needle;
}

function getMatchingSnippet(rules, result) {
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
        if (!fieldValue || fieldValue && !fieldValue.toString().match(new RegExp(value, 'gi'))) {
          matched = false;
        }
      }
    } else {
      for (var _field in rule) {
        var _fieldValue = result[_field];
        if (!_fieldValue || _fieldValue && !_fieldValue.toString().match(new RegExp(rule[_field] + '$', 'gi'))) {
          matched = false;
        }
      }
    }
    if (matched) return rules[i].template;
  }
  return false;
}

function checkForAllowedCharacters(query, characters) {
  if (!query || !characters) return true;
  var _regExp = new RegExp(characters, 'gi');
  return _regExp.test(query);
}

function getComponentDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name;
}

function translateKey(path, obj, safe) {
  return obj[path] === null ? '' : obj[path] || path;
}

function sortHistory(a, b) {
  var a1 = a.popularity;
  var b1 = b.popularity;
  var a2 = a.dateAdded;
  var b2 = b.dateAdded;
  if (a1 === b1) {
    if (a2 < b2) return 1;
    if (a2 > b2) return -1;
  } else {
    if (a2 < b2) return 1;
    if (a2 > b2) return -1;
  }
  return 0;
}

function getFacetsToDisplay(selected, facets, facetsToDisplay) {
  var selections = (0, _flatten2['default'])(selected.map(function (item) {
    return item.selected;
  }));
  var names = [];
  var defaultNames = facetsToDisplay['*'];
  var hasKey = false;

  /* Loop through selections and find Facets to display */
  for (var i = 0, len = selections.length; i < len; i++) {
    if (facetsToDisplay.hasOwnProperty(selections[i])) {
      names = [].concat((0, _toConsumableArray3['default'])(names), (0, _toConsumableArray3['default'])(facetsToDisplay[selections[i]]));
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
}

function sanitizeAnchor(str) {
  if (!str) return null;
  if (typeof str !== 'string') str = str.toString();
  return str.toLowerCase().replace(/<(\/?)em>/gi, '') // remove solr's <em> tags..
  .replace(/<em.*?>/gi, '').replace(/[^a-z0-9_\s-]/gi, '') // make alphanumeric (removes all other characters)
  .replace(/[\s-]+/gi, ' ') // clean up multiple dashes or whitespaces
  .replace(/[\s_]/gi, '-'); // convert whitespaces and underscore to dash
}

function sanitizePhone(str) {
  if (typeof str !== 'string') str = str.toString();
  return str.split('/').shift().replace(/[a-z_\s-()]/gi, '');
}

function trim(str) {
  if (typeof str !== 'string') str = str.toString();
  return str.replace(/^\s+|\s+$/g, '');
}

function triggerEvent(el, name, options) {
  var event;
  if (window.CustomEvent) {
    event = new window.CustomEvent(name, options);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, options);
  }
  el.dispatchEvent(event);
}

function pickDeep(obj, key) {
  if (!obj) return null;
  if ((0, _keys2['default'])(obj).indexOf(key) !== -1) return obj[key];
  for (var i in obj) {
    return pickDeep(obj[i], key);
  }
  return null;
}

function truncate(str, length) {
  var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

  if (str.toString().length > length) {
    return str.substr(0, length).split(' ').slice(0, -1).join(' ') + ellipsis;
  }
  return str;
}

function escapeRegEx(str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

function toNestedArray(data) {
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
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function getKey(key, namespace) {
  return namespace ? key + '_' + namespace : key;
}

function isSvg(path) {
  return path.split('.').pop().indexOf('svg') === 0;
}

function scrollTo(element) {
  /* To be implemented */
}

function getCoords(element) {
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
    left: Math.round(left),
    width: box.width,
    height: box.height
  };
}

function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

function isValidUrl(str) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regexp.test(str);
}

function formatText(str, label) {
  if (isValidUrl(str)) {
    return _react2['default'].createElement(
      'a',
      { className: 'ola-email-link', href: str },
      label
    );
  }
  return str;
}

function sanitizeNumbers(text) {
  if (typeof text !== 'string') return text;
  return parseFloat(text.replace(/<(?:.*|\n)*?>/gm, ''));
}

function mergeResultsWithHistory(options) {
  var history = options.history,
      _options$results = options.results,
      results = _options$results === undefined ? [] : _options$results,
      query = options.query,
      _options$limit = options.limit,
      limit = _options$limit === undefined ? 5 : _options$limit,
      showHistoryForQuery = options.showHistoryForQuery;
  /* Filter history when results are empty */

  var shouldShowHistoryForQuery = showHistoryForQuery || !results.length && !query;

  /* Check if answer exists in the first result */
  if (results.length && results[0]['answer']) return results;

  history = history.map(function (_ref) {
    var q = _ref.q,
        dateAdded = _ref.dateAdded;
    return {
      term: q.toLowerCase(),
      type: 'history',
      dateAdded: dateAdded
    };
  }).filter(function (his) {
    return his.term && his.term !== '*';
  }).sort(function (a, b) {
    /* Sort by recency */
    if (a.dateAdded < b.dateAdded) return 1;
    if (a.dateAdded > b.dateAdded) return -1;
    return 0;
  }).filter(function (his, index, self) {
    return self.findIndex(function (t) {
      return t.term.match(new RegExp('^' + his.term + '$', 'gi'));
    }) === index;
  });

  if (query) {
    /* Only history that starts with */
    if (shouldShowHistoryForQuery) {
      history = history.filter(function (_ref2) {
        var term = _ref2.term;
        return term.match(new RegExp('^' + query, 'gi'));
      }).sort(function (a, b) {
        /* Sort by match */
        if (a.term.indexOf(query) < b.term.indexOf(query)) return 1;
        if (a.term.indexOf(query) > b.term.indexOf(query)) return -1;
        return 0;
      });
    } else {
      history = [];
    }
  } else {
    /* If no query, should we show history */
    return history.filter(function (_, i) {
      return i < limit;
    });
  }

  /* Show history suggestions when query is not empty */
  if (query && shouldShowHistoryForQuery) {
    /* 3 */
    var historyTerms = history.map(function (_ref3) {
      var term = _ref3.term;
      return term;
    });

    /* Remove results that contains the history term */
    results = results.filter(function (_ref4) {
      var term = _ref4.term,
          type = _ref4.type;
      return !(type === 'query' && historyTerms.indexOf(term) !== -1);
    });
  }

  /* Only take top 3 history terms */
  history = history.filter(function (_, i) {
    return i < limit;
  });

  /* Merge history with results */
  return [].concat((0, _toConsumableArray3['default'])(history), (0, _toConsumableArray3['default'])(results));
}

function getCaretPosition() {
  var x = 0;
  var y = 0;
  var sel = window.getSelection();
  if (sel.rangeCount) {
    var range = sel.getRangeAt(0).cloneRange();
    if (range.getClientRects()) {
      range.collapse(true);
      var rect = range.getClientRects()[0];
      if (rect) {
        y = rect.top;
        x = rect.left;
      }
    }
  }
  return {
    x: x,
    y: y
  };
}

function redirect(url) {
  window.location.href = url;
}
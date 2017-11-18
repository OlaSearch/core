'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Polyfill service v3.22.0
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 *
 * UA detected: chrome/62.0.0
 * Features requested: CustomEvent,Element.prototype.classList,Event,Object.assign,requestAnimationFrame,~html5-elements
 *
 * - Window, License: CC0 (required by "Event", "CustomEvent")
 * - Document, License: CC0 (required by "Event", "CustomEvent", "~html5-elements", "Element", "Element.prototype.classList")
 * - Element, License: CC0 (required by "Element.prototype.classList", "Event", "CustomEvent")
 * - Object.defineProperty, License: CC0 (required by "Element.prototype.classList", "Event", "CustomEvent")
 * - Event, License: CC0 (required by "CustomEvent")
 * - CustomEvent, License: CC0
 * - _DOMTokenList, License: CC0 (required by "Element.prototype.classList")
 * - Element.prototype.classList, License: CC0
 * - Object.assign, License: CC0
 * - Date.now, License: CC0 (required by "requestAnimationFrame", "performance.now")
 * - performance.now, License: CC0 (required by "requestAnimationFrame")
 * - requestAnimationFrame, License: MIT
 * - ~html5-elements, License: MIT */

(function (undefined) {
  // Window
  (function (global) {
    if (global.constructor) {
      global.Window = global.constructor;
    } else {
      (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
    }
  })(this);

  // Document
  if (this.HTMLDocument) {
    // IE8
    // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
    this.Document = this.HTMLDocument;
  } else {
    // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
    this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
    this.Document.prototype = document;
  }

  // Event
  (function () {
    var unlistenableWindowEvents = {
      click: 1,
      dblclick: 1,
      keyup: 1,
      keypress: 1,
      keydown: 1,
      mousedown: 1,
      mouseup: 1,
      mousemove: 1,
      mouseover: 1,
      mouseenter: 1,
      mouseleave: 1,
      mouseout: 1,
      storage: 1,
      storagecommit: 1,
      textinput: 1

      // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker
    };if (typeof document === 'undefined' || typeof window === 'undefined') return;

    function indexOf(array, element) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (index in array && array[index] === element) {
          return index;
        }
      }

      return -1;
    }

    var existingProto = window.Event && window.Event.prototype || null;
    window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
      if (!type) {
        throw new Error('Not enough arguments');
      }

      var event;
      // Shortcut if browser supports createEvent
      if ('createEvent' in document) {
        event = document.createEvent('Event');
        var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

        event.initEvent(type, bubbles, cancelable);

        return event;
      }

      event = document.createEventObject();

      event.type = type;
      event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
      event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

      return event;
    };
    if (existingProto) {
      Object.defineProperty(window.Event, 'prototype', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: existingProto
      });
    }

    if (!('createEvent' in document)) {
      window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
        var element = this,
            type = arguments[0],
            listener = arguments[1];

        if (element === window && type in unlistenableWindowEvents) {
          throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
        }

        if (!element._events) {
          element._events = {};
        }

        if (!element._events[type]) {
          element._events[type] = function (event) {
            var list = element._events[event.type].list,
                events = list.slice(),
                index = -1,
                length = events.length,
                eventElement;

            event.preventDefault = function preventDefault() {
              if (event.cancelable !== false) {
                event.returnValue = false;
              }
            };

            event.stopPropagation = function stopPropagation() {
              event.cancelBubble = true;
            };

            event.stopImmediatePropagation = function stopImmediatePropagation() {
              event.cancelBubble = true;
              event.cancelImmediate = true;
            };

            event.currentTarget = element;
            event.relatedTarget = event.fromElement || null;
            event.target = event.target || event.srcElement || element;
            event.timeStamp = new Date().getTime();

            if (event.clientX) {
              event.pageX = event.clientX + document.documentElement.scrollLeft;
              event.pageY = event.clientY + document.documentElement.scrollTop;
            }

            while (++index < length && !event.cancelImmediate) {
              if (index in events) {
                eventElement = events[index];

                if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                  eventElement.call(element, event);
                }
              }
            }
          };

          element._events[type].list = [];

          if (element.attachEvent) {
            element.attachEvent('on' + type, element._events[type]);
          }
        }

        element._events[type].list.push(listener);
      };

      window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
        var element = this,
            type = arguments[0],
            listener = arguments[1],
            index;

        if (element._events && element._events[type] && element._events[type].list) {
          index = indexOf(element._events[type].list, listener);

          if (index !== -1) {
            element._events[type].list.splice(index, 1);

            if (!element._events[type].list.length) {
              if (element.detachEvent) {
                element.detachEvent('on' + type, element._events[type]);
              }
              delete element._events[type];
            }
          }
        }
      };

      window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
        if (!arguments.length) {
          throw new Error('Not enough arguments');
        }

        if (!event || typeof event.type !== 'string') {
          throw new Error('DOM Events Exception 0');
        }

        var element = this,
            type = event.type;

        try {
          if (!event.bubbles) {
            event.cancelBubble = true;

            var cancelBubbleEvent = function cancelBubbleEvent(event) {
              event.cancelBubble = true;

              (element || window).detachEvent('on' + type, cancelBubbleEvent);
            };

            this.attachEvent('on' + type, cancelBubbleEvent);
          }

          this.fireEvent('on' + type, event);
        } catch (error) {
          event.target = element;

          do {
            event.currentTarget = element;

            if ('_events' in element && typeof element._events[type] === 'function') {
              element._events[type].call(element, event);
            }

            if (typeof element['on' + type] === 'function') {
              element['on' + type].call(element, event);
            }

            element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
          } while (element && !event.cancelBubble);
        }

        return true;
      };

      // Add the DOMContentLoaded Event
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
          document.dispatchEvent(new Event('DOMContentLoaded', {
            bubbles: true
          }));
        }
      });
    }
  })();

  // CustomEvent
  this.CustomEvent = function CustomEvent(type, eventInitDict) {
    if (!type) {
      throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.');
    }

    var event;
    eventInitDict = eventInitDict || { bubbles: false, cancelable: false, detail: null };

    if ('createEvent' in document) {
      try {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
      } catch (error) {
        // for browsers which don't support CustomEvent at all, we use a regular event instead
        event = document.createEvent('Event');
        event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
        event.detail = eventInitDict.detail;
      }
    } else {
      // IE8
      event = new Event(type, eventInitDict);
      event.detail = eventInitDict && eventInitDict.detail || null;
    }
    return event;
  };

  CustomEvent.prototype = Event.prototype;

  // _DOMTokenList
  var _DOMTokenList = function () {
    // eslint-disable-line no-unused-vars
    function tokenize(token) {
      if (/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/.test(token)) {
        return String(token);
      } else {
        throw new Error('InvalidCharacterError: DOM Exception 5');
      }
    }

    function toObject(self) {
      for (var index = -1, object = {}, element; element = self[++index];) {
        object[element] = true;
      }

      return object;
    }

    function fromObject(self, object) {
      var array = [],
          token;

      for (token in object) {
        if (object[token]) {
          array.push(token);
        }
      }

      [].splice.apply(self, [0, self.length].concat(array));
    }

    var DTL = function DTL() {};

    DTL.prototype = {
      constructor: DTL,
      item: function item(index) {
        return this[parseFloat(index)] || null;
      },
      length: Array.prototype.length,
      toString: function toString() {
        return [].join.call(this, ' ');
      },

      add: function add() {
        for (var object = toObject(this), index = 0, token; index in arguments; ++index) {
          token = tokenize(arguments[index]);

          object[token] = true;
        }

        fromObject(this, object);
      },
      contains: function contains(token) {
        return token in toObject(this);
      },
      remove: function remove() {
        for (var object = toObject(this), index = 0, token; index in arguments; ++index) {
          token = tokenize(arguments[index]);

          object[token] = false;
        }

        fromObject(this, object);
      },
      toggle: function toggle(token) {
        var object = toObject(this),
            contains = 1 in arguments ? !arguments[1] : tokenize(token) in object;

        object[token] = !contains;

        fromObject(this, object);

        return !contains;
      }
    };

    return DTL;
  }();

  // Element.prototype.classList
  // @vinay 19/11/2017: Safary 8 bug
  try {
    Object.defineProperty(Element.prototype, 'classList', {
      configurable: true,
      get: function get() {
        function pull() {
          var className = (0, _typeof3['default'])(element.className) === 'object' ? element.className.baseVal : element.className;
          [].splice.apply(classList, [0, classList.length].concat((className || '').replace(/^\s+|\s+$/g, '').split(/\s+/)));
        }

        function push() {
          if (element.attachEvent) {
            element.detachEvent('onpropertychange', pull);
          }

          if ((0, _typeof3['default'])(element.className) === 'object') {
            element.className.baseVal = original.toString.call(classList);
          } else {
            element.className = original.toString.call(classList);
          }

          if (element.attachEvent) {
            element.attachEvent('onpropertychange', pull);
          }
        }

        var element = this;
        var original = _DOMTokenList.prototype;
        var ClassList = function ClassList() {};
        var classList;

        ClassList.prototype = new _DOMTokenList();

        ClassList.prototype.item = function item(index) {
          // eslint-disable-line no-unused-vars
          return pull(), original.item.apply(classList, arguments);
        };

        ClassList.prototype.toString = function toString() {
          return pull(), original.toString.apply(classList, arguments);
        };

        ClassList.prototype.add = function add() {
          return pull(), original.add.apply(classList, arguments), push();
        };

        ClassList.prototype.contains = function contains(token) {
          // eslint-disable-line no-unused-vars
          return pull(), original.contains.apply(classList, arguments);
        };

        ClassList.prototype.remove = function remove() {
          return pull(), original.remove.apply(classList, arguments), push();
        };

        ClassList.prototype.toggle = function toggle(token) {
          return pull(), token = original.toggle.apply(classList, arguments), push(), token;
        };

        classList = new ClassList();

        if (element.attachEvent) {
          element.attachEvent('onpropertychange', pull);
        }

        return classList;
      }
    });
  } catch (error) {/* */};

  // Object.assign
  Object.assign = function assign(target, source) {
    // eslint-disable-line no-unused-vars
    for (var index = 1, key, src; index < arguments.length; ++index) {
      src = arguments[index];

      for (key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          target[key] = src[key];
        }
      }
    }

    return target;
  };

  // Date.now
  Date.now = function now() {
    return new Date().getTime();
  };

  /* Polyfill for findIndex */
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', { value: function value(predicate) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);var len = o.length >>> 0;if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var thisArg = arguments[1];var k = 0;while (k < len) {
          var kValue = o[k];if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          k++;
        }
        return -1;
      } });
  }

  // performance.now
  (function (global) {
    var startTime = Date.now();

    if (!global.performance) {
      global.performance = {};
    }

    global.performance.now = function () {
      return Date.now() - startTime;
    };
  })(this);

  // requestAnimationFrame
  (function (global) {
    var rafPrefix;

    if ('mozRequestAnimationFrame' in global) {
      rafPrefix = 'moz';
    } else if ('webkitRequestAnimationFrame' in global) {
      rafPrefix = 'webkit';
    }

    if (rafPrefix) {
      global.requestAnimationFrame = function (callback) {
        return global[rafPrefix + 'RequestAnimationFrame'](function () {
          callback(performance.now());
        });
      };
      global.cancelAnimationFrame = global[rafPrefix + 'CancelAnimationFrame'];
    } else {
      var lastTime = Date.now();

      global.requestAnimationFrame = function (callback) {
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }

        var currentTime = Date.now(),
            delay = 16 + lastTime - currentTime;

        if (delay < 0) {
          delay = 0;
        }

        lastTime = currentTime;

        return setTimeout(function () {
          lastTime = Date.now();

          callback(performance.now());
        }, delay);
      };

      global.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })(this);

  // ~html5-elements
  /**
  * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
  */
  !function (a, b) {
    function c(a, b) {
      var c = a.createElement('p'),
          d = a.getElementsByTagName('head')[0] || a.documentElement;return c.innerHTML = 'x<style>' + b + '</style>', d.insertBefore(c.lastChild, d.firstChild);
    }function d() {
      var a = t.elements;return typeof a === 'string' ? a.split(' ') : a;
    }function e(a, b) {
      var c = t.elements;typeof c !== 'string' && (c = c.join(' ')), typeof a !== 'string' && (a = a.join(' ')), t.elements = c + ' ' + a, j(b);
    }function f(a) {
      var b = s[a[q]];return b || (b = {}, r++, a[q] = r, s[r] = b), b;
    }function g(a, c, d) {
      if (c || (c = b), l) return c.createElement(a);d || (d = f(c));var e;return e = d.cache[a] ? d.cache[a].cloneNode() : p.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !e.canHaveChildren || o.test(a) || e.tagUrn ? e : d.frag.appendChild(e);
    }function h(a, c) {
      if (a || (a = b), l) return a.createDocumentFragment();c = c || f(a);for (var e = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) {
        e.createElement(h[g]);
      }return e;
    }function i(a, b) {
      b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
        return t.shivMethods ? g(c, a, b) : b.createElem(c);
      }, a.createDocumentFragment = Function('h,f', 'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' + d().join().replace(/[\w\-:]+/g, function (a) {
        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
      }) + ');return n}')(t, b.frag);
    }function j(a) {
      a || (a = b);var d = f(a);return !t.shivCSS || k || d.hasCSS || (d.hasCSS = !!c(a, 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}')), l || i(a, d), a;
    }var k,
        l,
        m = '3.7.3-pre',
        n = a.html5 || {},
        o = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        q = '_html5shiv',
        r = 0,
        s = {};!function () {
      try {
        var a = b.createElement('a');a.innerHTML = '<xyz></xyz>', k = 'hidden' in a, l = a.childNodes.length == 1 || function () {
          b.createElement('a');var a = b.createDocumentFragment();return typeof a.cloneNode === 'undefined' || typeof a.createDocumentFragment === 'undefined' || typeof a.createElement === 'undefined';
        }();
      } catch (c) {
        k = !0, l = !0;
      }
    }();var t = { elements: n.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video', version: m, shivCSS: n.shivCSS !== !1, supportsUnknownElements: l, shivMethods: n.shivMethods !== !1, type: 'default', shivDocument: j, createElement: g, createDocumentFragment: h, addElements: e };a.html5 = t, j(b), (typeof module === 'undefined' ? 'undefined' : (0, _typeof3['default'])(module)) === 'object' && module.exports && (module.exports = t);
  }(typeof window !== 'undefined' ? window : this, document);
}).call((typeof window === 'undefined' ? 'undefined' : (0, _typeof3['default'])(window)) === 'object' && window || (typeof self === 'undefined' ? 'undefined' : (0, _typeof3['default'])(self)) === 'object' && self || (typeof global === 'undefined' ? 'undefined' : (0, _typeof3['default'])(global)) === 'object' && global || {});
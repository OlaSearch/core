'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Use try {} catch (e) {} for localStorage because of users browser privacy settings
 */
module.exports = {
  get: function get(key, namespace) {
    var _key = (0, _utilities.getKey)(key, namespace);
    try {
      if (window.localStorage.getItem(_key)) {
        return JSON.parse(window.localStorage.getItem(_key));
      }
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  },
  set: function set(key, value, namespace) {
    try {
      if ('localStorage' in window) {
        window.localStorage.setItem((0, _utilities.getKey)(key, namespace), (0, _stringify2['default'])(value));
      }
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  },

  cookies: {
    set: function set(name, value, days, namespace) {
      var expires;
      /* Always encode URI for objects */
      if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value)) === 'object') {
        value = encodeURIComponent((0, _stringify2['default'])(value));
      }
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
      } else expires = '';
      try {
        document.cookie = (0, _utilities.getKey)(name, namespace) + '=' + value + expires + '; path=/';
      } catch (err) {
        console.warn(err);
      }
    },
    get: function get(name, namespace) {
      try {
        var nameEQ = (0, _utilities.getKey)(name, namespace) + '=';
        var ca = document.cookie.split(';');
        for (var i = 0, len = ca.length; i < len; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
          }if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }
        return null;
      } catch (err) {
        console.warn(err);
        return null;
      }
    },
    remove: function remove(name, namespace) {
      this.set((0, _utilities.getKey)(name, namespace), '', -1);
    }
  }
};
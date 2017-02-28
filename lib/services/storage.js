'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utilities = require('./../utilities');

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
      if ('localStorage' in window) window.localStorage.setItem((0, _utilities.getKey)(key, namespace), JSON.stringify(value));
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  },

  cookies: {
    set: function set(name, value, days, namespace) {
      var expires;
      /* Always encode URI for objects */
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') value = encodeURIComponent(JSON.stringify(value));
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
          }if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
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
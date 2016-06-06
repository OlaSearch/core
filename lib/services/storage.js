"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = {
  get: function get(key) {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    }

    return false;
  },
  set: function set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  cookies: {
    set: function set(name, value, days) {
      if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') value = JSON.stringify(value);
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
      } else var expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    get: function get(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      console.log('called');
      return null;
    },
    remove: function remove(name) {
      this.set(name, "", -1);
    }
  }
};
"use strict";

module.exports = {
  get: function get(key) {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    }

    return false;
  },
  set: function set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};
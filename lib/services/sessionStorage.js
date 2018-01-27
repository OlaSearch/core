'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * sessionStorage polyfill
 */
function Storage(type) {
  function setData(data) {
    data = (0, _stringify2['default'])(data);
    window.name = data;
  }
  function clearData() {
    window.name = '';
  }
  function getData() {
    var data = window.name; /* On node env, name => 'nodejs' */
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (err) {}
      return data;
    }
    return {};
  }

  // initialise if there's already data
  var data = getData();

  return {
    length: 0,
    clear: function clear() {
      data = {};
      this.length = 0;
      clearData();
    },
    getItem: function getItem(key) {
      return data[key] === undefined ? null : data[key];
    },
    key: function key(i) {
      // not perfect, but works
      var ctr = 0;
      for (var k in data) {
        if (ctr === i) return k;else ctr++;
      }
      return null;
    },
    removeItem: function removeItem(key) {
      delete data[key];
      this.length--;
      setData(data);
    },
    setItem: function setItem(key, value) {
      data[key] = value + ''; // forces the value to a string
      this.length++;
      setData(data);
    }
  };
}

module.exports = typeof window.sessionStorage !== 'undefined' ? window.sessionStorage : new Storage();
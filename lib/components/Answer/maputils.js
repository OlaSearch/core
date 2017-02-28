'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = {
  callbacks: [],
  appended: false,
  load: function load(params, callback) {
    var index = this.callbacks.push(callback);
    if (window.google.maps) {
      setTimeout(this.fireCallbacks.bind(this));
    } else {
      if (!this.appended) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.appendScript(params);
      }
    }
    return index;
  },
  getSrc: function getSrc(params) {
    var apiKey = params.apiKey;

    var src = 'https://maps.googleapis.com/maps/api/js';
    src += '?callback=mapsCallback&key=' + apiKey + '&libraries=drawing';
    return src;
  },
  appendScript: function appendScript(params) {
    var src = this.getSrc(params);
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.appended = true;
  },
  mapsCallback: function mapsCallback() {
    window.mapsCallback = undefined;
    this.fireCallbacks();
  },
  fireCallbacks: function fireCallbacks() {
    this.callbacks.forEach(function (callback) {
      return callback();
    });
    this.callbacks = [];
  },
  removeCallback: function removeCallback(index) {
    this.callbacks.splice(index - 1, 1);
  }
};
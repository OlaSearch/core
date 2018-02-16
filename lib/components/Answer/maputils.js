'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = {
  callbacks: [],
  appended: false,
  load: function load(params, win, doc, callback) {
    this.window = win || window;
    this.document = doc || document;
    var index = this.callbacks.push(callback);
    if (this.window.google && this.window.google.maps) {
      setTimeout(this.fireCallbacks.bind(this));
    } else {
      if (!this.appended) {
        this.window.mapsCallback = this.mapsCallback.bind(this);
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
    var script = this.document.createElement('script');
    script.setAttribute('src', src);
    this.document.head.appendChild(script);
    this.appended = true;
  },
  mapsCallback: function mapsCallback() {
    this.window.mapsCallback = undefined;
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
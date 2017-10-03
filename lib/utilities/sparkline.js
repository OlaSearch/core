'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SparkLine = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function convertRange(value, _ref, _ref2) {
  var _ref4 = (0, _slicedToArray3['default'])(_ref, 2),
      min = _ref4[0],
      max = _ref4[1];

  var _ref3 = (0, _slicedToArray3['default'])(_ref2, 2),
      rangeMin = _ref3[0],
      rangeMax = _ref3[1];

  return (value - min) * (rangeMax - rangeMin) / (max - min) + rangeMin;
}

function scaleAndTransform(data, range) {
  var max = Math.max.apply(Math, data);
  var min = Math.min.apply(Math, data);
  return data.map(function (i) {
    var d = i - (min < 0 ? min : 0);
    return convertRange(d, [min, max], range);
  });
}

var SparkLine = exports.SparkLine = function SparkLine() {
  if (window.HTMLCanvasElement) {
    return {
      init: function init(options) {
        var el = options.el,
            data = options.data,
            endpoint = options.endpoint,
            _options$color = options.color,
            color = _options$color === undefined ? 'rgba(0,0,0,0.5)' : _options$color,
            _options$style = options.style,
            style = _options$style === undefined ? 'line' : _options$style,
            _options$update = options.update,
            update = _options$update === undefined ? false : _options$update;

        var ctx = el.getContext('2d');
        var height = el.height - 3;
        var width = el.width;
        /* Transform data */
        data = scaleAndTransform(data, [0, height - 3]);
        var total = data.length;
        var max = Math.max.apply(Math, data);
        var min = Math.min.apply(Math, data);
        var xstep = width / total;
        var ystep = (max - (min < 0 ? min : 0)) / height;
        var x = 0;
        var y = height - data[0] / ystep;
        var i;
        if (window.devicePixelRatio) {
          if (!update) {
            el.width = el.width * window.devicePixelRatio;
            el.height = el.height * window.devicePixelRatio;
            el.style.width = el.width / window.devicePixelRatio + 'px';
            el.style.height = el.height / window.devicePixelRatio + 'px';
            el.style.display = 'inline-block';
          }
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        ctx.clearRect(0, 0, width, height + 3);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x, y);
        for (i = 1; i < total; i = i + 1) {
          var d = data[i];
          x = x + xstep;
          y = height - d / ystep + 2;
          if (style === 'bar') {
            ctx.moveTo(x, height);
          }
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        if (endpoint && style === 'line') {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255,0,0,0.5)';
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
  }
};
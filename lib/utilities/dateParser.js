'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.parse = parse;
exports.formatUTC = formatUTC;
exports.toUTC = toUTC;
exports.today = today;

var _fecha = require('fecha');

var _fecha2 = _interopRequireDefault(_fecha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultMask = 'YYYY-MM-DD';

function format(date) {
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMask;
  var originalFormat = arguments[2];

  if (!date) return;
  if (typeof date === 'number' || !isNaN(date)) {
    date = new Date(date);
    return _fecha2['default'].format(date, mask);
  }
  try {
    /**
     * Check if the value is a valid date
     * Example: 2015-12-02
     */
    if (mask === defaultMask) {
      var d = new Date(date);
      if (Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.getTime())) {
        // Valid date
        return _fecha2['default'].format(d, mask);
      }
    }
    date = parse(date, originalFormat || defaultMask);
  } catch (e) {
    console.warn(e, date);
    return '';
  }
  return _fecha2['default'].format(date, mask);
}
function parse(date) {
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMask;

  try {
    /**
     * Check if the value is a valid date
     * Example: 2015-12-02
     */
    if (mask === defaultMask) {
      var d = new Date(date);
      if (Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.getTime())) {
        // Valid date
        return d;
      }
    }
    date = _fecha2['default'].parse(date, mask);
  } catch (e) {
    console.warn(e, date);
    return '';
  }
  return date;
}

function formatUTC(date) {
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMask;

  var d = new Date(date);
  var userTimezoneOffset = d.getTimezoneOffset() * 60000;
  var _d = new Date(d.getTime() + userTimezoneOffset);
  return this.format(_d, mask);
}

function toUTC(date) {
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMask;

  return parse(date, mask).toISOString();
}

function today() {
  var mask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMask;

  return this.format(new Date(), mask);
}

exports['default'] = {
  format: format,
  parse: parse,
  formatUTC: formatUTC,
  toUTC: toUTC,
  today: today
};
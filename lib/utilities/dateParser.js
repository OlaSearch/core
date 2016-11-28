'use strict';

var _fecha = require('fecha');

var _fecha2 = require('../../.babelhelper.js').interopRequireDefault(_fecha);

var defaultMask = 'YYYY-MM-DD';
var DateParser = {
  format: function format(date) {
    var mask = arguments.length <= 1 || arguments[1] === undefined ? defaultMask : arguments[1];
    var originalFormat = arguments[2];

    if (!date) return;
    if (typeof date === 'number' || !isNaN(date)) {
      date = new Date(date);
      return _fecha2['default'].format(date, mask);
    }
    try {
      date = _fecha2['default'].parse(date, originalFormat || defaultMask);
    } catch (e) {
      console.warn(e, date);
      return '';
    }
    return _fecha2['default'].format(date, mask);
  },
  today: function today() {
    var mask = arguments.length <= 0 || arguments[0] === undefined ? defaultMask : arguments[0];

    return this.format(new Date(), mask);
  }
};

module.exports = DateParser;
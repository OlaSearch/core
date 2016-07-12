'use strict';

var _fecha = require('fecha');

var _fecha2 = require('../../.babelhelper.js').interopRequireDefault(_fecha);

var defaultMask = 'YYYY-MM-DD';
var DateParser = {
  format: function format(date) {
    var mask = arguments.length <= 1 || arguments[1] === undefined ? defaultMask : arguments[1];
    var originalFormat = arguments[2];

    if (!date) return;
    if (typeof date === 'string' || typeof date === 'number') {
      date = _fecha2['default'].parse(date, originalFormat || defaultMask);
    }
    return _fecha2['default'].format(date, mask);
  }
};

module.exports = DateParser;
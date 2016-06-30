'use strict';

var _fecha = require('fecha');

var _fecha2 = require('../../.babelhelper.js').interopRequireDefault(_fecha);

var DateParser = {
  format: function format(date, mask, originalFormat) {
    if (!date) return;
    if (typeof date === 'string' || typeof date === 'number') {
      try {
        date = _fecha2['default'].parse(date, originalFormat || 'YYYY-MM-DD');
      } catch (err) {
        console.warn(err);
      }
    }
    return _fecha2['default'].format(date, mask);
  }
};

module.exports = DateParser;
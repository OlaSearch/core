'use strict';

var _fecha = require('fecha');

var _fecha2 = _interopRequireDefault(_fecha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DateParser = {
  format: function format(date, mask, originalFormat) {
    if (!date) return;
    if (typeof date === 'string' || typeof date === 'number') {
      date = _fecha2['default'].parse(date, originalFormat || 'YYYY-MM-DD');
    }
    return _fecha2['default'].format(date, mask);
  }
};

module.exports = DateParser;
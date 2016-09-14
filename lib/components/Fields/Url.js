'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var _Settings = require('./../../constants/Settings');

var Url = function Url(_ref) {
  var result = _ref.result;
  var log = _ref.log;
  var url = result.url;

  if (!url) return _Settings.NO_SCRIPT_TAG;

  return _react2['default'].createElement(
    'a',
    { className: 'ola-field ola-field-url', href: url, onClick: function onClick(event) {
        log({
          eventType: 'C',
          result: result,
          eventCategory: 'Title',
          eventAction: 'click'
        });
      } },
    url
  );
};

module.exports = (0, _OlaLogger2['default'])(Url);
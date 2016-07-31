'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var PerPage = function PerPage(_ref, context) {
  var perPage = _ref.perPage;
  var translate = _ref.translate;
  var dispatch = _ref.dispatch;

  var values = context.config.perPage;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-per-page' },
    _react2['default'].createElement(
      'label',
      { className: 'ola-per-page-label' },
      translate('per_page_label')
    ),
    _react2['default'].createElement(
      'select',
      {
        defaultValue: perPage,
        className: 'ola-per-page-select',
        onChange: function onChange(event) {
          dispatch((0, _Search.changePerPage)(event.target.value));
          dispatch((0, _Search.executeSearch)());
        }
      },
      values.map(function (value, idx) {
        return _react2['default'].createElement(
          'option',
          { key: idx },
          value
        );
      })
    )
  );
};

PerPage.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = (0, _olaTranslate2['default'])(PerPage);
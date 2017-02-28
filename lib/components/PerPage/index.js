'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PerPage = function PerPage(_ref, context) {
  var perPage = _ref.perPage,
      translate = _ref.translate,
      dispatch = _ref.dispatch;

  var values = context.config.perPage;

  function onChange(event) {
    dispatch((0, _Search.changePerPage)(event.target.value));
    dispatch((0, _Search.executeSearch)());
  }

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
        onChange: onChange
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

module.exports = (0, _OlaTranslate2['default'])(PerPage);
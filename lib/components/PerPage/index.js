'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function PerPage(_ref) {
  var perPage = _ref.perPage,
      translate = _ref.translate,
      dispatch = _ref.dispatch,
      config = _ref.config;

  var values = config.perPage;

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
}

module.exports = (0, _withConfig2['default'])((0, _withTranslate2['default'])(PerPage));
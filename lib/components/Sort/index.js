'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

var _chevronDown = require('@olasearch/icons/lib/chevron-down');

var _chevronDown2 = _interopRequireDefault(_chevronDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'option',
  { value: '' },
  'Relevancy'
);

var _ref4 = _react2['default'].createElement(_chevronDown2['default'], { size: 20 });

function Sort(_ref) {
  var _ref$selected = _ref.selected,
      selected = _ref$selected === undefined ? '' : _ref$selected,
      translate = _ref.translate,
      changeSort = _ref.changeSort,
      executeSearch = _ref.executeSearch,
      config = _ref.config;

  function handleChange(event) {
    changeSort(event.target.value);
    executeSearch();
  }
  var sortBy = config.sortBy;
  /* Do not display if there are no sort options */

  if (!sortBy.length) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-sort' },
    _react2['default'].createElement(
      'label',
      { className: 'ola-sort-label', htmlFor: 'Ola-Element-Sort' },
      translate('sort_label'),
      ' '
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-sort-select-wrap' },
      _react2['default'].createElement(
        'select',
        {
          className: 'ola-sort-select',
          value: selected,
          onChange: handleChange,
          id: 'Ola-Element-Sort'
        },
        _ref2,
        sortBy.map(function (_ref3, idx) {
          var name = _ref3.name,
              value = _ref3.value,
              direction = _ref3.direction;
          return _react2['default'].createElement(
            'option',
            {
              key: idx,
              value: '' + value + (direction ? ' ' + direction : '')
            },
            name
          );
        })
      ),
      _ref4
    )
  );
}

function mapStateToProps(state) {
  return {
    selected: state.QueryState.sort
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { changeSort: _Search.changeSort, executeSearch: _Search.executeSearch })((0, _withConfig2['default'])((0, _withTranslate2['default'])(Sort)));
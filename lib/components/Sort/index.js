'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _chevronDown = require('@olasearch/icons/lib/chevron-down');

var _chevronDown2 = _interopRequireDefault(_chevronDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref3 = _react2['default'].createElement(
  'option',
  { value: '' },
  'Relevancy'
);

var _ref4 = _react2['default'].createElement(_chevronDown2['default'], null);

function Sort(_ref, _ref2) {
  var selected = _ref.selected,
      translate = _ref.translate,
      changeSort = _ref.changeSort,
      executeSearch = _ref.executeSearch;
  var config = _ref2.config;

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
        _ref3,
        sortBy.map(function (sort, idx) {
          return _react2['default'].createElement(
            'option',
            { key: idx, value: sort.value },
            sort.name
          );
        })
      ),
      _ref4
    )
  );
}

Sort.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

function mapStateToProps(state) {
  return {
    selected: state.QueryState.sort
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { changeSort: _Search.changeSort, executeSearch: _Search.executeSearch })((0, _withTranslate2['default'])(Sort));
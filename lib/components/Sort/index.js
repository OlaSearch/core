'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref = _react2['default'].createElement(
  'option',
  { value: '' },
  'Relevance'
);

function Sort(props, context) {
  function handleChange(event) {
    var dispatch = props.dispatch;

    dispatch((0, _Search.changeSort)(event.target.value));
    dispatch((0, _Search.executeSearch)());
  }
  var sortBy = context.config.sortBy;
  var selected = props.selected,
      translate = props.translate;


  return _react2['default'].createElement(
    'div',
    { className: 'ola-sort' },
    _react2['default'].createElement(
      'label',
      null,
      translate('sort_label'),
      ' '
    ),
    _react2['default'].createElement(
      'select',
      {
        className: 'ola-sort-select',
        value: selected,
        onChange: handleChange
      },
      _ref,
      sortBy.map(function (sort, idx) {
        return _react2['default'].createElement(
          'option',
          { key: idx, value: sort.value },
          sort.name
        );
      })
    )
  );
}

Sort.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

module.exports = (0, _withTranslate2['default'])(Sort);
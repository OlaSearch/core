'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'option',
  { value: '' },
  'Relevance'
);

var Sort = function (_React$Component) {
  (0, _inherits3['default'])(Sort, _React$Component);

  function Sort() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Sort);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Sort.__proto__ || (0, _getPrototypeOf2['default'])(Sort)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.changeSort)(event.target.value));
      dispatch((0, _Search.executeSearch)());
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Sort, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var sortBy = this.context.config.sortBy;
      var _props = this.props,
          selected = _props.selected,
          translate = _props.translate;


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
            onChange: this.handleChange
          },
          _ref2,
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
  }]);
  return Sort;
}(_react2['default'].Component);

Sort.contextTypes = {
  config: _propTypes2['default'].object
};


module.exports = (0, _OlaTranslate2['default'])(Sort);
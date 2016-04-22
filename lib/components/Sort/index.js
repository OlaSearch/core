'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Sort = function (_React$Component) {
  _inherits(Sort, _React$Component);

  function Sort() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Sort);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Sort)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.changeSort)(event.target.value));
      dispatch((0, _Search.executeSearch)());
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Sort, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var sortBy = this.context.config.sortBy;
      var selected = this.props.selected;


      return _react2['default'].createElement(
        'div',
        { className: 'ola-sort' },
        _react2['default'].createElement(
          'label',
          null,
          'Sort by '
        ),
        _react2['default'].createElement(
          'select',
          {
            className: 'ola-sort-select',
            value: selected,
            onChange: this.handleChange
          },
          _react2['default'].createElement(
            'option',
            { value: '' },
            'Relevance'
          ),
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

Sort.propTypes = {
  dispatch: _react2['default'].PropTypes.func.isRequired,
  selected: _react2['default'].PropTypes.string.isRequired
};

Sort.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = Sort;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var NoResults = function (_React$Component) {
  _inherits(NoResults, _React$Component);

  function NoResults() {
    _classCallCheck(this, NoResults);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NoResults).apply(this, arguments));
  }

  _createClass(NoResults, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var results = _props.results;
      var isLoading = _props.isLoading;
      var q = _props.q;


      if (results.length || isLoading) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-snippet ola-snippet-noresults' },
        'No results found matching ',
        _react2['default'].createElement(
          'strong',
          null,
          q
        )
      );
    }
  }]);

  return NoResults;
}(_react2['default'].Component);

NoResults.propTypes = {
  results: _react2['default'].PropTypes.array,
  isLoading: _react2['default'].PropTypes.bool,
  q: _react2['default'].PropTypes.string
};


module.exports = NoResults;
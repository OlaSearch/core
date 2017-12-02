'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Histogram = function (_React$Component) {
  (0, _inherits3['default'])(Histogram, _React$Component);

  function Histogram() {
    (0, _classCallCheck3['default'])(this, Histogram);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  Histogram.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  };

  Histogram.prototype.render = function render() {
    var data = this.props.data;


    if (!data.length) return null;

    /* Sort data */
    data = data.sort(function (a, b) {
      return a.name - b.name;
    });

    var max = data.reduce(function (a, b) {
      return a.count > b.count ? a : b;
    });
    var maxCount = max.count;


    return _react2['default'].createElement(
      'div',
      { className: 'ola-histogram' },
      data.map(function (item, idx) {
        /* Minimum height is 5% */
        var height = (item.count / maxCount * 100).toFixed(2);
        if (height < 1) {
          height = height * 50;
        } /* 50 is the max height of the histogram */
        return _react2['default'].createElement('div', {
          key: idx,
          className: 'ola-histogram-bar',
          style: {
            height: height + '%'
          }
        });
      })
    );
  };

  return Histogram;
}(_react2['default'].Component);

module.exports = Histogram;
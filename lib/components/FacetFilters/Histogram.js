'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var Histogram = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Histogram, _React$Component);

  function Histogram() {
    require('../../../.babelhelper.js').classCallCheck(this, Histogram);

    return require('../../../.babelhelper.js').possibleConstructorReturn(this, (Histogram.__proto__ || Object.getPrototypeOf(Histogram)).apply(this, arguments));
  }

  require('../../../.babelhelper.js').createClass(Histogram, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.data !== this.props.data;
    }
  }, {
    key: 'render',
    value: function render() {
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
          var height = (item.count / maxCount * 100).toFixed(2);
          return _react2['default'].createElement('div', {
            key: idx,
            className: 'ola-histogram-bar',
            style: {
              height: height + '%'
            }
          });
        })
      );
    }
  }]);

  return Histogram;
}(_react2['default'].Component);

module.exports = Histogram;
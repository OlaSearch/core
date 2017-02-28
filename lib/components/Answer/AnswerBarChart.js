'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; } /* global google */


var AnswerBarChart = function (_React$Component) {
  _inherits(AnswerBarChart, _React$Component);

  function AnswerBarChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AnswerBarChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AnswerBarChart.__proto__ || Object.getPrototypeOf(AnswerBarChart)).call.apply(_ref, [this].concat(args))), _this), _this.drawChart = function () {
      var _this$props$data = _this.props.data,
          record_data = _this$props$data.record_data,
          record_keys = _this$props$data.record_keys;

      var keys = record_keys.map(function (_ref2) {
        var title = _ref2.title;
        return title;
      });
      var data = google.visualization.arrayToDataTable([].concat([], [keys], record_data.slice(0, 8)));
      var view = new google.visualization.DataView(data);
      var options = {
        legend: { position: 'none' }
      };
      var chart = new google.visualization.ColumnChart(_this.el);
      chart.draw(view, options);
    }, _this.registerEl = function (el) {
      _this.el = el;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AnswerBarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.data !== this.props.data;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) {
        this.drawChart();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-barchart' },
        _react2['default'].createElement('div', { ref: this.registerEl })
      );
    }
  }]);

  return AnswerBarChart;
}(_react2['default'].Component);

exports['default'] = AnswerBarChart;
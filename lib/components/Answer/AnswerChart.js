'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _billboard = require('billboard.js');

var _TableDetail = require('./common/TableDetail');

var _TableDetail2 = _interopRequireDefault(_TableDetail);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerCharts = function (_React$Component) {
  (0, _inherits3['default'])(AnswerCharts, _React$Component);

  function AnswerCharts() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, AnswerCharts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.prepareData = function (props) {
      var _props$data = props.data,
          _props$data$record_ke = _props$data.record_keys,
          recordKeys = _props$data$record_ke === undefined ? [] : _props$data$record_ke,
          _props$data$record_da = _props$data.record_data,
          recordData = _props$data$record_da === undefined ? [] : _props$data$record_da;

      var keys = recordKeys.filter(function (key, idx) {
        return idx !== 0;
      });
      var data = recordData.slice(0, 5).map(function (item, idx) {
        var country = item['Country'];
        return [].concat(country, keys.map(function (key) {
          return key in item ? (0, _utilities.sanitizeNumbers)(item[key]) : null;
        }));
      });
      return [['x'].concat(keys)].concat(data);
    }, _this.registerRef = function (el) {
      _this.chartRef = el;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  AnswerCharts.prototype.componentDidMount = function componentDidMount() {
    this.drawChart();
  };

  AnswerCharts.prototype.drawChart = function drawChart() {
    /* Check if record_keys <= 2 */
    /* ["Country", "2017"] => Only one value */
    if (this.props.data.record_keys.length <= 2) {
      this.chartRef.style.display = 'none';
    }

    var data = this.prepareData(this.props);
    this.chart = _billboard.bb.generate({
      bindto: this.chartRef,
      data: {
        x: 'x',
        columns: data
      },
      axis: {
        x: {
          tick: {
            format: function format(d) {
              return d;
            }
          }
        }
      },
      padding: {
        right: 20,
        top: 20
      }
    });
  };

  AnswerCharts.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  };

  AnswerCharts.prototype.componentDidUpdate = function componentDidUpdate() {
    /* Check if record_keys <= 2 */
    /* ["Country", "2017"] => Only one value */
    if (this.props.data.record_keys.length <= 2) {
      this.chartRef.style.display = 'none';
      return;
    } else {
      this.chartRef.style.display = 'block';
    }

    var data = this.prepareData(this.props);
    this.chart.load({
      unload: true,
      columns: data
    });
  };

  AnswerCharts.prototype.render = function render() {
    var title = this.props.title;

    return _react2['default'].createElement(
      'div',
      { className: 'ola-answer-chart' },
      title && _react2['default'].createElement(
        'h4',
        { className: 'ola-answer-table-caption' },
        title
      ),
      _react2['default'].createElement('div', { ref: this.registerRef, className: 'ola-answer-linechart' }),
      _react2['default'].createElement(_TableDetail2['default'], this.props)
    );
  };

  return AnswerCharts;
}(_react2['default'].Component);

exports['default'] = AnswerCharts;
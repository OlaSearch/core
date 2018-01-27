'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _sparkline = require('./../../utilities/sparkline');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Generic answer template
 */
function Generic(_ref) {
  var card = _ref.card;

  return _react2['default'].createElement(
    'span',
    { className: 'ola-answer-quick-title' },
    card.title
  );
}

/**
 * Line chart
 */

var LineChart = function (_React$Component) {
  (0, _inherits3['default'])(LineChart, _React$Component);

  function LineChart() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, LineChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.buildSpark = function () {
      var values = _this.getData();
      if (values && values[0].length > 1 && _this.el) {
        _this.sparkline.init({
          el: _this.el,
          data: values[0],
          endpoint: false,
          color: '#0081bf',
          style: 'line',
          height: _this.props.height,
          width: _this.props.width
        });
      }
    }, _this.registerRef = function (el) {
      _this.el = el;
    }, _this.getData = function () {
      var _this$props$card = _this.props.card,
          recordData = _this$props$card.record_data,
          recordKeys = _this$props$card.record_keys;

      recordKeys = recordKeys.filter(function (_, idx) {
        return idx !== 0;
      });
      return recordData.map(function (item) {
        return recordKeys.map(function (key) {
          return (0, _utilities.sanitizeNumbers)(item[key]);
        });
      });
    }, _this.getChartLabel = function () {
      var lastKey = _this.props.card.record_keys[_this.props.card.record_keys.length - 1];
      var label = _this.props.card.record_data[0][lastKey];
      var unit = _this.props.card.record_units ? _this.props.card.record_units['data'] : '';

      return '<span class=\'ola-answer-quick-value\'>' + label + unit + '</span> (' + lastKey + ')';
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  LineChart.prototype.componentDidMount = function componentDidMount() {
    this.sparkline = new _sparkline.SparkLine();
    this.buildSpark();
  };

  LineChart.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.card !== this.props.card;
  };

  LineChart.prototype.componentDidUpdate = function componentDidUpdate() {
    this.buildSpark();
  };

  LineChart.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.card.record_data !== nextProps.card.record_data;
  };

  LineChart.prototype.render = function render() {
    var values = this.getData();
    var recordUnits = this.props.card.record_units;

    if (values && values.length > 1) return null;
    if (values && values[0].length > 1) {
      var chartLabel = this.getChartLabel();
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-quick-chart' },
        _react2['default'].createElement('canvas', {
          className: 'ola-answer-quick-canvas',
          ref: this.registerRef,
          width: this.props.width,
          height: this.props.height
        }),
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-quick-chart-label' },
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(chartLabel) })
        )
      );
    } else {
      if (!recordUnits) return null;
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-quick-singleData' },
        _react2['default'].createElement(
          'span',
          { className: 'ola-answer-quick-value' },
          values[0].map(function (v) {
            return v;
          })
        ),
        recordUnits.data ? _react2['default'].createElement(
          'span',
          { className: 'ola-answer-quick-unit' },
          recordUnits.data
        ) : null
      );
    }
  };

  return LineChart;
}(_react2['default'].Component);

/**
 * List template
 */


LineChart.defaultProps = {
  width: 100,
  height: 15
};
function List(_ref2) {
  var card = _ref2.card,
      onSelect = _ref2.onSelect;
  var elements = card.elements;

  function handleClick(e) {
    e.stopPropagation();
  }
  function handleCardClick(e, title) {
    onSelect(e, {
      term: title,
      type: 'query'
    });
    e.preventDefault();
    e.stopPropagation();
  }
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-quick-listItems' },
    elements.map(function (_ref3, idx) {
      var title = _ref3.title,
          subtitle = _ref3.subtitle,
          buttons = _ref3.buttons;

      return _react2['default'].createElement(
        'div',
        {
          key: idx,
          className: 'ola-answer-quick-listItem',
          onClick: function onClick(e) {
            return handleCardClick(e, title);
          }
        },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-quick-listItemInner' },
          title && _react2['default'].createElement(
            'p',
            { className: 'ola-answer-quick-list-title' },
            title
          ),
          subtitle && _react2['default'].createElement(
            'p',
            { className: 'ola-answer-quick-list-subtitle' },
            subtitle
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-answer-quick-list-buttons' },
            buttons.map(function (button, i) {
              return _react2['default'].createElement(
                'a',
                {
                  key: i,
                  href: button.url,
                  className: 'ola-answer-quick-list-button',
                  onClick: handleClick
                },
                button.title
              );
            })
          )
        )
      );
    })
  );
}

/**
 * Template switcher
 */
function getTemplate(card, onSelect) {
  switch (card.template) {
    case 'line_chart':
      return _react2['default'].createElement(LineChart, { card: card, onSelect: onSelect });
    case 'list':
      return _react2['default'].createElement(List, { card: card, onSelect: onSelect });
    default:
      return _react2['default'].createElement(Generic, { card: card, onSelect: onSelect });
  }
}

function AnswerQuick(_ref4) {
  var answer = _ref4.answer,
      onSelect = _ref4.onSelect;

  if (!answer) return null;
  var card = answer.card;
  var template = card.template;

  var klass = (0, _classnames2['default'])('ola-answer-quick', 'ola-answer-quick-' + template);
  return _react2['default'].createElement(
    'div',
    { className: klass, onClick: onSelect },
    getTemplate(card, onSelect)
  );
}

module.exports = AnswerQuick;
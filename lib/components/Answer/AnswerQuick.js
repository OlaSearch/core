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

var _utilities = require('./../../utilities');

var _sparkline = require('./../../utilities/sparkline');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Generic = function Generic(_ref) {
  var card = _ref.card;

  return _react2['default'].createElement(
    'span',
    null,
    card.title
  );
};

var LineChart = function (_React$Component) {
  (0, _inherits3['default'])(LineChart, _React$Component);

  function LineChart() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, LineChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref2 = LineChart.__proto__ || (0, _getPrototypeOf2['default'])(LineChart)).call.apply(_ref2, [this].concat(args))), _this), _this.buildSpark = function () {
      var values = _this.getData();
      if (values.length > 1 && _this.el) {
        (0, _sparkline.SparkLine)(_this.el, values[0], true, 'rgba(0,0,255,.5)');
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
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(LineChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.buildSpark();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // this.buildSpark()
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.card.record_data !== nextProps.card.record_data;
    }
  }, {
    key: 'render',
    value: function render() {
      var values = this.getData();
      if (values && values[0].length > 1) {
        return _react2['default'].createElement('canvas', { ref: this.registerRef, width: 100, height: 15 });
      } else {
        return _react2['default'].createElement(
          'span',
          null,
          values[0].map(function (v) {
            return v;
          }),
          ' '
        );
      }
    }
  }]);
  return LineChart;
}(_react2['default'].Component);

var List = function List(_ref3) {
  var card = _ref3.card;
  var elements = card.elements;

  function handleClick(e) {
    e.stopPropagation();
  }
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-quick-list' },
    elements.map(function (_ref4, idx) {
      var subtitle = _ref4.subtitle,
          buttons = _ref4.buttons;

      return _react2['default'].createElement(
        'div',
        { key: idx, className: 'ola-answer-quick-listItem' },
        _react2['default'].createElement(
          'p',
          { className: 'ola-answer-quick-subtitle' },
          subtitle
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-quick-buttonList' },
          buttons.map(function (button, i) {
            return _react2['default'].createElement(
              'a',
              {
                key: i,
                href: button.url,
                className: 'ola-answer-quick-button',
                onClick: handleClick
              },
              button.title
            );
          })
        )
      );
    })
  );
};

function getTemplate(card) {
  switch (card.template) {
    case 'line_chart':
      return _react2['default'].createElement(LineChart, { card: card });
    case 'list':
      return _react2['default'].createElement(List, { card: card });
    default:
      return _react2['default'].createElement(Generic, { card: card });
  }
}

var AnswerQuick = function AnswerQuick(_ref5) {
  var answer = _ref5.answer,
      onSelect = _ref5.onSelect;

  // if (!answer) return null
  return null;
  var card = answer.card;
  var template = card.template;

  var klass = (0, _classnames2['default'])('ola-answer-quick', 'ola-answer-quick-' + template);
  return _react2['default'].createElement(
    'div',
    { className: klass, onClick: onSelect },
    getTemplate(card)
  );
};

module.exports = AnswerQuick;
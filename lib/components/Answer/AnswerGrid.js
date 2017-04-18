'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = _interopRequireDefault(_ListKeyValue);

var _AnswerCard = require('./AnswerCard');

var _AnswerCard2 = _interopRequireDefault(_AnswerCard);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var AnswerGrid = function (_React$Component) {
  _inherits(AnswerGrid, _React$Component);

  function AnswerGrid(props) {
    _classCallCheck(this, AnswerGrid);

    var _this = _possibleConstructorReturn(this, (AnswerGrid.__proto__ || Object.getPrototypeOf(AnswerGrid)).call(this, props));

    _this.showAnswerCard = function (answer) {
      if (_this.state.isOpen && answer === _this.state.selectedAnswer) {
        return _this.hideAnswerCard();
      }
      _this.setState({
        isOpen: true,
        selectedAnswer: answer
      });
    };

    _this.hideAnswerCard = function () {
      _this.setState({
        isOpen: false,
        selectedAnswer: null
      });
    };

    _this.handleClickOutside = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.state = {
      isOpen: false,
      selectedAnswer: null
    };
    return _this;
  }

  _createClass(AnswerGrid, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.answer !== this.props.answer) {
        this.hideAnswerCard();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          answer = _props.answer;

      var klass = (0, _classnames2['default'])('ola-answer-items', {
        'ola-answer-items-single': data.length === 1
      });
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-grid' },
        _react2['default'].createElement(
          'div',
          { className: klass },
          data.slice(0, 4).map(function (result, idx) {
            return _react2['default'].createElement(_AnswerCard2['default'], {
              key: result.title,
              cdn: _this2.context.config.cdn,
              imagePlaceholder: _this2.context.config.imagePlaceholder,
              result: result,
              module: answer.module,
              onSelect: _this2.showAnswerCard,
              isActive: _this2.state.selectedAnswer === result
            });
          })
        ),
        this.state.isOpen ? _react2['default'].createElement(_ListKeyValue2['default'], { data: this.state.selectedAnswer.additional_data, onClose: this.hideAnswerCard }) : null
      );
    }
  }]);

  return AnswerGrid;
}(_react2['default'].Component);

AnswerGrid.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};
exports['default'] = AnswerGrid;
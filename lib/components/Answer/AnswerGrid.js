'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = _interopRequireDefault(_ListKeyValue);

var _AnswerCard = require('./AnswerCard');

var _AnswerCard2 = _interopRequireDefault(_AnswerCard);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerGrid = function (_React$Component) {
  (0, _inherits3['default'])(AnswerGrid, _React$Component);

  function AnswerGrid(props) {
    (0, _classCallCheck3['default'])(this, AnswerGrid);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (AnswerGrid.__proto__ || (0, _getPrototypeOf2['default'])(AnswerGrid)).call(this, props));

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

  (0, _createClass3['default'])(AnswerGrid, [{
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
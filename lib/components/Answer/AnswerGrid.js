'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = require('../../../.babelhelper.js').interopRequireDefault(_ListKeyValue);

var _AnswerCard = require('./AnswerCard');

var _AnswerCard2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerCard);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var AnswerGrid = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AnswerGrid, _React$Component);

  function AnswerGrid(props) {
    require('../../../.babelhelper.js').classCallCheck(this, AnswerGrid);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (AnswerGrid.__proto__ || Object.getPrototypeOf(AnswerGrid)).call(this, props));

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

  require('../../../.babelhelper.js').createClass(AnswerGrid, [{
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
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};
exports['default'] = AnswerGrid;
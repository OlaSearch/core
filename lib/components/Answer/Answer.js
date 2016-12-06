'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _AnswerSuggestion = require('./AnswerSuggestion');

var _AnswerSuggestion2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerSuggestion);

var _AnswerCard = require('./AnswerCard');

var _AnswerCard2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerCard);

var _AnswerInfo = require('./AnswerInfo');

var _AnswerInfo2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerInfo);

var _utilities = require('./../../utilities');

var _Search = require('./../../actions/Search');

var _ref = _react2['default'].createElement(
  'div',
  { className: 'ola-answer-loading' },
  _react2['default'].createElement(
    'p',
    null,
    'Loading instant answer'
  )
);

var Answer = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Answer, _React$Component);

  function Answer(props) {
    require('../../../.babelhelper.js').classCallCheck(this, Answer);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(Answer).call(this, props));

    _this.handleChange = function (option, index, itemKey) {
      _this.props.dispatch((0, _Search.changeAnswerSelection)(index, itemKey, _this.props.answer));
    };

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

    _this.handleSkipIntent = function () {
      _this.props.dispatch((0, _Search.updateQueryTerm)(_this.props.answer.original));
      _this.props.dispatch((0, _Search.setSkipIntent)(true));
      _this.props.dispatch((0, _Search.executeSearch)());
    };

    _this.state = {
      isOpen: false,
      selectedAnswer: null
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(Answer, [{
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

      var _props = this.props;
      var answer = _props.answer;
      var isLoading = _props.isLoading;
      var result = _props.result;


      if (isLoading) {
        return _ref;
      }
      /**
       * If the answer is from search engine
       */
      if (result) {
        return _react2['default'].createElement(
          'div',
          { className: 'ola-snippet-answer' },
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(result.ola_answer) })
        );
      }
      if (!answer) return null;
      var data = answer.data;
      var source = answer.source;

      /**
       * If the answer is from Intent engine
       */

      if (data) {
        var klass = (0, _classnames2['default'])('ola-answer-items', {
          'ola-answer-items-single': data.length === 1
        });
        return _react2['default'].createElement(
          'div',
          { className: 'ola-snippet-answer' },
          _react2['default'].createElement(_AnswerSuggestion2['default'], {
            answer: answer,
            onChange: this.handleChange,
            onSkipIntent: this.handleSkipIntent
          }),
          data.length ? _react2['default'].createElement(
            'div',
            { className: 'ola-snippet ola-answer' },
            _react2['default'].createElement(
              'div',
              { className: klass },
              data.slice(0, 4).map(function (result, idx) {
                return _react2['default'].createElement(_AnswerCard2['default'], {
                  key: result.title,
                  cdn: _this2.context.config.cdn,
                  result: result,
                  module: answer.module,
                  onSelect: _this2.showAnswerCard,
                  isActive: _this2.state.selectedAnswer === result
                });
              })
            ),
            this.state.isOpen ? _react2['default'].createElement(_AnswerInfo2['default'], { answer: this.state.selectedAnswer, onClose: this.hideAnswerCard }) : null,
            source ? _react2['default'].createElement(
              'div',
              { className: 'ola-answer-source' },
              'Source: ',
              _react2['default'].createElement(
                'a',
                { target: '_blank', href: source.url },
                source.name
              )
            ) : null
          ) : null
        );
      }
      return null;
    }
  }]);

  return Answer;
}(_react2['default'].Component);

Answer.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};


module.exports = Answer;
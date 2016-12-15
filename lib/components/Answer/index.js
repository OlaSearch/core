'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _AnswerSuggestion = require('./AnswerSuggestion');

var _AnswerSuggestion2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerSuggestion);

var _TableDetail = require('./common/TableDetail');

var _TableDetail2 = require('../../../.babelhelper.js').interopRequireDefault(_TableDetail);

var _ItemDetail = require('./common/ItemDetail');

var _ItemDetail2 = require('../../../.babelhelper.js').interopRequireDefault(_ItemDetail);

var _AnswerGrid = require('./AnswerGrid');

var _AnswerGrid2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerGrid);

var _AnswerPersonInfoDetail = require('./AnswerPersonInfoDetail');

var _AnswerPersonInfoDetail2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerPersonInfoDetail);

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

  function Answer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Answer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Answer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (option, index, itemKey) {
      _this.props.dispatch((0, _Search.changeAnswerSelection)(index, itemKey, _this.props.answer));
    }, _this.handleSkipIntent = function () {
      _this.props.dispatch((0, _Search.updateQueryTerm)(_this.props.answer.original));
      _this.props.dispatch((0, _Search.setSkipIntent)(true));
      _this.props.dispatch((0, _Search.executeSearch)());
    }, _this.templatePicker = function (template, data, module) {
      if (_this.props.templates && _this.props.templates.hasOwnProperty(module)) {
        var Component = _this.props.templates[module];
        return _react2['default'].createElement(Component, { data: data });
      }
      switch (template) {
        case 'table_detail':
          return _react2['default'].createElement(_TableDetail2['default'], {
            data: data
          });

        case 'person_info_grid':
        case 'text':
          return _react2['default'].createElement(_AnswerGrid2['default'], {
            data: data,
            result: _this.props.result,
            answer: _this.props.answer
          });

        case 'item_detail':
          return _react2['default'].createElement(_ItemDetail2['default'], { data: data });

        case 'person_info_detail':
          return _react2['default'].createElement(_AnswerPersonInfoDetail2['default'], {
            data: data
          });

        default:
          return null;
      }
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Answer, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var answer = _props.answer;
      var isLoading = _props.isLoading;


      if (isLoading) {
        return _ref;
      }

      if (!answer) return null;
      var data = answer.data;
      var template = answer.template;
      var module = answer.module;
      var source = answer.source;
      /**
       * If the answer is from Intent engine
       */

      if (data) {
        return _react2['default'].createElement(
          'div',
          { className: 'ola-snippet-answer' },
          _react2['default'].createElement(_AnswerSuggestion2['default'], {
            answer: answer,
            onChange: this.handleChange,
            onSkipIntent: this.handleSkipIntent
          }),
          _react2['default'].createElement(
            'div',
            { className: 'ola-answer' },
            this.templatePicker(template, data, module)
          ),
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
        );
      }
      return null;
    }
  }]);

  return Answer;
}(_react2['default'].Component);

module.exports = Answer;
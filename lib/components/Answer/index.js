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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AnswerSuggestion = require('./AnswerSuggestion');

var _AnswerSuggestion2 = _interopRequireDefault(_AnswerSuggestion);

var _TableDetail = require('./common/TableDetail');

var _TableDetail2 = _interopRequireDefault(_TableDetail);

var _ItemDetail = require('./common/ItemDetail');

var _ItemDetail2 = _interopRequireDefault(_ItemDetail);

var _AnswerGrid = require('./AnswerGrid');

var _AnswerGrid2 = _interopRequireDefault(_AnswerGrid);

var _AnswerGeneric = require('./AnswerGeneric');

var _AnswerGeneric2 = _interopRequireDefault(_AnswerGeneric);

var _AnswerList = require('./AnswerList');

var _AnswerList2 = _interopRequireDefault(_AnswerList);

var _AnswerPersonInfoDetail = require('./AnswerPersonInfoDetail');

var _AnswerPersonInfoDetail2 = _interopRequireDefault(_AnswerPersonInfoDetail);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'div',
  { className: 'ola-answer-loading' },
  _react2['default'].createElement(
    'p',
    null,
    'Loading instant answer'
  )
);

var Answer = function (_React$Component) {
  (0, _inherits3['default'])(Answer, _React$Component);

  function Answer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Answer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Answer.__proto__ || (0, _getPrototypeOf2['default'])(Answer)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (option, index, itemKey) {
      _this.props.dispatch((0, _Search.changeAnswerSelection)(index, itemKey, _this.props.answer));
    }, _this.handleSkipIntent = function () {
      _this.props.dispatch((0, _Search.updateQueryTerm)(_this.props.answer.original));
      _this.props.dispatch((0, _Search.setSkipIntent)(true));
      _this.props.dispatch((0, _Search.executeSearch)());
    }, _this.templatePicker = function (template, data, module) {
      /* Check for user defined templates */
      if (_this.props.templates && _this.props.templates.hasOwnProperty(template)) {
        var Component = _this.props.templates[template];
        return _react2['default'].createElement(Component, { data: data, module: module });
      }
      switch (template) {
        case 'table_detail':
          return _react2['default'].createElement(_TableDetail2['default'], { data: data });

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
          return _react2['default'].createElement(_AnswerPersonInfoDetail2['default'], { data: data });

        case 'list':
          return _react2['default'].createElement(_AnswerList2['default'], { data: data });

        case 'generic':
          return _react2['default'].createElement(_AnswerGeneric2['default'], data);

        default:
          return null;
      }
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Answer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          answer = _props.answer,
          isLoading = _props.isLoading;


      if (isLoading) {
        return _ref2;
      }

      if (!answer || !answer.card) return null;

      var card = answer.card,
          module = answer.module,
          intent = answer.intent;
      var template = card.template,
          source = card.source;

      var intentName = intent ? intent.split('.').pop() : null;
      var snippetClass = (0, _classnames2['default'])('ola-snippet-answer', 'ola-snippet-template-' + template);
      var answerKlass = (0, _classnames2['default'])('ola-answer', 'ola-answer-intent-' + intentName, 'ola-answer-template-' + template);
      /**
       * If the answer is from Intent engine
       */
      if (card) {
        return _react2['default'].createElement(
          'div',
          { className: snippetClass },
          _react2['default'].createElement(_AnswerSuggestion2['default'], {
            answer: answer,
            onChange: this.handleChange,
            onSkipIntent: this.handleSkipIntent
          }),
          _react2['default'].createElement(
            'div',
            { className: answerKlass },
            this.templatePicker(template, card, module)
          ),
          source ? _react2['default'].createElement(
            'div',
            { className: 'ola-answer-source' },
            'Source:',
            ' ',
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
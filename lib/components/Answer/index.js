'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(Answer, _React$Component);

  function Answer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Answer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Answer.__proto__ || Object.getPrototypeOf(Answer)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (option, index, itemKey) {
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
          return _react2['default'].createElement(_AnswerPersonInfoDetail2['default'], { data: data });

        case 'list':
          return _react2['default'].createElement(_AnswerList2['default'], { data: data });

        case 'generic':
          return _react2['default'].createElement(_AnswerGeneric2['default'], data);

        default:
          return null;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Answer, [{
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
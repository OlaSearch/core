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

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerList = function (_React$Component) {
  (0, _inherits3['default'])(AnswerList, _React$Component);

  function AnswerList(props) {
    (0, _classCallCheck3['default'])(this, AnswerList);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (AnswerList.__proto__ || (0, _getPrototypeOf2['default'])(AnswerList)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass3['default'])(AnswerList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          max = _props.max,
          translate = _props.translate;
      var elements = data.elements;
      var isOpen = this.state.isOpen;

      var size = elements.length;
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-list-info-detail' },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-list-items' },
          elements.slice(0, isOpen ? undefined : max).map(function (item, idx) {
            var title = item.title,
                subtitle = item.subtitle,
                fields = item.fields,
                _item$buttons = item.buttons,
                buttons = _item$buttons === undefined ? [] : _item$buttons;

            return _react2['default'].createElement(
              'div',
              { className: 'ola-answer-item', key: idx },
              _react2['default'].createElement(
                'div',
                { className: 'ola-answer-item-wrapper' },
                _react2['default'].createElement(
                  'div',
                  { className: 'ola-answer-title' },
                  _react2['default'].createElement(
                    'span',
                    { className: 'ola-answer-title-text' },
                    title
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'ola-answer-subtitle' },
                    subtitle
                  )
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'ola-answer-keyvalue' },
                  fields.map(function (_ref, idx) {
                    var label = _ref.label,
                        value = _ref.value;

                    var klass = (0, _classnames2['default'])('ola-answer-row', 'ola-answer-row-' + label);
                    return _react2['default'].createElement(
                      'div',
                      { className: klass, key: idx },
                      _react2['default'].createElement(
                        'div',
                        { className: 'ola-answer-value' },
                        value
                      )
                    );
                  })
                ),
                buttons.map(function (button, idx) {
                  return _react2['default'].createElement(
                    'a',
                    { key: idx, className: 'ola-answer-email', href: button.url },
                    button.title
                  );
                })
              )
            );
          })
        ),
        size > max ? _react2['default'].createElement(
          'button',
          { className: 'ola-answer-link-more', onClick: this.toggle },
          isOpen ? translate('answers_show_less') : translate('answers_show_more')
        ) : null
      );
    }
  }]);
  return AnswerList;
}(_react2['default'].Component);

AnswerList.defaultProps = {
  max: 3
};


module.exports = (0, _OlaTranslate2['default'])(AnswerList);
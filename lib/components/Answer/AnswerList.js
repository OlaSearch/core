'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var AnswerList = function (_React$Component) {
  _inherits(AnswerList, _React$Component);

  function AnswerList(props) {
    _classCallCheck(this, AnswerList);

    var _this = _possibleConstructorReturn(this, (AnswerList.__proto__ || Object.getPrototypeOf(AnswerList)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(AnswerList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          max = _props.max,
          translate = _props.translate;
      var elements = data.elements,
          title = data.title;
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
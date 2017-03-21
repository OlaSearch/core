'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = _interopRequireDefault(_ListKeyValue);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var AnswerPersonInfoDetail = function (_React$Component) {
  _inherits(AnswerPersonInfoDetail, _React$Component);

  function AnswerPersonInfoDetail(props) {
    _classCallCheck(this, AnswerPersonInfoDetail);

    var _this = _possibleConstructorReturn(this, (AnswerPersonInfoDetail.__proto__ || Object.getPrototypeOf(AnswerPersonInfoDetail)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(AnswerPersonInfoDetail, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          max = _props.max,
          translate = _props.translate;
      var caption = data.caption;
      var isOpen = this.state.isOpen;

      var size = data.length;
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-person-info-detail' },
        caption && _react2['default'].createElement(
          'h4',
          { className: 'ola-answer-table-caption' },
          caption
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-person-items' },
          data.slice(0, isOpen ? undefined : max).map(function (item, idx) {
            var title = item.title,
                subtitle = item.subtitle,
                description = item.description,
                additionalData = item.additional_data;

            return _react2['default'].createElement(
              'div',
              { className: 'ola-answer-item', key: idx },
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
                  subtitle || description
                )
              ),
              _react2['default'].createElement(_ListKeyValue2['default'], { data: additionalData })
            );
          })
        ),
        !isOpen && size > max ? _react2['default'].createElement(
          'button',
          { className: 'ola-answer-link-more', onClick: this.toggle },
          isOpen ? translate('answers_show_less') : translate('answers_show_more')
        ) : null
      );
    }
  }]);

  return AnswerPersonInfoDetail;
}(_react2['default'].Component);

AnswerPersonInfoDetail.defaultProps = {
  max: 6
};


module.exports = (0, _OlaTranslate2['default'])(AnswerPersonInfoDetail);
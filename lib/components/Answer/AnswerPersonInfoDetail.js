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

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = _interopRequireDefault(_ListKeyValue);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerPersonInfoDetail = function (_React$Component) {
  (0, _inherits3['default'])(AnswerPersonInfoDetail, _React$Component);

  function AnswerPersonInfoDetail(props) {
    (0, _classCallCheck3['default'])(this, AnswerPersonInfoDetail);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (AnswerPersonInfoDetail.__proto__ || (0, _getPrototypeOf2['default'])(AnswerPersonInfoDetail)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass3['default'])(AnswerPersonInfoDetail, [{
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
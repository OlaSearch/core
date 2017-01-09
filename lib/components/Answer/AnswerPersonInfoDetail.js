'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = require('../../../.babelhelper.js').interopRequireDefault(_ListKeyValue);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var AnswerPersonInfoDetail = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AnswerPersonInfoDetail, _React$Component);

  function AnswerPersonInfoDetail(props) {
    require('../../../.babelhelper.js').classCallCheck(this, AnswerPersonInfoDetail);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (AnswerPersonInfoDetail.__proto__ || Object.getPrototypeOf(AnswerPersonInfoDetail)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(AnswerPersonInfoDetail, [{
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
        data.slice(0, isOpen ? undefined : max).map(function (item, idx) {
          var title = item.title,
              subtitle = item.subtitle,
              description = item.description,
              additionalData = item.additional_data;

          return _react2['default'].createElement(
            'div',
            { className: 'ola-answer-item', key: idx },
            _react2['default'].createElement(
              'h3',
              { className: 'ola-answer-title' },
              title
            ),
            _react2['default'].createElement(
              'div',
              { className: 'ola-answer-subtitle' },
              subtitle || description
            ),
            _react2['default'].createElement(_ListKeyValue2['default'], { data: additionalData })
          );
        }),
        !isOpen && size > max ? _react2['default'].createElement(
          'button',
          { className: 'ola-answer-link-more', onClick: this.toggle },
          translate('answers_show_more')
        ) : null
      );
    }
  }]);

  return AnswerPersonInfoDetail;
}(_react2['default'].Component);

AnswerPersonInfoDetail.defaultProps = {
  max: 5
};


module.exports = (0, _OlaTranslate2['default'])(AnswerPersonInfoDetail);
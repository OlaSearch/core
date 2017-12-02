'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = _interopRequireDefault(_ListKeyValue);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaToggle = require('./../../decorators/OlaToggle');

var _OlaToggle2 = _interopRequireDefault(_OlaToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AnswerPersonInfoDetail(_ref) {
  var isCollapsed = _ref.isCollapsed,
      toggleDispay = _ref.toggleDispay,
      data = _ref.data,
      max = _ref.max,
      translate = _ref.translate;
  var caption = data.caption;

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
      data.slice(0, isCollapsed ? undefined : max).map(function (item, idx) {
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
    !isCollapsed && size > max ? _react2['default'].createElement(
      'button',
      { className: 'ola-answer-link-more', onClick: toggleDispay },
      isCollapsed ? translate('answers_show_less') : translate('answers_show_more')
    ) : null
  );
}

AnswerPersonInfoDetail.defaultProps = {
  max: 6
};

module.exports = (0, _OlaTranslate2['default'])((0, _OlaToggle2['default'])(AnswerPersonInfoDetail));
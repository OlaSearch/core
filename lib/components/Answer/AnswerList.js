'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withToggle = require('./../../decorators/withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

var _AnswerField = require('./AnswerField');

var _AnswerField2 = _interopRequireDefault(_AnswerField);

var _AnswerButton = require('./AnswerButton');

var _AnswerButton2 = _interopRequireDefault(_AnswerButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AnswerList(props) {
  var isCollapsed = props.isCollapsed,
      toggleDisplay = props.toggleDisplay,
      data = props.data,
      max = props.max,
      translate = props.translate;
  var elements = data.elements;

  var size = elements.length;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-list-info-detail' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-answer-list-items' },
      elements.slice(0, isCollapsed ? undefined : max).map(function (item, idx) {
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
              fields.map(function (field, idx) {
                var klass = (0, _classnames2['default'])('ola-answer-row', 'ola-answer-row-' + field.label);
                return _react2['default'].createElement(_AnswerField2['default'], (0, _extends3['default'])({ className: klass }, field, { key: idx }));
              })
            ),
            buttons.map(function (button, idx) {
              return _react2['default'].createElement(_AnswerButton2['default'], (0, _extends3['default'])({}, button, { key: idx }));
            })
          )
        );
      })
    ),
    size > max ? _react2['default'].createElement(
      'button',
      { className: 'ola-answer-link-more', onClick: toggleDisplay },
      isCollapsed ? translate('answers_show_less') : translate('answers_show_more')
    ) : null
  );
}

AnswerList.defaultProps = {
  max: 3
};

module.exports = (0, _withTranslate2['default'])((0, _withToggle2['default'])(AnswerList));
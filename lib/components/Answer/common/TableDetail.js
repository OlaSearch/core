'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTranslate = require('./../../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withToggle = require('./../../../decorators/withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function TableDetail(props) {
  var isCollapsed = props.isCollapsed,
      toggleDisplay = props.toggleDisplay,
      _props$data = props.data,
      record_data = _props$data.record_data,
      record_keys = _props$data.record_keys,
      caption = _props$data.caption,
      footnote = _props$data.footnote,
      max = props.max,
      translate = props.translate;

  var size = record_data.length;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-table-detail' },
    caption && _react2['default'].createElement(
      'h4',
      { className: 'ola-answer-table-caption' },
      caption
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-answer-table-wrapper' },
      _react2['default'].createElement(
        'table',
        { className: 'ola-answer-table' },
        _react2['default'].createElement(
          'thead',
          null,
          _react2['default'].createElement(
            'tr',
            null,
            record_keys.map(function (key, idx) {
              return _react2['default'].createElement(
                'th',
                { key: idx },
                key
              );
            })
          )
        ),
        _react2['default'].createElement(
          'tbody',
          null,
          record_data.slice(0, isCollapsed ? undefined : max).map(function (row, idx) {
            return _react2['default'].createElement(
              'tr',
              { key: idx },
              record_keys.map(function (key, idx) {
                return _react2['default'].createElement(
                  'td',
                  { key: idx },
                  _react2['default'].createElement('div', {
                    dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(row[key])
                  })
                );
              })
            );
          })
        )
      )
    ),
    footnote ? _react2['default'].createElement('div', {
      className: 'ola-answer-footnote',
      dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(footnote)
    }) : null,
    size > max ? _react2['default'].createElement(
      'button',
      { className: 'ola-answer-link-more', onClick: toggleDisplay },
      isCollapsed ? translate('answers_show_less') : translate('answers_show_more')
    ) : null
  );
}

TableDetail.defaultProps = {
  max: 5
};

module.exports = (0, _withTranslate2['default'])((0, _withToggle2['default'])(TableDetail));
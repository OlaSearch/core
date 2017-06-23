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

var _OlaTranslate = require('./../../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableDetail = function (_React$Component) {
  (0, _inherits3['default'])(TableDetail, _React$Component);

  function TableDetail(props) {
    (0, _classCallCheck3['default'])(this, TableDetail);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (TableDetail.__proto__ || (0, _getPrototypeOf2['default'])(TableDetail)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass3['default'])(TableDetail, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$data = _props.data,
          record_data = _props$data.record_data,
          record_keys = _props$data.record_keys,
          caption = _props$data.caption,
          footnote = _props$data.footnote,
          max = _props.max,
          translate = _props.translate;
      var isOpen = this.state.isOpen;

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
              record_data.slice(0, isOpen ? undefined : max).map(function (row, idx) {
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
          { className: 'ola-answer-link-more', onClick: this.toggle },
          isOpen ? translate('answers_show_less') : translate('answers_show_more')
        ) : null
      );
    }
  }]);
  return TableDetail;
}(_react2['default'].Component);

TableDetail.defaultProps = {
  max: 5
};


module.exports = (0, _OlaTranslate2['default'])(TableDetail);
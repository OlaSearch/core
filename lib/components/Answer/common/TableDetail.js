'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var TableDetail = function (_React$Component) {
  _inherits(TableDetail, _React$Component);

  function TableDetail(props) {
    _classCallCheck(this, TableDetail);

    var _this = _possibleConstructorReturn(this, (TableDetail.__proto__ || Object.getPrototypeOf(TableDetail)).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(TableDetail, [{
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
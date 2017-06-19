'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HighlightedField = require('./HighlightedField');

var _HighlightedField2 = _interopRequireDefault(_HighlightedField);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var DocumentPages = function (_React$Component) {
  _inherits(DocumentPages, _React$Component);

  function DocumentPages(props) {
    _classCallCheck(this, DocumentPages);

    var _this = _possibleConstructorReturn(this, (DocumentPages.__proto__ || Object.getPrototypeOf(DocumentPages)).call(this, props));

    _this.toggle = function () {
      _this.setState({
        isVisible: !_this.state.isVisible
      }, function () {
        if (_this.state.isVisible) {
          _this.props.log({
            eventType: 'C',
            result: _this.props.result,
            eventCategory: _this.props.translate('doc_view_pages'),
            eventLabel: 'Pages',
            eventAction: 'click',
            snippetId: _this.props.snippetId
          });
        }
      });
    };

    _this.onSelect = function (page) {
      _this.props.onClick && _this.props.onClick(page, _this.props.result);
      _this.props.log({
        eventType: 'C',
        result: _this.props.result,
        eventCategory: 'Page number',
        eventValue: page.pageNumber,
        eventLabel: 'Pages',
        eventAction: 'click',
        snippetId: _this.props.snippetId
      });
    };

    _this.state = {
      isVisible: false
    };
    return _this;
  }

  _createClass(DocumentPages, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          pages = _props.pages,
          q = _props.q,
          contentField = _props.contentField,
          translate = _props.translate;
      var isVisible = this.state.isVisible;


      if (!pages.length) return null;

      if (!isVisible) {
        return _react2['default'].createElement(
          'div',
          { className: 'ola-field-pages' },
          _react2['default'].createElement(
            'a',
            { className: 'ola-link-view-pages', onClick: this.toggle },
            translate('doc_view_pages')
          )
        );
      }
      return _react2['default'].createElement(
        'div',
        { className: 'ola-field-pages' },
        _react2['default'].createElement(
          'a',
          { className: 'ola-link-view-pages ola-link-view-pages-hide', onClick: this.toggle },
          translate('doc_hide_pages')
        ),
        pages.map(function (page, idx) {
          return _react2['default'].createElement(PageDetail, {
            onSelectPage: _this2.onSelect,
            page: page,
            contentField: contentField,
            key: idx,
            q: q
          });
        })
      );
    }
  }]);

  return DocumentPages;
}(_react2['default'].Component);

/**
 * Default props
 */


DocumentPages.defaultProps = {
  contentField: 'pageContent',
  pages: []

  /**
   * Page detail
   */
};var PageDetail = function PageDetail(_ref) {
  var page = _ref.page,
      contentField = _ref.contentField,
      onSelectPage = _ref.onSelectPage;

  function handleSelect(event) {
    onSelectPage(page);
  }
  var pageNumber = page.pageNumber;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet-page' },
    _react2['default'].createElement(
      'a',
      {
        onClick: handleSelect,
        className: 'ola-page-number'
      },
      _react2['default'].createElement(
        'span',
        null,
        'p. ',
        pageNumber
      )
    ),
    _react2['default'].createElement(_HighlightedField2['default'], { field: contentField, result: page })
  );
};

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(DocumentPages));
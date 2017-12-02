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

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DocumentPages = function (_React$Component) {
  (0, _inherits3['default'])(DocumentPages, _React$Component);

  function DocumentPages(props) {
    (0, _classCallCheck3['default'])(this, DocumentPages);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (DocumentPages.__proto__ || (0, _getPrototypeOf2['default'])(DocumentPages)).call(this, props));

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

  (0, _createClass3['default'])(DocumentPages, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          pages = _props.pages,
          q = _props.q,
          contentField = _props.contentField,
          translate = _props.translate,
          fieldLabel = _props.fieldLabel,
          showIfEmpty = _props.showIfEmpty;
      var isVisible = this.state.isVisible;


      if (!pages.length && !showIfEmpty) return null;

      var label = _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel });
      var klass = (0, _classnames2['default'])('ola-link-view-pages', {
        'ola-link-view-pages-hide': isVisible
      });
      return _react2['default'].createElement(
        'div',
        { className: 'ola-field ola-field-pages' },
        label,
        _react2['default'].createElement(
          'a',
          {
            className: klass,
            onClick: this.toggle
          },
          isVisible ? translate('doc_hide_pages') : translate('doc_view_pages')
        ),
        isVisible ? pages.map(function (page, idx) {
          return _react2['default'].createElement(PageDetail, {
            onSelectPage: _this2.onSelect,
            page: page,
            contentField: contentField,
            key: idx,
            q: q
          });
        }) : null
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
  pages: [],
  showIfEmpty: false

  /**
   * Page detail
   */
};function PageDetail(_ref) {
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
      { onClick: handleSelect, className: 'ola-page-number' },
      _react2['default'].createElement(
        'span',
        null,
        'p. ',
        pageNumber
      )
    ),
    _react2['default'].createElement(_TextField2['default'], { field: contentField, result: page })
  );
}

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(DocumentPages));
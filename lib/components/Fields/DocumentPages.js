'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _HighlightedField = require('./HighlightedField');

var _HighlightedField2 = require('../../../.babelhelper.js').interopRequireDefault(_HighlightedField);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var DocumentPages = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(DocumentPages, _React$Component);

  function DocumentPages(props) {
    require('../../../.babelhelper.js').classCallCheck(this, DocumentPages);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(DocumentPages).call(this, props));

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

  require('../../../.babelhelper.js').createClass(DocumentPages, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var pages = _props.pages;
      var q = _props.q;
      var contentField = _props.contentField;
      var translate = _props.translate;
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
};

/**
 * Page detail
 */

var PageDetail = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(PageDetail, _React$Component2);

  function PageDetail() {
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, PageDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PageDetail)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.onSelectPage = function () {
      _this3.props.onSelectPage(_this3.props.page);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret);
  }

  require('../../../.babelhelper.js').createClass(PageDetail, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var page = _props2.page;
      var contentField = _props2.contentField;
      var pageNumber = page.pageNumber;


      return _react2['default'].createElement(
        'div',
        { className: 'ola-snippet-page' },
        _react2['default'].createElement(
          'a',
          {
            onClick: this.onSelectPage,
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
    }
  }]);

  return PageDetail;
}(_react2['default'].Component);

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(DocumentPages));
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaToggle = require('./../../decorators/OlaToggle');

var _OlaToggle2 = _interopRequireDefault(_OlaToggle);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function DocumentPages(_ref) {
  var onClick = _ref.onClick,
      result = _ref.result,
      snippetId = _ref.snippetId,
      log = _ref.log,
      pages = _ref.pages,
      q = _ref.q,
      contentField = _ref.contentField,
      translate = _ref.translate,
      fieldLabel = _ref.fieldLabel,
      showIfEmpty = _ref.showIfEmpty,
      isCollapsed = _ref.isCollapsed,
      toggleDisplay = _ref.toggleDisplay;

  function onSelect(page) {
    onClick && onClick(page, result);
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Page number',
      eventValue: page.pageNumber,
      eventLabel: 'Pages',
      eventAction: 'click',
      snippetId: snippetId
    });
  }

  function toggle(event) {
    toggleDisplay();
    log({
      eventType: 'C',
      result: result,
      eventCategory: event.target.innerText,
      eventLabel: 'Pages',
      eventAction: 'click',
      snippetId: snippetId
    });
  }

  if (!pages.length && !showIfEmpty) return null;
  var label = _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel });
  var klass = (0, _classnames2['default'])('ola-link-view-pages', {
    'ola-link-view-pages-hide': isCollapsed
  });
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-pages' },
    label,
    _react2['default'].createElement(
      'a',
      { className: klass, onClick: toggle },
      isCollapsed ? translate('doc_hide_pages') : translate('doc_view_pages')
    ),
    isCollapsed ? pages.map(function (page, idx) {
      return _react2['default'].createElement(PageDetail, {
        onSelectPage: onSelect,
        page: page,
        contentField: contentField,
        key: idx,
        q: q
      });
    }) : null
  );
}

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
};function PageDetail(_ref2) {
  var page = _ref2.page,
      contentField = _ref2.contentField,
      onSelectPage = _ref2.onSelectPage;

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

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])((0, _OlaToggle2['default'])(DocumentPages)));
'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Title = function Title(_ref) {
  var result = _ref.result,
      isLink = _ref.isLink,
      field = _ref.field,
      url = _ref.url,
      children = _ref.children,
      baseUrl = _ref.baseUrl,
      target = _ref.target,
      isBookmark = _ref.isBookmark,
      isAutosuggest = _ref.isAutosuggest,
      iconLeft = _ref.iconLeft,
      iconRight = _ref.iconRight,
      log = _ref.log,
      snippetId = _ref.snippetId,
      onClick = _ref.onClick,
      fieldLabel = _ref.fieldLabel,
      openInNewWindow = _ref.openInNewWindow;

  function logClick(event) {
    /* Send Log */
    var eventLabel = isBookmark ? 'Bookmarks' : isAutosuggest ? 'autosuggest' : null;
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Title',
      eventAction: 'click',
      eventLabel: eventLabel,
      snippetId: snippetId
    });

    if (onClick) onClick(event);
  }

  var highlighting = result.highlighting;

  var title = result[field || 'title'];

  if (!url) url = result.url || url;
  if (baseUrl) url = baseUrl + url;

  /* Check for highlighting */
  if (highlighting) {
    var highlightedTitle = highlighting.title;

    if ((typeof highlightedTitle === 'undefined' ? 'undefined' : (0, _typeof3['default'])(highlightedTitle)) === 'object') title = highlightedTitle[0];
  }
  /* Check if it should be opened in new page */
  if (openInNewWindow) {
    target = '_blank';
  }

  return _react2['default'].createElement(
    'h3',
    { className: 'ola-field ola-field-title' },
    iconLeft,
    isLink ? _react2['default'].createElement('a', { href: url, target: target, onClick: logClick, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }) : _react2['default'].createElement('span', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }),
    children,
    iconRight
  );
};

Title.defaultProps = {
  isLink: true,
  iconLeft: null,
  iconRight: null,
  isBookmark: false,
  field: null,
  target: null,
  openInNewWindow: false
};

module.exports = (0, _OlaLogger2['default'])(Title);
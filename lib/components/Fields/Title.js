'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var Title = function Title(_ref) {
  var result = _ref.result;
  var isLink = _ref.isLink;
  var field = _ref.field;
  var url = _ref.url;
  var children = _ref.children;
  var baseUrl = _ref.baseUrl;
  var target = _ref.target;
  var isBookmark = _ref.isBookmark;
  var isAutosuggest = _ref.isAutosuggest;
  var iconLeft = _ref.iconLeft;
  var iconRight = _ref.iconRight;
  var log = _ref.log;
  var snippetId = _ref.snippetId;
  var onClick = _ref.onClick;

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

    if ((typeof highlightedTitle === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](highlightedTitle)) === 'object') title = highlightedTitle[0];
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
  target: null
};

module.exports = (0, _OlaLogger2['default'])(Title);
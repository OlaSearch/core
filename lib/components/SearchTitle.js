'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _GeoNotify = require('./Geo/GeoNotify');

var _GeoNotify2 = _interopRequireDefault(_GeoNotify);

var _OlaThemeContext = require('./../containers/OlaThemeContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref4 = _react2['default'].createElement(_GeoNotify2['default'], null);

function SearchTitle(_ref, context) {
  var totalResults = _ref.totalResults,
      page = _ref.page,
      perPage = _ref.perPage,
      isPhone = _ref.isPhone,
      translate = _ref.translate;

  var title = translate('title');
  var showTitle = title || totalResults > 0;
  if (!showTitle) return null;
  var currentIdx = Math.min((page - 1) * perPage + 1, totalResults);
  var lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1);

  if (context.config.infiniteScroll || isPhone) currentIdx = 1;

  var values = {
    current: currentIdx,
    next: lastIdx,
    total: totalResults
  };
  var titleDesc = totalResults ? translate('showing', values) : translate('showing_no_results', values);

  var _ref2 = _react2['default'].createElement(
    'span',
    { className: 'ola-search-heading-title' },
    title
  );

  var _ref3 = _react2['default'].createElement(
    'small',
    { className: 'ola-search-heading-number' },
    titleDesc
  );

  return _react2['default'].createElement(
    _OlaThemeContext.ThemeConsumer,
    null,
    function (theme) {
      return _react2['default'].createElement(
        'div',
        { className: 'ola-search-heading-container' },
        _react2['default'].createElement(
          'div',
          { className: 'ola-search-heading' },
          title && _ref2,
          totalResults ? _ref3 : null
        ),
        _ref4
      );
    }
  );
}

SearchTitle.contextTypes = {
  config: _propTypes2['default'].object
};

module.exports = (0, _withTranslate2['default'])(SearchTitle);
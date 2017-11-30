'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function NoResults(_ref) {
  var totalResults = _ref.totalResults,
      isLoading = _ref.isLoading,
      q = _ref.q,
      translate = _ref.translate,
      suggestedTerm = _ref.suggestedTerm,
      facets = _ref.facets,
      dispatch = _ref.dispatch;

  /*
    Removed `q` (23/6/17 - Vinay)
    q can be empty when filters are used
    (!q && !facets.length)
   */
  if (totalResults || isLoading) return null;
  if (!q && !facets.length) return null;
  /**
   * Show help suggestion if:
   * totalResults = 0
   * suggestedTerm is present
   * facets have been applied
   */
  function removeFilters() {
    dispatch((0, _Search.removeAllFacets)());
    dispatch((0, _Search.executeSearch)());
  }
  var message = void 0;
  if (totalResults === 0 && suggestedTerm && facets.length > 0) {
    message = _react2['default'].createElement(
      'div',
      null,
      translate('no_results_found_filters_too_restrictive', { q: q }, true, {
        tagName: 'span'
      }),
      _react2['default'].createElement(
        'button',
        {
          className: 'ola-reset-filters',
          type: 'button',
          onClick: removeFilters
        },
        'Remove filters'
      )
    );
  } else {
    if (!q && facets.length) {
      message = _react2['default'].createElement(
        'div',
        null,
        translate('no_results_found_filters_only', null, true, {
          tagName: 'span'
        }),
        _react2['default'].createElement(
          'button',
          {
            className: 'ola-reset-filters',
            type: 'button',
            onClick: removeFilters
          },
          'Remove filters'
        )
      );
    } else message = translate('no_results_found', { q: q }, true);
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-noresults' },
    message
  );
}

NoResults.defaultProps = {
  facets: []
};

module.exports = (0, _OlaTranslate2['default'])(NoResults);
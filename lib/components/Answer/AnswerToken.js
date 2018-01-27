'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AnswerToken(_ref, _ref2) {
  var answer = _ref.answer,
      addFacet = _ref.addFacet,
      totalResults = _ref.totalResults,
      executeSearch = _ref.executeSearch,
      facets = _ref.facets,
      facetQuery = _ref.facetQuery,
      translate = _ref.translate;
  var config = _ref2.config;

  if (!answer || !answer.search || !answer.search.slots || !totalResults) {
    return null;
  }
  /* Remove slots that have been already added */
  var slots = answer.search.slots.filter(function (_ref3) {
    var name = _ref3.name,
        value = _ref3.value;

    return !facetQuery.some(function (_ref4) {
      var _name = _ref4.name,
          selected = _ref4.selected;
      return _name === name && selected.indexOf(value) !== -1;
    });
  });

  slots = slots.filter(function (_ref5) {
    var name = _ref5.name,
        value = _ref5.value;

    var facet = facets.filter(function (_ref6) {
      var _name = _ref6.name;
      return _name === name;
    });
    if (!facet.length) return false;
    facet = facet.reduce(function (a, _) {
      return a;
    });
    /* Check if value exists */
    return facet.values.some(function (item) {
      return item.name === value;
    });
  });

  /* If no slots hide */
  if (!slots.length) return null;
  function handleAddToken(name, value) {
    var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(config.facets);
    addFacet(facet, value);
    executeSearch();
  }

  /**
   * 1. Check if facet exists
   * 2. Check if value exists in the facet
   */
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-slots' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-answer-slots-text' },
      translate('filter_suggestions')
    ),
    slots.map(function (_ref7, idx) {
      var name = _ref7.name,
          value = _ref7.value;

      var facet = facets.filter(function (_ref8) {
        var _name = _ref8.name;
        return _name === name;
      }).reduce(function (a, _) {
        return a;
      });

      var displayName = facet ? facet.displayName : name;
      return _react2['default'].createElement(AnswerTokenBtn, {
        key: idx + '_' + name,
        name: name,
        value: value,
        handleAddToken: handleAddToken,
        displayName: displayName
      });
    })
  );
}

AnswerToken.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

function AnswerTokenBtn(_ref9) {
  var name = _ref9.name,
      value = _ref9.value,
      displayName = _ref9.displayName,
      handleAddToken = _ref9.handleAddToken;

  function handleAdd() {
    handleAddToken(name, value);
  }
  return _react2['default'].createElement(
    'button',
    { className: 'ola-btn ola-btn-slot-add', onClick: handleAdd },
    displayName,
    ': ',
    value
  );
}

AnswerToken.defaultProps = {
  answer: null
};

function mapStateToProps(state) {
  return {
    answer: state.AppState.answer,
    facets: state.AppState.facets,
    facetQuery: state.QueryState.facet_query,
    totalResults: state.AppState.totalResults
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { addFacet: _Search.addFacet, executeSearch: _Search.executeSearch })((0, _withTranslate2['default'])(AnswerToken));
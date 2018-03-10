'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _style = require('@olasearch/styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

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

var _plus = require('@olasearch/icons/lib/plus');

var _plus2 = _interopRequireDefault(_plus);

var _Settings = require('./../../constants/Settings');

var _utilities = require('./../../utilities');

var _withTheme = require('./../../decorators/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AnswerToken(_ref) {
  var answer = _ref.answer,
      addFacet = _ref.addFacet,
      removeSkipFacetFields = _ref.removeSkipFacetFields,
      totalResults = _ref.totalResults,
      executeSearch = _ref.executeSearch,
      facetQuery = _ref.facetQuery,
      facets = _ref.facets,
      translate = _ref.translate,
      theme = _ref.theme,
      config = _ref.config;

  if (!answer || !answer.search || !answer.search.slots || !totalResults) {
    return null;
  }
  /* 1. Remove slots that have been already added */

  var slots = answer.search.slots.filter(function (_ref2) {
    var suggest = _ref2.suggest;
    return suggest;
  }).filter(function (_ref3) {
    var name = _ref3.name,
        value = _ref3.value;

    /**
     * Todo. Compare values also
     */
    return !facetQuery.some(function (_ref4) {
      var _name = _ref4.name,
          selected = _ref4.selected;
      return _name === name;
    });
  });

  /* 2. Remove slots that doesnt have any results */
  slots = slots.filter(function (_ref5) {
    var name = _ref5.name,
        value = _ref5.value;

    /* 2.1 Check if facet exists */
    var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(facets);
    /* Facet exists */
    if (facet) {
      /* 2.2 Check if value exists */
      return facet.values.some(function (_ref6) {
        var name = _ref6.name;
        return value.indexOf(name) !== -1;
      });
    }
    return true;
  });

  /* If no slots hide */
  if (!slots.length) return null;

  var fieldLabels = config.fieldLabels;


  function handleAddToken(slot) {
    var name = slot.name,
        value = slot.value,
        type = slot.type,
        facet_query = slot.facet_query;

    var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(config.facets);
    if (!facet) {
      facet = (0, _Settings.CREATE_FILTER_OBJECT)({
        name: name,
        displayName: fieldLabels[name],
        type: type === _Settings.SLOT_DATE ? 'daterange' : 'string'
      });
    }
    /* Take the first value only */
    addFacet((0, _extends3['default'])({}, facet, { fromIntentEngine: !!facet_query }), value[0]);
    /* Remove the field from skip_facet_fields */
    removeSkipFacetFields(facet.name);
    /* Search */
    executeSearch();
  }

  /**
   * 1. Check if facet exists
   * 2. Check if value exists in the facet
   */
  return _react2['default'].createElement(
    'div',
    {
      className: _style2['default'].dynamic([['2558933772', [theme.primaryColor, theme.primaryInvertColor]]]) + ' ' + 'ola-answer-slots'
    },
    _react2['default'].createElement(
      'span',
      {
        className: _style2['default'].dynamic([['2558933772', [theme.primaryColor, theme.primaryInvertColor]]]) + ' ' + 'ola-answer-slots-text'
      },
      translate('filter_suggestions')
    ),
    slots.map(function (slot, idx) {
      var facet = config.facets.filter(function (_ref7) {
        var _name = _ref7.name;
        return _name === slot.name;
      });
      var displayName = facet && facet.length ? facet[0].displayName : fieldLabels[slot.name];
      return _react2['default'].createElement(AnswerTokenBtn, {
        key: idx + '_' + name,
        slot: slot,
        handleAddToken: handleAddToken,
        displayName: displayName
      });
    }),
    _react2['default'].createElement(_style2['default'], {
      styleId: '2558933772',
      css: '.ola-answer-slots.__jsx-style-dynamic-selector .ola-btn{background:' + theme.primaryColor + ';color:' + theme.primaryInvertColor + ';vertical-align:middle;}',
      dynamic: [theme.primaryColor, theme.primaryInvertColor]
    })
  );
}

var _ref9 = _react2['default'].createElement(_plus2['default'], { size: 16 });

function AnswerTokenBtn(_ref8) {
  var slot = _ref8.slot,
      displayName = _ref8.displayName,
      handleAddToken = _ref8.handleAddToken;

  function handleAdd() {
    handleAddToken(slot);
  }
  var type = slot.type,
      value = slot.value,
      match = slot.match;

  return _react2['default'].createElement(
    'button',
    { className: 'ola-btn ola-btn-slot-add', onClick: handleAdd },
    displayName,
    ':',
    ' ',
    value && type !== _Settings.SLOT_DATE ? (0, _utilities.getDisplayName)(null, value[0]) : match,
    _ref9
  );
}

AnswerToken.defaultProps = {
  answer: null
};

function mapStateToProps(state) {
  return {
    answer: state.AppState.answer,
    facetQuery: state.QueryState.facet_query,
    facets: state.AppState.facets,
    totalResults: state.AppState.totalResults
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, {
  addFacet: _Search.addFacet,
  executeSearch: _Search.executeSearch,
  removeSkipFacetFields: _Search.removeSkipFacetFields
})((0, _withConfig2['default'])((0, _withTranslate2['default'])((0, _withTheme2['default'])(AnswerToken))));
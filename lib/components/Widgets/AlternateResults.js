'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AlternateResults = function (_React$Component) {
  (0, _inherits3['default'])(AlternateResults, _React$Component);

  function AlternateResults(props) {
    (0, _classCallCheck3['default'])(this, AlternateResults);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.state = {
      response: {},
      facetQuery: props.facetQuery
    };
    return _this;
  }

  AlternateResults.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var facetQuery = this.props.facetQuery;


    if (!this.props.isLoading && this.props.totalResults === 0 && this.props.facetQuery.length > 1 && typeof this.state.response.totalResults === 'undefined' /* Only search once */
    ) {
        var lastFacet = facetQuery[facetQuery.length - 1]['name'];
        this.props.executeSearch({
          extraParams: {
            facet_query: [],
            skip_facet_fields: [lastFacet]
          }
        }, {
          shouldDispatchActions: false
        }).then(function (response) {
          _this2.setState({
            response: response
          });
        });
      }
  };

  AlternateResults.prototype.render = function render() {
    var _props = this.props,
        totalResults = _props.totalResults,
        facetQuery = _props.facetQuery;
    var response = this.state.response;
    var results = response.results,
        newTotalResults = response.totalResults;

    if (!newTotalResults || this.props.facetQuery.length <= 1) return null;
    var lastFacet = facetQuery[facetQuery.length - 1]['name'];
    var fieldLabels = this.props.config.fieldLabels;
    /**
     * Steps
     * 1. Check if query returned zero results
     * 2. Skip 1 filter at a time
     */

    return _react2['default'].createElement(
      'div',
      { className: 'ola-alternate-results' },
      _react2['default'].createElement(
        'p',
        null,
        'But, we found ',
        newTotalResults,
        ' results if we remove',
        ' ',
        _react2['default'].createElement(
          'span',
          null,
          fieldLabels[lastFacet]
        ),
        ' filter.'
      ),
      _react2['default'].createElement(_SearchResults2['default'], { results: results })
    );
  };

  return AlternateResults;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    totalResults: state.AppState.totalResults,
    isLoading: state.AppState.isLoading,
    facetQuery: state.QueryState.facet_query
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, { executeSearch: _Search.executeSearch })((0, _withConfig2['default'])(AlternateResults));
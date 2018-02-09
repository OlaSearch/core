'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Title = require('./../Fields/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Url = require('./../Fields/Url');

var _Url2 = _interopRequireDefault(_Url);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

var _utilities = require('./../../utilities');

var _OlaThemeContext = require('./../../containers/OlaThemeContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerMC = function (_React$Component) {
  (0, _inherits3['default'])(AnswerMC, _React$Component);

  function AnswerMC() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, AnswerMC);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createRegex = function (term) {
      var arr = term.split(/\s/gi);
      var o = [];
      for (var i = 0; i < arr.length; i++) {
        o.push(arr[i]);
        if (arr[i].length < 2) o.push('\\s');else o.push('.*?');
      }
      return o.join('');
    }, _this.getSnippet = function (answer) {
      var snippet = answer.snippet,
          highlight = answer.highlight,
          highlightConfidence = answer.highlight_confidence;

      if (highlightConfidence < _this.props.highlightConfidenceThreshold) {
        return (0, _utilities.createHTMLMarkup)(snippet);
      }
      var html = snippet.replace(new RegExp('(' + _this.createRegex(highlight) + ')', 'gi'), '<strong>$1</strong>');
      return (0, _utilities.createHTMLMarkup)(html);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  AnswerMC.prototype.componentDidMount = function componentDidMount() {
    this.fetch();
  };

  AnswerMC.prototype.fetch = function fetch() {
    var _props = this.props,
        mc = _props.mc,
        payload = _props.payload;
    var key = mc.key;

    if (key) this.props.fetchMc(key, payload);
  };

  AnswerMC.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.mc.key !== this.props.mc.key) {
      this.fetch();
    }
  };

  AnswerMC.prototype.render = function render() {
    var _this2 = this;

    if (this.props.isLoadingMc && this.props.loader) {
      return this.props.loader;
    }
    var _props2 = this.props,
        mc = _props2.mc,
        facetQuery = _props2.facetQuery;
    var _context$config$mcThr = this.context.config.mcThreshold,
        mcThreshold = _context$config$mcThr === undefined ? 0.4 : _context$config$mcThr;
    /* Always parse threshold */

    mcThreshold = parseFloat(mcThreshold);
    var answer = mc.answer;

    if (!answer || facetQuery.length > 0) {
      return null;
    }
    var snippet = answer.snippet,
        url = answer.url,
        title = answer.title,
        confidence = answer.snippet_confidence;
    /* Do not show answers that are of low confidence */

    if (confidence < mcThreshold) return null;

    var _ref = _react2['default'].createElement(_Title2['default'], { result: answer });

    var _ref2 = _react2['default'].createElement(_Url2['default'], { result: answer });

    return _react2['default'].createElement(
      _OlaThemeContext.ThemeConsumer,
      null,
      function (theme) {
        return _react2['default'].createElement(
          'div',
          {
            className: _style2['default'].dynamic([['1220930506', [theme.primaryColor, theme.searchLinkColor, theme.searchLinkHoverColor]]]) + ' ' + 'ola-snippet ola-snippet-mc'
          },
          _react2['default'].createElement(
            'div',
            {
              className: _style2['default'].dynamic([['1220930506', [theme.primaryColor, theme.searchLinkColor, theme.searchLinkHoverColor]]]) + ' ' + 'ola-snippet-inner'
            },
            _react2['default'].createElement('p', {
              dangerouslySetInnerHTML: _this2.getSnippet(answer),
              className: _style2['default'].dynamic([['1220930506', [theme.primaryColor, theme.searchLinkColor, theme.searchLinkHoverColor]]]) + ' ' + 'ola-snippet-text'
            }),
            _ref,
            _ref2
          ),
          _react2['default'].createElement(_style2['default'], {
            styleId: '1220930506',
            css: '.ola-snippet-inner.__jsx-style-dynamic-selector{border:1px ' + theme.primaryColor + ' solid;}.ola-snippet.__jsx-style-dynamic-selector .ola-field-title a{color:' + theme.searchLinkColor + ';}.ola-snippet.__jsx-style-dynamic-selector .ola-field-title a:hover,.ola-field-title a:focus{color:' + theme.searchLinkHoverColor + ';}',
            dynamic: [theme.primaryColor, theme.searchLinkColor, theme.searchLinkHoverColor]
          })
        );
      }
    );
  };

  return AnswerMC;
}(_react2['default'].Component);

AnswerMC.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};
AnswerMC.defaultProps = {
  mc: {},
  payload: {},
  loader: null,
  highlightConfidenceThreshold: 0.2
};


function mapStateToProps(state) {
  return {
    isLoadingMc: state.AppState.isLoadingMc,
    // isLoading: state.AppState.isLoading,
    facetQuery: state.QueryState.facet_query
    /* If its a spelling mistake: Show the answer */
    // suggestedTerm: state.AppState.suggestedTerm
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { fetchMc: _Search.fetchMc })(AnswerMC);
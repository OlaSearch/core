'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _HighlightedField = require('./HighlightedField');

var _HighlightedField2 = require('../../../.babelhelper.js').interopRequireDefault(_HighlightedField);

var DocumentPages = function DocumentPages(_ref) {
  var pages = _ref.pages;
  var q = _ref.q;
  var onSelectPage = _ref.onSelectPage;

  return _react2['default'].createElement(
    'div',
    null,
    pages.map(function (page, idx) {
      return _react2['default'].createElement(PageDetail, { onSelectPage: onSelectPage, page: page, key: idx });
    })
  );
};

var PageDetail = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(PageDetail, _React$Component);

  function PageDetail() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, PageDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PageDetail)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onSelectPage = function () {
      _this.props.onSelectPage(_this.props.page);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(PageDetail, [{
    key: 'render',
    value: function render() {
      var page = this.props.page;
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
        _react2['default'].createElement(_HighlightedField2['default'], { field: 'pageContent', result: page })
      );
    }
  }]);

  return PageDetail;
}(_react2['default'].Component);

module.exports = DocumentPages;
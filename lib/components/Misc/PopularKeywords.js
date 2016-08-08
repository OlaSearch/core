'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var PopularKeywords = function PopularKeywords(_ref, context) {
  var onClick = _ref.onClick;
  var translate = _ref.translate;
  var popularKeywords = context.config.popularKeywords;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-popular-keywords' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-popular-label' },
      translate('popular_keywords'),
      ': '
    ),
    popularKeywords.map(function (keyword, idx) {
      return _react2['default'].createElement(PopularKeywordItem, {
        keyword: keyword,
        onClick: onClick,
        key: idx
      });
    })
  );
};

PopularKeywords.contextTypes = {
  config: _react2['default'].PropTypes.object
};

/**
 * Item
 */

var PopularKeywordItem = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(PopularKeywordItem, _React$Component);

  function PopularKeywordItem() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, PopularKeywordItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PopularKeywordItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClick = function () {
      _this.props.onClick(_this.props.keyword);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(PopularKeywordItem, [{
    key: 'render',
    value: function render() {
      var keyword = this.props.keyword;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-popular-keyword' },
        _react2['default'].createElement(
          'a',
          { onClick: this.onClick },
          keyword
        )
      );
    }
  }]);

  return PopularKeywordItem;
}(_react2['default'].Component);

module.exports = (0, _OlaTranslate2['default'])(PopularKeywords);
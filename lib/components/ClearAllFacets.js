'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var ClearAllFacets = function (_React$Component) {
  require('../../.babelhelper.js').inherits(ClearAllFacets, _React$Component);

  function ClearAllFacets() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../.babelhelper.js').classCallCheck(this, ClearAllFacets);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ClearAllFacets)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function () {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.removeAllFacets)());
      dispatch((0, _Search.executeSearch)());
    }, _temp), require('../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../.babelhelper.js').createClass(ClearAllFacets, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var selected = _props.selected;
      var translate = _props.translate;

      if (!selected.length) return null;

      return _react2['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'ola-link-clear-all-filters',
          onClick: this.handleClick
        },
        translate('clear_all_filters')
      );
    }
  }]);

  return ClearAllFacets;
}(_react2['default'].Component);

module.exports = (0, _OlaTranslate2['default'])(ClearAllFacets);
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var BooleanFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(BooleanFilter, _React$Component);

  function BooleanFilter() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, BooleanFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BooleanFilter)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (event) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var facet = _this$props.facet;


      if (event.target.checked) {
        dispatch((0, _Search.replaceFacet)(facet, 'true'));
      } else dispatch((0, _Search.removeFacet)(facet, 'true'));

      dispatch((0, _Search.executeSearch)());
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(BooleanFilter, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var facet = _props.facet;
      var selected = _props.selected;
      var toggleDisplay = _props.toggleDisplay;
      var isCollapsed = _props.isCollapsed;


      if (!facet.values.length) return null;

      var displayName = facet.displayName;
      var template = facet.template;


      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });

      var isChecked = !!selected.length;

      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          displayName
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-facet-wrapper' },
          _react2['default'].createElement(
            'label',
            { className: 'ola-checkbox ola-checkbox-label' },
            _react2['default'].createElement('input', {
              type: 'checkbox',
              checked: isChecked,
              onChange: this.onChange
            }),
            template
          )
        )
      );
    }
  }]);

  return BooleanFilter;
}(_react2['default'].Component);

module.exports = (0, _OlaFacetToggle2['default'])(BooleanFilter);
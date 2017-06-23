'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = _interopRequireDefault(_OlaFacetToggle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var BooleanFilter = function (_React$Component) {
  (0, _inherits3['default'])(BooleanFilter, _React$Component);

  function BooleanFilter() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, BooleanFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = BooleanFilter.__proto__ || (0, _getPrototypeOf2['default'])(BooleanFilter)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          facet = _this$props.facet;


      if (event.target.checked) {
        dispatch((0, _Search.replaceFacet)(facet, 'true'));
      } else dispatch((0, _Search.removeFacet)(facet, 'true'));

      dispatch((0, _Search.executeSearch)());
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(BooleanFilter, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          facet = _props.facet,
          selected = _props.selected,
          toggleDisplay = _props.toggleDisplay,
          isCollapsed = _props.isCollapsed;


      if (!facet.values.length) return null;

      var displayName = facet.displayName,
          template = facet.template;


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
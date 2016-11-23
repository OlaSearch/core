'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var RatingFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(RatingFilter, _React$Component);

  function RatingFilter() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, RatingFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RatingFilter)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleFacet = function (event) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var facet = _this$props.facet;

      var min = parseInt(event.target.value, 10);
      var value = [min, min + facet.interval];

      if (event.target.checked) {
        dispatch((0, _Search.addFacet)(facet, value));
      } else {
        dispatch((0, _Search.removeFacet)(facet, value));
      }

      /* Search */
      dispatch((0, _Search.executeSearch)());
    }, _this.isSelected = function (bounds, name) {
      /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
      return bounds.indexOf(parseInt(name)) > -1;
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(RatingFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facet = _props.facet;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var values = facet.values;
      var interval = facet.interval;

      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });

      /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
      var selectedArray = (0, _utilities.parseRangeValues)(this.props.selected);
      var bounds = selectedArray.map(function (item) {
        return parseInt(item[0]);
      });

      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          facet.displayName
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-facet-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'ola-facet-list' },
            values.map(function (value, idx) {
              var stars = [];
              var normalized = Math.max(Math.ceil(parseInt(value.name) / interval), 0) + 1;
              var isActive = _this2.isSelected(bounds, value.name);
              var labelKlass = (0, _classnames2['default'])({
                'ola-checkbox ola-checkbox-label': true,
                'ola-checkbox-active': isActive
              });

              for (var i = 0; i < normalized; i++) {
                stars.push(_react2['default'].createElement('em', { key: i, className: 'ion ion-ios-star ola-rating-active' }));
              }

              return _react2['default'].createElement(
                'label',
                { key: idx, className: labelKlass },
                _react2['default'].createElement('input', {
                  type: 'checkbox',
                  value: value.name,
                  onChange: _this2.handleFacet,
                  checked: isActive
                }),
                stars,
                _react2['default'].createElement(
                  'span',
                  { className: 'ola-search-facet-count' },
                  value.count
                )
              );
            })
          )
        )
      );
    }
  }]);

  return RatingFilter;
}(_react2['default'].Component);

module.exports = (0, _OlaFacetToggle2['default'])(RatingFilter);
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = require('../../../.babelhelper.js').interopRequireDefault(_dateParser);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _ref = _react2['default'].createElement(
  'span',
  null,
  'From'
);

var _ref2 = _react2['default'].createElement(
  'span',
  null,
  'To'
);

var DateRange = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(DateRange, _React$Component);

  function DateRange(props) {
    require('../../../.babelhelper.js').classCallCheck(this, DateRange);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(DateRange).call(this, props));

    _this.onCustomChange = function () {
      var fromDate = new Date(_this.refs.fromDate.value).getTime();
      var toDate = new Date(_this.refs.toDate.value).getTime();

      var _this$props = _this.props;
      var facet = _this$props.facet;
      var dispatch = _this$props.dispatch;


      dispatch((0, _Search.replaceFacet)(facet, [fromDate, toDate]));

      dispatch((0, _Search.executeSearch)());
    };

    _this.activateCustomDateEntry = function () {
      _this.setState({
        isCustomDateActive: !_this.state.isCustomDateActive
      });
    };

    _this.onDateSelect = function (type) {
      var fromDate = void 0;
      var toDate = void 0;
      var year = void 0;
      var _this$props2 = _this.props;
      var facet = _this$props2.facet;
      var dispatch = _this$props2.dispatch;


      switch (type) {
        case 'current_year':
          year = new Date().getFullYear();
          fromDate = new Date(year, 0, 1).getTime();
          toDate = new Date(year, 11, 31).getTime();
          break;
        case 'last_year':
          year = new Date().getFullYear() - 1;
          fromDate = new Date(year, 0, 1).getTime();
          toDate = new Date(year, 11, 31).getTime();
          break;
        case 'last_3_years':
          year = new Date().getFullYear();
          fromDate = new Date(year - 2, 0, 1).getTime();
          toDate = new Date(year, 11, 31).getTime();
          break;
        case 'last_5_years':
          year = new Date().getFullYear();
          fromDate = new Date(year - 5, 0, 1).getTime();
          toDate = new Date(year, 11, 31).getTime();
          break;
      }

      dispatch((0, _Search.replaceFacet)(facet, [fromDate, toDate]));

      dispatch((0, _Search.executeSearch)());
    };

    _this.format = function (date) {
      var d = new Date(parseInt(date));

      return _dateParser2['default'].format(d, 'YYYY-MM-DD');
    };

    _this.state = {
      isCustomDateActive: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(DateRange, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facet = _props.facet;
      var selected = _props.selected;
      var dateLabels = _props.dateLabels;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var isCustomDateActive = this.state.isCustomDateActive;

      var _selected = require('../../../.babelhelper.js').slicedToArray(selected, 2);

      var from = _selected[0];
      var to = _selected[1];
      var values = facet.values;

      var dates = values.map(function (value) {
        return value.name;
      });
      var min = Math.min.apply(this, dates);
      var max = Math.max.apply(this, dates);

      var defaultFrom = from || min;
      var defaultTo = to || max;

      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });

      var customKlass = (0, _classnames2['default'])('ola-date-custom', {
        'ola-custom-active': isCustomDateActive
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
            'ul',
            { className: 'ola-date-list' },
            dateLabels.map(function (date) {
              return _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(DateLabel, {
                  value: date.id,
                  label: date.label,
                  onSelect: _this2.onDateSelect
                })
              );
            }),
            _react2['default'].createElement(
              'li',
              { className: customKlass },
              _react2['default'].createElement(
                'button',
                {
                  className: 'ola-btn-unstyled ola-btn-date-select',
                  onClick: this.activateCustomDateEntry
                },
                'Custom'
              ),
              _react2['default'].createElement(
                'div',
                { className: 'ola-date-custom-input' },
                _react2['default'].createElement(
                  'label',
                  { className: 'ola-label ola-label-date' },
                  _ref,
                  _react2['default'].createElement('input', {
                    type: 'date',
                    value: this.format(defaultFrom),
                    min: this.format(min),
                    ref: 'fromDate',
                    onChange: this.onCustomChange
                  })
                ),
                _react2['default'].createElement(
                  'label',
                  { className: 'ola-label ola-label-date' },
                  _ref2,
                  _react2['default'].createElement('input', {
                    type: 'date',
                    ref: 'toDate',
                    max: this.format(max),
                    value: this.format(defaultTo),
                    onChange: this.onCustomChange
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DateRange;
}(_react2['default'].Component);

/**
 * Date label
 */


DateRange.defaultProps = {
  dateLabels: [{
    label: 'This year',
    id: 'current_year'
  }, {
    label: 'Last year',
    id: 'last_year'
  }, {
    label: 'Last 3 years',
    id: 'last_3_years'
  }, {
    label: 'Last 5 years',
    id: 'last_5_years'
  }]
};

var DateLabel = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(DateLabel, _React$Component2);

  function DateLabel() {
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, DateLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateLabel)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onSelect(_this3.props.value);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret);
  }

  require('../../../.babelhelper.js').createClass(DateLabel, [{
    key: 'render',
    value: function render() {
      var label = this.props.label;

      return _react2['default'].createElement(
        'button',
        {
          className: 'ola-btn-unstyled ola-btn-date-select',
          onClick: this.handleClick
        },
        label
      );
    }
  }]);

  return DateLabel;
}(_react2['default'].Component);

module.exports = (0, _OlaFacetToggle2['default'])(DateRange);
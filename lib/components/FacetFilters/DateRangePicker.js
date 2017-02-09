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

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props));

    _this.onCustomChange = function () {
      var fromDate = new Date(_this.refs.fromDate.value).getTime();
      var toDate = new Date(_this.refs.toDate.value).getTime();

      var _this$props = _this.props,
          facet = _this$props.facet,
          dispatch = _this$props.dispatch;
      var dateFormat = facet.dateFormat;


      fromDate = dateFormat ? _dateParser2['default'].format(fromDate, dateFormat) : fromDate;
      toDate = dateFormat ? _dateParser2['default'].format(toDate, dateFormat) : toDate;

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
      var _this$props2 = _this.props,
          facet = _this$props2.facet,
          dispatch = _this$props2.dispatch;
      var _facet$dateFormat = facet.dateFormat,
          dateFormat = _facet$dateFormat === undefined ? null : _facet$dateFormat;


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

      fromDate = dateFormat ? _dateParser2['default'].toUTC(fromDate) : fromDate;
      toDate = dateFormat ? _dateParser2['default'].toUTC(toDate) : toDate;

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

      var _props = this.props,
          facet = _props.facet,
          selected = _props.selected,
          dateLabels = _props.dateLabels,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay;
      var isCustomDateActive = this.state.isCustomDateActive;

      var _selected = require('../../../.babelhelper.js').slicedToArray(selected, 2),
          from = _selected[0],
          to = _selected[1];

      var values = facet.values,
          dateFormat = facet.dateFormat;

      var dates = values.map(function (value) {
        return value.name;
      });
      /* Convert dates to (getTime) */
      dates = dates.map(function (d) {
        return _dateParser2['default'].parse(d, dateFormat).getTime();
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
                { key: date.id },
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
var DateLabel = function DateLabel(_ref3) {
  var label = _ref3.label,
      value = _ref3.value,
      onSelect = _ref3.onSelect;

  function handleClick() {
    onSelect(value);
  }

  return _react2['default'].createElement(
    'button',
    {
      className: 'ola-btn-unstyled ola-btn-date-select',
      onClick: handleClick
    },
    label
  );
};

module.exports = (0, _OlaFacetToggle2['default'])(DateRange);
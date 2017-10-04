'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPikadayDatepicker = require('react-pikaday-datepicker');

var _reactPikadayDatepicker2 = _interopRequireDefault(_reactPikadayDatepicker);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DATE_FORMAT = 'DD-MM-YYYY';
var DATE_FORMAT_MOBILE = 'YYYY-MM-DD';

var _ref = _react2['default'].createElement(
  'label',
  { className: 'ola-btn-date-select' },
  'Custom'
);

var _ref2 = _react2['default'].createElement(
  'span',
  null,
  'From'
);

var _ref3 = _react2['default'].createElement(
  'span',
  null,
  'To'
);

var DateRange = function (_React$Component) {
  (0, _inherits3['default'])(DateRange, _React$Component);

  function DateRange(props) {
    (0, _classCallCheck3['default'])(this, DateRange);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (DateRange.__proto__ || (0, _getPrototypeOf2['default'])(DateRange)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      fromDate: '01-01-2017',
      toDate: '01-01-2017',
      minDate: null,
      maxDate: null
    };
    return _this;
  }

  (0, _createClass3['default'])(DateRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateDate(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateDate(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          facet = _props.facet,
          dateLabels = _props.dateLabels,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay,
          isPhone = _props.isPhone;
      var values = facet.values;

      /* Check if dates exists */

      if (!values.length) return null;

      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });
      var yearRange = 20;
      var fromDate = _dateParser2['default'].parse(this.state.fromDate, DATE_FORMAT);
      var toDate = _dateParser2['default'].parse(this.state.toDate, DATE_FORMAT);
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
              { className: 'ola-date-custom' },
              _ref,
              _react2['default'].createElement(
                'div',
                { className: 'ola-date-custom-input' },
                _react2['default'].createElement(
                  'div',
                  { className: 'ola-label ola-label-date' },
                  _ref2,
                  isPhone ? _react2['default'].createElement('input', {
                    type: 'date',
                    value: _dateParser2['default'].format(fromDate, DATE_FORMAT_MOBILE),
                    onChange: this.onMobileFromChange
                  }) : _react2['default'].createElement(_reactPikadayDatepicker2['default'], {
                    format: DATE_FORMAT,
                    onChange: this.onFromChange,
                    parse: this.parseDate,
                    toString: this.toDateString,
                    value: fromDate,
                    yearRange: yearRange,
                    maxDate: toDate
                  })
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'ola-label ola-label-date' },
                  _ref3,
                  isPhone ? _react2['default'].createElement('input', {
                    type: 'date',
                    value: _dateParser2['default'].format(_dateParser2['default'].parse(this.state.toDate, DATE_FORMAT), DATE_FORMAT_MOBILE),
                    onChange: this.onMobileToChange
                  }) : _react2['default'].createElement(_reactPikadayDatepicker2['default'], {
                    format: DATE_FORMAT,
                    parse: this.parseDate,
                    toString: this.toDateString,
                    onChange: this.onToChange,
                    value: toDate,
                    yearRange: yearRange,
                    minDate: fromDate
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getDateFormat = function () {
    return _this3.props.isPhone ? DATE_FORMAT_MOBILE : DATE_FORMAT;
  };

  this.onCustomChange = function () {
    var fromDate = _dateParser2['default'].toUTC(_this3.state.fromDate, _this3.getDateFormat());
    var toDate = _dateParser2['default'].toUTC(_this3.state.toDate, _this3.getDateFormat());
    var _props2 = _this3.props,
        facet = _props2.facet,
        dispatch = _props2.dispatch;


    dispatch((0, _Search.replaceFacet)(facet, [fromDate, toDate]));
    dispatch((0, _Search.executeSearch)());
  };

  this.onFromChange = function (date, event) {
    _this3.setState({
      fromDate: _this3.format(date)
    }, _this3.onCustomChange);
  };

  this.onToChange = function (date) {
    _this3.setState({
      toDate: _this3.format(date)
    }, _this3.onCustomChange);
  };

  this.onDateSelect = function (type) {
    var fromDate = void 0;
    var toDate = void 0;
    var year = void 0;
    var _props3 = _this3.props,
        facet = _props3.facet,
        dispatch = _props3.dispatch;
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

  this.format = function (date) {
    return _dateParser2['default'].format(_dateParser2['default'].parse(date), _this3.getDateFormat());
  };

  this.getMinMaxValue = function (props) {
    var selected = props.selected,
        facet = props.facet;

    var _ref5 = selected && selected.length === 1 ? selected[0] : selected,
        _ref6 = (0, _slicedToArray3['default'])(_ref5, 2),
        fromDate = _ref6[0],
        toDate = _ref6[1];

    var values = facet.values;

    var dates = values.map(function (value) {
      return value.name;
    });
    /* Convert dates to (getTime) */
    dates = dates.map(function (d) {
      return _dateParser2['default'].parse(d).getTime();
    });
    var min = dates.length ? Math.min.apply(_this3, dates) : 0;
    var max = dates.length ? Math.max.apply(_this3, dates) : 0;

    return {
      min: min,
      max: max,
      fromDate: fromDate,
      toDate: toDate
    };
  };

  this.updateDate = function (props) {
    var _getMinMaxValue = _this3.getMinMaxValue(props),
        min = _getMinMaxValue.min,
        max = _getMinMaxValue.max,
        fromDate = _getMinMaxValue.fromDate,
        toDate = _getMinMaxValue.toDate;

    _this3.setState({
      fromDate: _this3.format(fromDate || min),
      toDate: _this3.format(toDate || max)
      // minDate: new Date(min),
      // maxDate: new Date(max)
    });
  };

  this.parseDate = function (dateString, onlyYear) {
    var parts = dateString.split('-');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1] - 1, 10);
    var year = parseInt(parts[2], 10);
    return onlyYear & onlyYear === true ? year : new Date(year, month, day);
  };

  this.toDateString = function (date, format) {
    return _dateParser2['default'].format(date, _this3.getDateFormat());
  };

  this.onMobileFromChange = function (event) {
    _this3.onFromChange(event.target.value);
  };

  this.onMobileToChange = function (event) {
    _this3.onToChange(event.target.value);
  };
};

var DateLabel = function DateLabel(_ref4) {
  var label = _ref4.label,
      value = _ref4.value,
      onSelect = _ref4.onSelect;

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

function mapStateToProps(state) {
  return {
    isPhone: state.Device.isPhone || state.Device.isTablet
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, null)((0, _OlaFacetToggle2['default'])(DateRange));
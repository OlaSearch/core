'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _flatpickr = require('flatpickr');

var _flatpickr2 = _interopRequireDefault(_flatpickr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref3 = _react2['default'].createElement(
  'span',
  null,
  'From'
);

var _ref4 = _react2['default'].createElement(
  'span',
  null,
  'To'
);

var DateRange = function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange(props) {
    _classCallCheck(this, DateRange);

    var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props));

    _this.onCustomChange = function () {
      var fromDate = _dateParser2['default'].toUTC(_this.fromRef.value);
      var toDate = _dateParser2['default'].toUTC(_this.toRef.value);
      var _this$props = _this.props,
          facet = _this$props.facet,
          dispatch = _this$props.dispatch;


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
      return _dateParser2['default'].format(_dateParser2['default'].parse(date), 'YYYY-MM-DD');
    };

    _this.registerFromRef = function (input) {
      if (!input) return;
      _this.fromRef = input;
      _this.fromPicker = new _flatpickr2['default'](input);
    };

    _this.registerToRef = function (input) {
      if (!input) return;
      _this.toRef = input;
      _this.toPicker = new _flatpickr2['default'](input);
    };

    _this.state = {
      isCustomDateActive: false
    };
    return _this;
  }

  _createClass(DateRange, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      /* Destroy picker */
      this.fromPicker.destroy();
      this.toPicker.destroy();
    }
  }, {
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

      var _ref = selected && selected.length === 1 ? selected[0] : selected,
          _ref2 = _slicedToArray(_ref, 2),
          from = _ref2[0],
          to = _ref2[1];

      var values = facet.values;

      var dates = values.map(function (value) {
        return value.name;
      }
      /* Convert dates to (getTime) */
      );dates = dates.map(function (d) {
        return _dateParser2['default'].parse(d).getTime();
      }

      /* Check if dates exists */
      );if (!dates.length) return null;

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
                  _ref3,
                  _react2['default'].createElement('input', {
                    type: 'text',
                    value: this.format(defaultFrom),
                    min: this.format(min),
                    ref: this.registerFromRef,
                    onChange: this.onCustomChange
                  })
                ),
                _react2['default'].createElement(
                  'label',
                  { className: 'ola-label ola-label-date' },
                  _ref4,
                  _react2['default'].createElement('input', {
                    type: 'text',
                    ref: this.registerToRef,
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
var DateLabel = function DateLabel(_ref5) {
  var label = _ref5.label,
      value = _ref5.value,
      onSelect = _ref5.onSelect;

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
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange(props) {
    _classCallCheck(this, DateRange);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateRange).call(this, props));

    _this.onCustomChange = function () {
      var fromDate = new Date(_this.refs.fromDate.value).getTime();
      var toDate = new Date(_this.refs.toDate.value).getTime();

      var _this$props = _this.props;
      var facet = _this$props.facet;
      var dispatch = _this$props.dispatch;


      dispatch((0, _Search.replaceFacet)(facet, [fromDate, toDate]));

      dispatch((0, _Search.executeSearch)());
    };

    _this.activateCustom = function () {
      _this.setState({
        isCustomActive: !_this.state.isCustomActive
      });
    };

    _this.onDateSelect = function (type) {
      var fromDate = undefined;
      var toDate = undefined;
      var year = undefined;
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
      isCustomActive: false
    };
    return _this;
  }

  _createClass(DateRange, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facet = _props.facet;
      var selected = _props.selected;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var isCustomActive = this.state.isCustomActive;

      var _selected = _slicedToArray(selected, 2);

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
        'ola-custom-active': isCustomActive
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
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'button',
                {
                  className: 'ola-btn-unstyled ola-btn-date-select',
                  onClick: function onClick() {
                    return _this2.onDateSelect('current_year');
                  }
                },
                'This year'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'button',
                {
                  className: 'ola-btn-unstyled ola-btn-date-select',
                  onClick: function onClick() {
                    return _this2.onDateSelect('last_year');
                  }
                },
                'Last year'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'button',
                {
                  className: 'ola-btn-unstyled ola-btn-date-select',
                  onClick: function onClick() {
                    return _this2.onDateSelect('last_3_years');
                  }
                },
                'Last 3 years'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'button',
                {
                  className: 'ola-btn-unstyled ola-btn-date-select',
                  onClick: function onClick() {
                    return _this2.onDateSelect('last_5_years');
                  }
                },
                'Last 5 years'
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: customKlass },
              _react2['default'].createElement(
                'button',
                {
                  className: 'ola-btn-unstyled ola-btn-date-select',
                  onClick: this.activateCustom
                },
                'Custom'
              ),
              _react2['default'].createElement(
                'div',
                { className: 'ola-date-custom-input' },
                _react2['default'].createElement(
                  'label',
                  { className: 'ola-label ola-label-date' },
                  _react2['default'].createElement(
                    'span',
                    null,
                    'From'
                  ),
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
                  _react2['default'].createElement(
                    'span',
                    null,
                    'To'
                  ),
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

DateRange.propTypes = {
  dispatch: _react2['default'].PropTypes.func.isRequired,
  facet: _react2['default'].PropTypes.object.isRequired,
  selected: _react2['default'].PropTypes.array.isRequired
};


module.exports = (0, _OlaFacetToggle.FacetToggle)(DateRange);
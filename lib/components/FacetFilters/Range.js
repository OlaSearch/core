'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _nouislider = require('nouislider');

var _nouislider2 = _interopRequireDefault(_nouislider);

var _OlaToggle = require('./../../decorators/OlaToggle');

var _OlaToggle2 = _interopRequireDefault(_OlaToggle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Histogram = require('./Histogram');

var _Histogram2 = _interopRequireDefault(_Histogram);

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RangeFilter = function (_React$Component) {
  (0, _inherits3['default'])(RangeFilter, _React$Component);

  function RangeFilter() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, RangeFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onChange = function (value) {
      var _this$props = _this.props,
          facet = _this$props.facet,
          dispatch = _this$props.dispatch;
      var dateFormat = facet.dateFormat;


      if (typeof value === 'string' || value.length === 1) value = [0, value[0]];

      var _value = value,
          start = _value[0],
          end = _value[1];

      start = dateFormat ? _dateParser2['default'].toUTC(start) : start; /* Use ISO string */
      end = dateFormat ? _dateParser2['default'].toUTC(end) : end;

      dispatch((0, _Search.replaceFacet)(facet, [start, end]));

      dispatch((0, _Search.executeSearch)());
    }, _this.setUpSlider = function () {
      if (!_this.sliderInput) return;
      var _this$props2 = _this.props,
          facet = _this$props2.facet,
          showPips = _this$props2.showPips,
          pips = _this$props2.pips,
          pipsDensity = _this$props2.pipsDensity,
          pipsMode = _this$props2.pipsMode;


      var options = _this.getSliderValues(_this.props);

      var _facet$step = facet.step,
          stepValue = _facet$step === undefined ? 1 : _facet$step,
          singleHandle = facet.singleHandle,
          dateFormat = facet.dateFormat;

      /* Convert to numeric value */

      var step = dateFormat ? stepValue : parseFloat(stepValue);

      var min = options.min,
          max = options.max,
          value = options.value;


      if (min === max) {
        min -= 60;
        max += 60;
        step = 60;

        _this.sliderInput.setAttribute('disabled', true);
      } else _this.sliderInput.removeAttribute('disabled');

      /* Tooltip format */
      var formatTooltip = {
        to: function to(value) {
          return dateFormat ? _dateParser2['default'].format(value, dateFormat) : (0, _utilities.decimalAdjust)('round', value, -1);
        }

        /* Slider options */

      };var sliderOptions = {
        start: value,
        step: step,
        connect: singleHandle ? [true, false] : true,
        tooltips: singleHandle ? [formatTooltip] : [formatTooltip, formatTooltip],
        range: {
          min: min,
          max: max
        },
        format: {
          to: function to(value) {
            return (0, _utilities.decimalAdjust)('round', value, -1);
          },
          from: function from(value) {
            return (0, _utilities.decimalAdjust)('round', value, -1);
          }
        }
      };

      var pipsOptions = showPips ? {
        pips: {
          mode: pipsMode,
          values: pips,
          density: pipsDensity,
          stepped: true
        }
      } : {};

      /* Initialize Slider */

      _this.slider = _nouislider2['default'].create(_this.sliderInput, (0, _extends3['default'])({}, sliderOptions, pipsOptions));

      /* Bind to onchange */

      _this.slider.on('change', _this.onChange);
    }, _this.registerRef = function (input) {
      _this.sliderInput = input;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  RangeFilter.prototype.componentDidUpdate = function componentDidUpdate() {
    if (!this.sliderInput || !this.sliderInput.noUiSlider) {
      return this.setUpSlider();
    }
    /**
     * Check if there are values
     */
    if (!this.props.facet.values.length) {
      return this.sliderInput.setAttribute('disabled', true);
    }

    var options = this.getSliderValues(this.props);
    var _props$facet = this.props.facet,
        _props$facet$step = _props$facet.step,
        stepValue = _props$facet$step === undefined ? 1 : _props$facet$step,
        dateFormat = _props$facet.dateFormat;
    var min = options.min,
        max = options.max,
        value = options.value;

    /* Convert to numeric value */

    var step = dateFormat ? stepValue : parseFloat(stepValue);

    /**
     * Check if min, max is the same, then disable the slider
     */

    if (min === max) {
      min -= 60;
      max += 60;
      step = 60;

      this.sliderInput.setAttribute('disabled', true);
    } else this.sliderInput.removeAttribute('disabled');

    this.sliderInput.noUiSlider.updateOptions({
      step: step,
      range: {
        min: min,
        max: max
      }
    });

    this.sliderInput.noUiSlider.set(value);
  };

  RangeFilter.prototype.getSliderValues = function getSliderValues(props) {
    var facet = props.facet,
        selected = props.selected;
    var values = facet.values,
        singleHandle = facet.singleHandle,
        dateFormat = facet.dateFormat;

    var min = 0;
    var max = 0;

    values = values.map(function (value) {
      if (typeof value.name === 'string' && dateFormat) {
        return _dateParser2['default'].parse(value.name).getTime();
      }
      return value.name;
    });
    /**
     * Selected will be a ['start', 'end']
     */
    selected = selected.map(function (value) {
      if (typeof value === 'string' && dateFormat) {
        return _dateParser2['default'].parse(value).getTime();
      }
      return value;
    });

    if (values.length) {
      min = Math.min.apply(Math, values);
      max = Math.max.apply(Math, values);
    }

    var arr = (0, _flatten2['default'])(selected);
    var value = arr && arr.length ? arr : [min, max];

    /* If Slider only has 1 handle */

    if (singleHandle) {
      value = arr && arr.length ? arr[1] : [max];
    }
    return { min: min, max: max, value: value };
  };

  RangeFilter.prototype.componentDidMount = function componentDidMount() {
    this.setUpSlider();
  };

  RangeFilter.prototype.componentWillUnmount = function componentWillUnmount() {
    this.sliderInput && this.sliderInput.noUiSlider.destroy();
  };

  RangeFilter.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.facet !== nextProps.facet || this.props.isCollapsed !== nextProps.isCollapsed || this.props.selected !== nextProps.selected;
  };

  RangeFilter.prototype.render = function render() {
    var _props = this.props,
        facet = _props.facet,
        isCollapsed = _props.isCollapsed,
        toggleDisplay = _props.toggleDisplay;
    var displayName = facet.displayName,
        values = facet.values,
        showHistogram = facet.showHistogram;
    /* Return null if there are no values */

    if (!values.length) return null;
    var klass = (0, _classnames2['default'])({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    });

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
        showHistogram && _react2['default'].createElement(_Histogram2['default'], { data: values }),
        _react2['default'].createElement(
          'div',
          { className: 'ola-slider' },
          _react2['default'].createElement('div', { ref: this.registerRef })
        )
      )
    );
  };

  return RangeFilter;
}(_react2['default'].Component);

RangeFilter.defaultProps = {
  pips: [0, 26, 44.5, 63, 81.5, 100],
  pipsDensity: 4,
  pipsMode: 'positions',
  showPips: false
};


module.exports = (0, _OlaToggle2['default'])(RangeFilter);
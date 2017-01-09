'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _flatten = require('ramda/src/flatten');

var _flatten2 = require('../../../.babelhelper.js').interopRequireDefault(_flatten);

var _nouislider = require('nouislider');

var _nouislider2 = require('../../../.babelhelper.js').interopRequireDefault(_nouislider);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _Histogram = require('./Histogram');

var _Histogram2 = require('../../../.babelhelper.js').interopRequireDefault(_Histogram);

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = require('../../../.babelhelper.js').interopRequireDefault(_dateParser);

var RangeFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(RangeFilter, _React$Component);

  function RangeFilter() {
    var _ref;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, RangeFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_ref = RangeFilter.__proto__ || Object.getPrototypeOf(RangeFilter)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (value) {
      var _this$props = _this.props,
          facet = _this$props.facet,
          dispatch = _this$props.dispatch;


      if (typeof value === 'string' || value.length === 1) value = [0, value[0]];

      dispatch((0, _Search.replaceFacet)(facet, value));

      dispatch((0, _Search.executeSearch)());
    }, _this.registerRef = function (input) {
      _this.sliderInput = input;
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(RangeFilter, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      /**
       * Check if there are values
       */
      if (!this.props.facet.values.length) return this.sliderInput.setAttribute('disabled', true);

      var options = this.getSliderValues(this.props);
      var _props$facet$step = this.props.facet.step,
          step = _props$facet$step === undefined ? 1 : _props$facet$step;
      var min = options.min,
          max = options.max,
          value = options.value;

      /* Convert to numeric value */

      step = parseInt(step);

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
    }
  }, {
    key: 'getSliderValues',
    value: function getSliderValues(props) {
      var facet = props.facet,
          selected = props.selected;
      var values = facet.values,
          singleHandle = facet.singleHandle;

      var min = 0;
      var max = 0;

      values = values.map(function (value) {
        return value.name;
      });

      if (values.length) {
        min = Math.min.apply(Math, require('../../../.babelhelper.js').toConsumableArray(values));
        max = Math.max.apply(Math, require('../../../.babelhelper.js').toConsumableArray(values));
      }

      var arr = (0, _flatten2['default'])(selected);
      var value = arr && arr.length ? arr : [min, max];

      /* If Slider only has 1 handle */

      if (singleHandle) {
        value = arr && arr.length ? arr[1] : [max];
      }

      return { min: min, max: max, value: value };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          facet = _props.facet,
          showPips = _props.showPips,
          pips = _props.pips,
          pipsDensity = _props.pipsDensity,
          pipsMode = _props.pipsMode;


      var options = this.getSliderValues(this.props);

      var _facet$step = facet.step,
          step = _facet$step === undefined ? 1 : _facet$step,
          singleHandle = facet.singleHandle,
          type = facet.type,
          dateFormat = facet.dateFormat;

      /* Convert to numeric value */

      step = parseInt(step);

      var min = options.min,
          max = options.max,
          value = options.value;


      if (min === max) {
        min -= 60;
        max += 60;
        step = 60;

        this.sliderInput.setAttribute('disabled', true);
      } else this.sliderInput.removeAttribute('disabled');

      /* Tooltip format */

      var formatTooltip = {
        to: function to(value) {
          return type === 'daterange' ? _dateParser2['default'].format(value, dateFormat) : Math.floor(value);
        }
      };

      /* Slider options */

      var sliderOptions = {
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
            return Math.floor(value);
          },
          from: function from(value) {
            return Math.floor(value);
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

      this.slider = _nouislider2['default'].create(this.sliderInput, require('../../../.babelhelper.js')['extends']({}, sliderOptions, pipsOptions));

      /* Bind to onchange */

      this.slider.on('change', this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.slider.destroy();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.facet !== nextProps.facet || this.props.isCollapsed !== nextProps.isCollapsed || this.props.selected !== nextProps.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          facet = _props2.facet,
          isCollapsed = _props2.isCollapsed,
          toggleDisplay = _props2.toggleDisplay;
      var displayName = facet.displayName,
          values = facet.values,
          showHistogram = facet.showHistogram;

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
    }
  }]);

  return RangeFilter;
}(_react2['default'].Component);

RangeFilter.defaultProps = {
  pips: [0, 26, 44.5, 63, 81.5, 100],
  pipsDensity: 4,
  pipsMode: 'positions',
  showPips: false
};
;

module.exports = (0, _OlaFacetToggle2['default'])(RangeFilter);
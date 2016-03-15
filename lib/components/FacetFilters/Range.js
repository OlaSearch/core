'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _ramda = require('ramda');

var _nouislider = require('nouislider');

var _nouislider2 = _interopRequireDefault(_nouislider);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Histogram = require('./Histogram');

var _Histogram2 = _interopRequireDefault(_Histogram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Range = function (_React$Component) {
	_inherits(Range, _React$Component);

	function Range() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Range);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Range)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (facet, value) {

			if (typeof value == 'string' || value.length == 1) value = [0, value[0]];

			_this.props.dispatch((0, _Search.replaceFacet)(facet, value));

			_this.props.dispatch((0, _Search.executeSearch)());
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Range, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {

			var options = this.getSliderValues(this.props);
			var step = this.props.step;
			var min = options.min;
			var max = options.max;
			var value = options.value;

			/**
    * Check if min, max is the same, then disable the slider
    */

			if (min == max) {
				min -= 60;
				max += 60;
				step = 60;

				this.refs.slider.setAttribute('disabled', true);
			} else {

				this.refs.slider.removeAttribute('disabled');
			}

			this.refs.slider.noUiSlider.updateOptions({
				step: step,
				range: {
					min: min,
					max: max
				}
			});

			this.refs.slider.noUiSlider.set(value);
		}
	}, {
		key: 'getSliderValues',
		value: function getSliderValues(props) {
			var facet = props.facet;
			var selected = props.selected;
			var values = facet.values;
			var singleHandle = facet.singleHandle;


			var values = values.map(function (value) {
				return value.name;
			});
			var min = 0,
			    max = 0;

			if (values.length) {
				min = Math.min.apply(Math, _toConsumableArray(values));
				max = Math.max.apply(Math, _toConsumableArray(values));
			}

			var arr = (0, _ramda.flatten)(selected);

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
			var _this2 = this;

			var _props = this.props;
			var facet = _props.facet;
			var step = _props.step;
			var showPips = _props.showPips;
			var pips = _props.pips;
			var pipsDensity = _props.pipsDensity;
			var pipsMode = _props.pipsMode;


			var options = this.getSliderValues(this.props);

			var singleHandle = facet.singleHandle;
			var min = options.min;
			var max = options.max;
			var value = options.value;


			if (min == max) {
				min -= 60;
				max += 60;
				step = 60;

				this.refs.slider.setAttribute('disabled', true);
			} else {

				this.refs.slider.removeAttribute('disabled');
			}

			/* Slider options */

			var sliderOptions = {
				start: value,
				step: step,
				connect: singleHandle ? 'lower' : true,
				tooltips: true,
				range: {
					'min': min,
					'max': max
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

			this.slider = _nouislider2['default'].create(this.refs.slider, _extends({}, sliderOptions, pipsOptions));

			/* Bind to onchange */

			this.slider.on('change', function (value) {
				return _this2.onChange(facet, value);
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.slider.destroy();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var facet = _props2.facet;
			var isCollapsed = _props2.isCollapsed;
			var toggleDisplay = _props2.toggleDisplay;
			var showHistogram = _props2.showHistogram;
			var values = facet.values;


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
					facet.displayName
				),
				_react2['default'].createElement(
					'div',
					{ className: 'ola-facet-wrapper' },
					showHistogram ? _react2['default'].createElement(_Histogram2['default'], { data: values }) : null,
					_react2['default'].createElement(
						'div',
						{ className: 'ola-slider' },
						_react2['default'].createElement('div', { ref: 'slider' })
					)
				)
			);
		}
	}]);

	return Range;
}(_react2['default'].Component);

Range.propTypes = {
	dispatch: _react2['default'].PropTypes.func.isRequired,
	selected: _react2['default'].PropTypes.array.isRequired,
	facet: _react2['default'].PropTypes.object.isRequired
};
Range.defaultProps = {
	step: 1,
	showHistogram: false,
	pips: [0, 26, 44.5, 63, 81.5, 100],
	pipsDensity: 4,
	pipsMode: 'positions',
	showPips: false
};
;

module.exports = (0, _OlaFacetToggle.FacetToggle)(Range);
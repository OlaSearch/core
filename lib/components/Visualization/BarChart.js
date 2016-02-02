'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Example:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <BarChart 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	facets = {facet}						
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	facetName = 'year_i'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	selected = {selected}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	dispatch = {dispatch}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	sampleSize = { 10000 }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	showYAxis = { false }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	showXAxis = { false }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	showLabel = { false }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	showSampleSizeSelector = { false }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	showTooltip = { false }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	sortDirection = 'asc'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	type = 'area'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	barRatio = { 1}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	height = { 100}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	constrainBounds = { false }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// import c3 from 'c3';

var BarChart = function (_React$Component) {
	_inherits(BarChart, _React$Component);

	function BarChart(props) {
		_classCallCheck(this, BarChart);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BarChart).call(this, props));
	}

	_createClass(BarChart, [{
		key: 'onSelect',
		value: function onSelect(facet, value) {
			var _props = this.props;
			var dispatch = _props.dispatch;
			var multiple = _props.multiple;

			if (multiple) {

				dispatch((0, _Search.addFacet)(facet, value));
			} else {

				dispatch((0, _Search.replaceFacet)(facet, value));
			}

			dispatch((0, _Search.executeSearch)());
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var _props2 = this.props;
			var type = _props2.type;
			var zoom = _props2.zoom;
			var showXAxis = _props2.showXAxis;
			var showYAxis = _props2.showYAxis;
			var showLabel = _props2.showLabel;
			var barRatio = _props2.barRatio;
			var height = _props2.height;
			var showTooltip = _props2.showTooltip;
			var duration = _props2.duration;

			var data = this.getValues();

			this.chart = c3.generate({
				bindto: this.refs.chart,
				data: {
					columns: [data],
					type: type,
					onclick: function onclick(d, element) {

						_this2.onSelect(_this2.facetObj, _this2.values[d.index].name);
					},
					color: function color() {
						return 'orange';
					}
				},
				axis: {
					x: {
						tick: {
							format: function format(d) {
								return _this2.values ? _this2.values[d].name : 'a';
							},
							culling: {
								max: 6
							}
						},
						show: showXAxis
					},
					y: {
						show: showYAxis
					}
				},
				legend: {
					show: showLabel
				},
				zoom: {
					enabled: zoom
				},
				bar: {
					ratio: barRatio
				},
				size: {
					height: height
				},
				tooltip: {
					show: showTooltip
				},
				transition: {
					duration: duration
				}
			});
		}
	}, {
		key: 'getValues',
		value: function getValues(props) {
			var _props3 = this.props;
			var facets = _props3.facets;
			var facetName = _props3.facetName;
			var selected = _props3.selected;
			var sortDirection = _props3.sortDirection;
			var constrainBounds = _props3.constrainBounds;
			var sampleSize = _props3.sampleSize;

			/* Pick the facet */

			var facet = facets.filter(function (item) {
				return item.name == facetName;
			});

			var selectedFacet = selected.filter(function (item) {
				return item.name == facetName;
			});

			this.facetObj = facet[0];

			if (!this.facetObj) return [];

			/* Sort values */

			this.values = this.facetObj.values.sort(function (a, b) {
				return sortDirection == 'desc' ? b.name - a.name : a.name - b.name;
			});

			/* For bounds */

			if (constrainBounds) {

				var hasBounds = selectedFacet.length && ['range', 'rating'].indexOf(this.facetObj.type) != -1;
				var bounds = hasBounds ? selectedFacet[0].selected[0] : false;

				this.values = this.values.filter(function (item) {

					if (bounds) {

						return (typeof bounds === 'undefined' ? 'undefined' : _typeof(bounds)) == 'object' ? item.name >= bounds[0] && item.name <= bounds[1] : item.name <= bounds;
					}

					return true;
				}).slice(0, sampleSize);
			}

			var data = this.values.map(function (item) {
				return item.count;
			});

			return [this.facetObj.displayName].concat(_toConsumableArray(data));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {

			var data = this.getValues();

			this.chart.load({
				columns: [data]
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var title = this.props.title;

			return _react2.default.createElement(
				'div',
				{ className: 'ola-viz' },
				title ? _react2.default.createElement(
					'h3',
					null,
					title
				) : null,
				_react2.default.createElement('div', { ref: 'chart' })
			);
		}
	}]);

	return BarChart;
}(_react2.default.Component);

BarChart.defaultProps = {
	title: 'Movies by year',
	multiple: false,
	type: 'bar',
	zoom: false,
	sampleSize: 20,
	showXAxis: true,
	showYAxis: true,
	showLabel: true,
	showSampleSizeSelector: true,
	sortDirection: 'desc',
	showTooltip: true,
	barRatio: 0.9,
	height: 320,
	constrainBounds: true,
	duration: 300
};
exports.default = BarChart;
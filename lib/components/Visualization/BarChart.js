/**
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

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import c3 from 'c3';

var _actionsSearch = require('./../../actions/Search');

var BarChart = (function (_React$Component) {
	_inherits(BarChart, _React$Component);

	_createClass(BarChart, null, [{
		key: 'defaultProps',
		value: {
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
		},
		enumerable: true
	}]);

	function BarChart(props) {
		_classCallCheck(this, BarChart);

		_get(Object.getPrototypeOf(BarChart.prototype), 'constructor', this).call(this, props);
	}

	_createClass(BarChart, [{
		key: 'onSelect',
		value: function onSelect(facet, value) {
			var _props = this.props;
			var dispatch = _props.dispatch;
			var multiple = _props.multiple;

			if (multiple) {

				dispatch((0, _actionsSearch.addFacet)(facet, value));
			} else {

				dispatch((0, _actionsSearch.replaceFacet)(facet, value));
			}

			dispatch((0, _actionsSearch.executeSearch)());
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

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

						_this.onSelect(_this.facetObj, _this.values[d.index].name);
					},
					color: function color() {
						return 'orange';
					}
				},
				axis: {
					x: {
						tick: {
							format: function format(d) {
								return _this.values ? _this.values[d].name : 'a';
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

						return typeof bounds == 'object' ? item.name >= bounds[0] && item.name <= bounds[1] : item.name <= bounds;
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

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-viz' },
				title ? _react2['default'].createElement(
					'h3',
					null,
					title
				) : null,
				_react2['default'].createElement('div', { ref: 'chart' })
			);
		}
	}]);

	return BarChart;
})(_react2['default'].Component);

exports['default'] = BarChart;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import c3 from 'c3';

var _actionsSearch = require('./../../actions/Search');

var _ramda = require('ramda');

var PieChart = (function (_React$Component) {
	_inherits(PieChart, _React$Component);

	function PieChart() {
		_classCallCheck(this, PieChart);

		_get(Object.getPrototypeOf(PieChart.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(PieChart, [{
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

			var type = this.props.type;

			var data = this.getValues();

			this.chart = c3.generate({
				bindto: this.refs.chart,
				data: {
					columns: data,
					type: type,
					onclick: function onclick(d, element) {
						_this.onSelect(_this.facetObj, d.name);
					}
				}
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.allValues = [];
		}
	}, {
		key: 'getValues',
		value: function getValues(prop) {

			var props = prop ? prop : this.props;

			var facets = props.facets;
			var facetName = props.facetName;

			/* Pick the facet */

			var facet = facets.filter(function (item) {
				return item.name == facetName;
			});

			this.facetObj = facet[0];

			if (!this.facetObj) return [];

			var _names = this.facetObj.values.map(function (item) {
				return item.name;
			});

			this.allValues = (0, _ramda.union)(_names, this.allValues);

			this.excludes = (0, _ramda.difference)(this.allValues, _names);

			return this.facetObj.values.map(function (item) {
				return [item.name, item.count];
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {

			return nextProps.facets != this.props.facets;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {

			var data = this.getValues();

			/**
    * Set previous data to ZERO
    */

			this.chart.load({
				columns: data,
				unload: this.excludes
			});
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-viz' },
				_react2['default'].createElement(
					'h3',
					null,
					this.props.title
				),
				_react2['default'].createElement('div', { ref: 'chart' })
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			title: 'Movies by genre',
			type: 'pie',
			facetName: ''
		},
		enumerable: true
	}]);

	return PieChart;
})(_react2['default'].Component);

exports['default'] = PieChart;
module.exports = exports['default'];
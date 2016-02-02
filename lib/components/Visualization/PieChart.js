'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import c3 from 'c3';

var PieChart = function (_React$Component) {
	_inherits(PieChart, _React$Component);

	function PieChart() {
		_classCallCheck(this, PieChart);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PieChart).apply(this, arguments));
	}

	_createClass(PieChart, [{
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

			var type = this.props.type;

			var data = this.getValues();

			this.chart = c3.generate({
				bindto: this.refs.chart,
				data: {
					columns: data,
					type: type,
					onclick: function onclick(d, element) {
						_this2.onSelect(_this2.facetObj, d.name);
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

			return _react2.default.createElement(
				'div',
				{ className: 'ola-viz' },
				_react2.default.createElement(
					'h3',
					null,
					this.props.title
				),
				_react2.default.createElement('div', { ref: 'chart' })
			);
		}
	}]);

	return PieChart;
}(_react2.default.Component);

PieChart.defaultProps = {
	title: 'Movies by genre',
	type: 'pie',
	facetName: ''
};

module.exports = PieChart;
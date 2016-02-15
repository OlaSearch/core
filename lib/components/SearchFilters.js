'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Default = require('./FacetFilters/Default');

var _Default2 = _interopRequireDefault(_Default);

var _Checkbox = require('./FacetFilters/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Range = require('./FacetFilters/Range');

var _Range2 = _interopRequireDefault(_Range);

var _Rating = require('./FacetFilters/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Boolean = require('./FacetFilters/Boolean');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _DateRange = require('./FacetFilters/DateRange');

var _DateRange2 = _interopRequireDefault(_DateRange);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchFilters = function (_React$Component) {
	_inherits(SearchFilters, _React$Component);

	function SearchFilters() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, SearchFilters);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SearchFilters)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getFacetsToDisplay = function (selected) {
			var facetsToDisplay = _this.context.config.facetsToDisplay;


			var selections = (0, _ramda.flatten)(selected.map(function (item) {
				return item.selected;
			}));

			var names = [],
			    defaultNames = facetsToDisplay['*'],
			    hasKey = false;

			/* Loop through selections and find Facets to display */

			selections.forEach(function (item) {
				if (facetsToDisplay.hasOwnProperty(item)) {
					names = facetsToDisplay[item];
					hasKey = true;
				}
			});

			/* If there are no keys in `facetsToDisplay` Return all facets */

			if (!hasKey) return defaultNames;

			/* Found */

			return names;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SearchFilters, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {

			return this.props.facets != nextProps.facets || this.props.selected != nextProps.selected;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var facets = _props.facets;
			var dispatch = _props.dispatch;
			var selected = _props.selected;

			/* Facet names to display */

			var facetsToDisplay = this.getFacetsToDisplay(selected);

			/* Exclude tabs and agree with `facetsToDisplay` */

			facets = facets.filter(function (facet) {
				return !facet.tab && facetsToDisplay.indexOf(facet.name) != -1;
			});

			if (!facets.length) return null;

			return _react2.default.createElement(
				'div',
				{ className: 'ola-search-filters' },
				facets.map(function (facet, index) {

					/* Recalculate Selected values */

					var selectedFacets = selected.filter(function (item) {
						return item.name == facet.name;
					}).map(function (item) {
						return item.selected;
					}),
					    selectedItems = (0, _ramda.flatten)(selectedFacets);

					var passProps = {
						facet: facet,
						dispatch: dispatch,
						selected: selectedItems,
						key: index
					};

					switch (facet.type) {

						case 'checkbox':
							return _react2.default.createElement(_Checkbox2.default, passProps);

						case 'range':
							return _react2.default.createElement(_Range2.default, passProps);

						case 'rating':
							return _react2.default.createElement(_Rating2.default, passProps);

						case 'boolean':
							return _react2.default.createElement(_Boolean2.default, passProps);

						case 'daterange':
							return _react2.default.createElement(_DateRange2.default, passProps);

						default:
							return _react2.default.createElement(_Default2.default, passProps);
					}
				})
			);
		}
	}]);

	return SearchFilters;
}(_react2.default.Component);

SearchFilters.contextTypes = {
	config: _react2.default.PropTypes.object
};
SearchFilters.propTypes = {
	facets: _react2.default.PropTypes.array.isRequired,
	selected: _react2.default.PropTypes.array.isRequired,
	dispatch: _react2.default.PropTypes.func
};


module.exports = SearchFilters;
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

var _FacetFiltersDefault = require('./FacetFilters/Default');

var _FacetFiltersDefault2 = _interopRequireDefault(_FacetFiltersDefault);

var _FacetFiltersCheckbox = require('./FacetFilters/Checkbox');

var _FacetFiltersCheckbox2 = _interopRequireDefault(_FacetFiltersCheckbox);

var _FacetFiltersRange = require('./FacetFilters/Range');

var _FacetFiltersRange2 = _interopRequireDefault(_FacetFiltersRange);

var _FacetFiltersRating = require('./FacetFilters/Rating');

var _FacetFiltersRating2 = _interopRequireDefault(_FacetFiltersRating);

var _FacetFiltersBoolean = require('./FacetFilters/Boolean');

var _FacetFiltersBoolean2 = _interopRequireDefault(_FacetFiltersBoolean);

var _FacetFiltersDateRange = require('./FacetFilters/DateRange');

var _FacetFiltersDateRange2 = _interopRequireDefault(_FacetFiltersDateRange);

var _ramda = require('ramda');

var SearchFilters = (function (_React$Component) {
	_inherits(SearchFilters, _React$Component);

	function SearchFilters() {
		var _this = this;

		_classCallCheck(this, SearchFilters);

		_get(Object.getPrototypeOf(SearchFilters.prototype), 'constructor', this).apply(this, arguments);

		this.getFacetsToDisplay = function (selected) {
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
		};
	}

	_createClass(SearchFilters, [{
		key: 'render',

		// shouldComponentUpdate( nextProps ){

		// 	return this.props.facets != nextProps.facets || this.props.selected != nextProps.selected
		// }

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

			return _react2['default'].createElement(
				'div',
				null,
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
							return _react2['default'].createElement(_FacetFiltersCheckbox2['default'], passProps);

						case 'range':
							return _react2['default'].createElement(_FacetFiltersRange2['default'], passProps);

						case 'rating':
							return _react2['default'].createElement(_FacetFiltersRating2['default'], passProps);

						case 'boolean':
							return _react2['default'].createElement(_FacetFiltersBoolean2['default'], passProps);

						case 'daterange':
							return _react2['default'].createElement(_FacetFiltersDateRange2['default'], passProps);

						default:
							return _react2['default'].createElement(_FacetFiltersDefault2['default'], passProps);
					}
				})
			);
		}
	}], [{
		key: 'contextTypes',
		value: {
			config: _react2['default'].PropTypes.object
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			facets: _react2['default'].PropTypes.array.isRequired,
			selected: _react2['default'].PropTypes.array.isRequired,
			dispatch: _react2['default'].PropTypes.func
		},
		enumerable: true
	}]);

	return SearchFilters;
})(_react2['default'].Component);

exports['default'] = SearchFilters;
module.exports = exports['default'];
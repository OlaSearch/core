/**
 * Usage
 *
 * <Tabs 
 *		facets = {facets} 
 *		dispatch = {dispatch}
 *		selected = {facet_query}
 *	/>
 */
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

var _actionsSearch = require('./../../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var Tabs = (function (_React$Component) {
	_inherits(Tabs, _React$Component);

	function Tabs(props) {
		var _this = this;

		_classCallCheck(this, Tabs);

		_get(Object.getPrototypeOf(Tabs.prototype), 'constructor', this).call(this, props);

		this.handleReplaceFacet = function (facet, value) {

			_this.props.dispatch((0, _actionsSearch.replaceFacet)(facet, value));

			_this.props.dispatch((0, _actionsSearch.executeSearch)());
		};

		this.handleRemoveFacet = function (facet) {

			_this.props.dispatch((0, _actionsSearch.removeFacet)(facet));

			_this.props.dispatch((0, _actionsSearch.executeSearch)());
		};

		this.getTabsForDisplay = function (values) {
			var tabsToDisplay = _this.context.config.tabsToDisplay;

			var tabs = [];

			for (var i = 0; i < tabsToDisplay.length; i++) {

				var tab = values.filter(function (item) {
					return item.name == tabsToDisplay[i];
				});

				if (tab.length) {
					tabs.push({
						name: tab[0].name,
						count: tab[0].count
					});
				} else {
					tabs.push({
						name: tabsToDisplay[i],
						count: 0
					});
				}
			}

			return tabs;
		};
	}

	_createClass(Tabs, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var facets = _props.facets;
			var selected = _props.selected;
			var config = this.context.config;

			var facet = facets.filter(function (item) {
				return item.tab;
			});

			/* Return null if there is no facets */

			if (!facet.length) return null;

			var tab = facet[0];
			var values = [].concat.apply([], facet.map(function (item) {
				return item.values;
			}));

			var tabs = this.getTabsForDisplay(values);

			var selectedFacets = selected.filter(function (item) {
				return item.name == tab.name;
			}).map(function (item) {
				return item.selected;
			}),
			    selectedItems = [].concat.apply([], selectedFacets);

			/* Calculate Total for All Tab */

			var totalCount = values.reduce(function (acc, obj) {
				return acc + obj.count;
			}, 0);

			/* Class for all tab */

			var klassTab = (0, _classnames2['default'])({
				'ola-tabs-label': true,
				'ola-tab-active': !selectedFacets.length
			});

			return _react2['default'].createElement(
				'nav',
				{ className: 'ola-tabs' },
				_react2['default'].createElement(
					'button',
					{
						className: klassTab,
						onClick: function () {
							_this2.handleRemoveFacet(tab);
						}
					},
					'All',
					_react2['default'].createElement(
						'span',
						{ className: 'ola-search-facet-count' },
						totalCount
					)
				),
				tabs.map(function (value, idx) {

					var klass = (0, _classnames2['default'])({
						'ola-tabs-label': true,
						'ola-tab-active': selectedItems.indexOf(value.name) != -1
					});

					return _react2['default'].createElement(
						'button',
						{
							className: klass,
							type: 'button',
							key: idx,
							onClick: function () {
								_this2.handleReplaceFacet(tab, value.name);
							} },
						(0, _utilities.getDisplayName)(config.facetNames, value.name),
						_react2['default'].createElement(
							'span',
							{ className: 'ola-search-facet-count' },
							value.count
						)
					);
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
			dispatch: _react2['default'].PropTypes.func.isRequired
		},
		enumerable: true
	}]);

	return Tabs;
})(_react2['default'].Component);

exports['default'] = Tabs;
module.exports = exports['default'];
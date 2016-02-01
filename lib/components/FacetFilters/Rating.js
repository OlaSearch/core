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

var _decoratorsOlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var Rating = (function (_React$Component) {
	_inherits(Rating, _React$Component);

	function Rating() {
		var _this = this;

		_classCallCheck(this, _Rating);

		_get(Object.getPrototypeOf(_Rating.prototype), 'constructor', this).apply(this, arguments);

		this.handleFacet = function (event) {
			var _props = _this.props;
			var dispatch = _props.dispatch;
			var facet = _props.facet;

			var min = parseInt(event.target.value, 10);
			var value = [min, min + facet.gap];

			if (event.target.checked) {

				dispatch((0, _actionsSearch.addFacet)(facet, value));
			} else {

				dispatch((0, _actionsSearch.removeFacet)(facet, value));
			}

			/* Search */

			dispatch((0, _actionsSearch.executeSearch)());
		};
	}

	_createClass(Rating, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props;
			var facet = _props2.facet;
			var selected = _props2.selected;
			var isCollapsed = _props2.isCollapsed;
			var toggleDisplay = _props2.toggleDisplay;
			var values = facet.values;

			/* Seleced - [1,2,3,4] => [ [1, 2], [3, 4]];*/

			var selectedArray = (0, _utilities.parseRangeValues)(selected);

			var bounds = selectedArray.map(function (item) {
				return parseInt(item[0]);
			});

			var isSelected = function isSelected(name) {
				return bounds.indexOf(parseInt(name)) > -1;
			};

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
					_react2['default'].createElement(
						'div',
						{ className: 'ola-facet-list' },
						values.map(function (value, idx) {

							var stars = [];
							var normalized = Math.max(Math.ceil(parseInt(value.name) / 20), 0) + 1;
							var isActive = isSelected(value.name);
							var labelKlass = (0, _classnames2['default'])({
								'ola-checkbox ola-checkbox-label': true,
								'ola-checkbox-active': isActive
							});

							for (var i = 0; i < normalized; i++) {
								stars.push(_react2['default'].createElement('em', { key: i, className: 'ion ion-ios-star ola-rating-active' }));
							}

							return _react2['default'].createElement(
								'label',
								{
									key: idx,
									className: labelKlass
								},
								_react2['default'].createElement('input', {
									type: 'checkbox',
									value: value.name,
									onChange: _this2.handleFacet,
									checked: isActive
								}),
								stars,
								_react2['default'].createElement(
									'span',
									{ className: 'ola-search-facet-count' },
									value.count
								)
							);
						})
					)
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			dispatch: _react2['default'].PropTypes.func.isRequired,
			selected: _react2['default'].PropTypes.array.isRequired,
			facet: _react2['default'].PropTypes.object.isRequired
		},
		enumerable: true
	}]);

	var _Rating = Rating;
	Rating = (0, _decoratorsOlaFacetToggle.FacetToggle)(Rating) || Rating;
	return Rating;
})(_react2['default'].Component);

exports['default'] = Rating;
module.exports = exports['default'];
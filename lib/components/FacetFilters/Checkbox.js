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

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var Default = (function (_React$Component) {
	_inherits(Default, _React$Component);

	function Default(props) {
		var _this = this;

		_classCallCheck(this, _Default);

		_get(Object.getPrototypeOf(_Default.prototype), 'constructor', this).call(this, props);

		this.handleAddFacet = function (facet, value) {

			_this.setState({
				filterText: ''
			});

			_this.props.dispatch((0, _actionsSearch.addFacet)(facet, value));

			_this.props.dispatch((0, _actionsSearch.executeSearch)());
		};

		this.handleRemoveFacet = function (facet, value) {

			_this.props.dispatch((0, _actionsSearch.removeFacet)(facet, value));

			_this.props.dispatch((0, _actionsSearch.executeSearch)());
		};

		this.onChangeFilterText = function (event) {

			_this.setState({
				filterText: event.target.value
			});
		};

		this.state = {
			filterText: '',
			showMore: false
		};
	}

	_createClass(Default, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state;
			var filterText = _state.filterText;
			var showMore = _state.showMore;
			var _props = this.props;
			var facet = _props.facet;
			var selected = _props.selected;
			var isCollapsed = _props.isCollapsed;
			var toggleDisplay = _props.toggleDisplay;
			var limit = _props.limit;
			var values = facet.values;

			/* Lowercase */

			var filter = filterText.toLowerCase();

			var originalSize = values.length;

			/* Filter values */

			values = values.filter(function (item) {
				return item.name.match(new RegExp(filter, 'i'));
			});

			var size = values.length;

			/**
    * Helper method to check if the checkbox should be `checked`		 
    */
			var isSelected = function isSelected(name) {
				return selected.indexOf(name) > -1;
			};

			var klass = (0, _classnames2['default'])({
				'ola-facet': true,
				'ola-facet-collapsed': isCollapsed
			});

			var filterInput = originalSize > limit ? _react2['default'].createElement('input', {
				type: 'text',
				className: 'ola-text-input ola-facet-filter-input',
				value: filterText,
				placeholder: 'Filter',
				'arial-label': 'Input',
				onChange: this.onChangeFilterText
			}) : null;

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
					filterInput,
					_react2['default'].createElement(
						'div',
						{ className: 'ola-facet-list' },
						_react2['default'].createElement(
							'div',
							{ className: 'ola-facet-scroll-list' },
							_react2['default'].createElement(_reactList2['default'], {
								itemRenderer: function (index, key) {
									var _values$index = values[index];
									var name = _values$index.name;
									var count = _values$index.count;

									var handleAddFacet = _this2.handleAddFacet.bind(_this2, facet, name);
									var handleRemoveFacet = _this2.handleRemoveFacet.bind(_this2, facet, name);
									var isActive = isSelected(name);
									var labelKlass = (0, _classnames2['default'])({
										'ola-checkbox ola-checkbox-label': true,
										'ola-checkbox-active': isActive
									});

									return _react2['default'].createElement(
										'label',
										{ className: labelKlass, key: index },
										_react2['default'].createElement('input', {
											type: 'checkbox',
											checked: isActive,
											onChange: function (event) {
												if (event.target.checked) {
													handleAddFacet();
												} else {
													handleRemoveFacet();
												}
											}
										}),
										name,
										_react2['default'].createElement(
											'span',
											{ className: 'ola-search-facet-count' },
											count
										)
									);
								},
								length: size,
								type: 'variable'
							})
						)
					)
				)
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			limit: 6
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			dispatch: _react2['default'].PropTypes.func.isRequired,
			selected: _react2['default'].PropTypes.array.isRequired,
			facet: _react2['default'].PropTypes.object.isRequired
		},
		enumerable: true
	}, {
		key: 'displayName',
		value: "DefaultCheckbox",
		enumerable: true
	}]);

	var _Default = Default;
	Default = (0, _decoratorsOlaFacetToggle.FacetToggle)(Default) || Default;
	return Default;
})(_react2['default'].Component);

exports['default'] = Default;
module.exports = exports['default'];
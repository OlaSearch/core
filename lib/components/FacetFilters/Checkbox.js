'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Default = function (_React$Component) {
	_inherits(Default, _React$Component);

	function Default(props) {
		_classCallCheck(this, Default);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Default).call(this, props));

		_this.handleAddFacet = function (facet, value) {

			_this.setState({
				filterText: ''
			});

			_this.props.dispatch((0, _Search.addFacet)(facet, value));

			_this.props.dispatch((0, _Search.executeSearch)());
		};

		_this.handleRemoveFacet = function (facet, value) {

			_this.props.dispatch((0, _Search.removeFacet)(facet, value));

			_this.props.dispatch((0, _Search.executeSearch)());
		};

		_this.onChangeFilterText = function (event) {

			_this.setState({
				filterText: event.target.value
			});
		};

		_this.state = {
			filterText: '',
			showMore: false
		};
		return _this;
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
			var listType = _props.listType;
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

			var klass = (0, _classnames2.default)({
				'ola-facet': true,
				'ola-facet-collapsed': isCollapsed
			});

			var filterInput = originalSize > limit ? _react2.default.createElement('input', {
				type: 'text',
				className: 'ola-text-input ola-facet-filter-input',
				value: filterText,
				placeholder: 'Filter',
				'arial-label': 'Input',
				onChange: this.onChangeFilterText
			}) : null;

			return _react2.default.createElement(
				'div',
				{ className: klass },
				_react2.default.createElement(
					'h4',
					{ className: 'ola-facet-title', onClick: toggleDisplay },
					facet.displayName
				),
				_react2.default.createElement(
					'div',
					{ className: 'ola-facet-wrapper' },
					filterInput,
					_react2.default.createElement(
						'div',
						{ className: 'ola-facet-list' },
						_react2.default.createElement(
							'div',
							{ className: 'ola-facet-scroll-list' },
							_react2.default.createElement(_reactList2.default, {
								itemRenderer: function itemRenderer(index, key) {
									var _values$index = values[index];
									var name = _values$index.name;
									var count = _values$index.count;

									var handleAddFacet = _this2.handleAddFacet.bind(_this2, facet, name);
									var handleRemoveFacet = _this2.handleRemoveFacet.bind(_this2, facet, name);
									var isActive = isSelected(name);
									var labelKlass = (0, _classnames2.default)({
										'ola-checkbox ola-checkbox-label': true,
										'ola-checkbox-active': isActive
									});

									return _react2.default.createElement(
										'label',
										{ className: labelKlass, key: index },
										_react2.default.createElement('input', {
											type: 'checkbox',
											checked: isActive,
											onChange: function onChange(event) {
												if (event.target.checked) {
													handleAddFacet();
												} else {
													handleRemoveFacet();
												}
											}
										}),
										name,
										_react2.default.createElement(
											'span',
											{ className: 'ola-search-facet-count' },
											count
										)
									);
								},
								length: size,
								type: listType
							})
						)
					)
				)
			);
		}
	}]);

	return Default;
}(_react2.default.Component);

Default.defaultProps = {
	limit: 6,
	listType: 'uniform'
};
Default.propTypes = {
	dispatch: _react2.default.PropTypes.func.isRequired,
	selected: _react2.default.PropTypes.array.isRequired,
	facet: _react2.default.PropTypes.object.isRequired
};
Default.displayName = "DefaultCheckbox";


module.exports = (0, _OlaFacetToggle.FacetToggle)(Default);
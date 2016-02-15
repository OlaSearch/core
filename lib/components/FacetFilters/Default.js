'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _Tag = require('./../Misc/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

		_this.handleRemoveFacat = function (facet, value) {

			_this.props.dispatch((0, _Search.removeFacet)(facet, value));

			_this.props.dispatch((0, _Search.executeSearch)());
		};

		_this.toggleshowMore = function () {

			_this.setState({
				showMore: !_this.state.showMore
			});
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
			var limit = _props.limit;
			var selected = _props.selected;
			var isCollapsed = _props.isCollapsed;
			var toggleDisplay = _props.toggleDisplay;
			var showMoreText = _props.showMoreText;
			var showLessText = _props.showLessText;
			var values = facet.values;

			/* Lowercase */

			var filter = filterText.toLowerCase();

			/* Filter values */

			values = values.filter(function (item) {
				return item.name.match(new RegExp(filter, 'i'));
			}).filter(function (item) {
				return selected.indexOf(item.name) == -1;
			});

			var size = values.length;

			/* Should display show more link */

			var shouldDisplayShowMore = size > limit;

			/* Show more */

			if (!showMore) values = values.slice(0, limit);

			var showMoreLink = shouldDisplayShowMore ? _react2.default.createElement(
				'button',
				{ className: 'ola-link-show-more', onClick: this.toggleshowMore },
				showMore ? showLessText : showMoreText
			) : null;

			var klass = (0, _classnames2.default)({
				'ola-facet': true,
				'ola-facet-collapsed': isCollapsed
			});

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
					_react2.default.createElement('input', {
						type: 'text',
						className: 'ola-text-input ola-facet-filter-input',
						value: filterText,
						placeholder: 'Filter',
						'arial-label': 'Input',
						onChange: this.onChangeFilterText
					}),
					_react2.default.createElement(
						'div',
						{ className: 'ola-facet-tags-selected' },
						selected.map(function (item, idx) {

							var removeFacet = _this2.handleRemoveFacat.bind(_this2, facet, item);

							return _react2.default.createElement(_Tag2.default, {
								onRemove: removeFacet,
								name: item,
								facet: facet,
								key: idx
							});
						})
					),
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

									return _react2.default.createElement(
										'button',
										{
											className: 'ola-facet-link',
											type: 'button',
											key: key,
											onClick: handleAddFacet
										},
										_react2.default.createElement(
											'span',
											{ className: 'ola-search-facet-count' },
											count
										),
										_react2.default.createElement(
											'span',
											{ className: 'ola-search-facet-name' },
											name
										)
									);
								},
								length: values.length,
								type: 'uniform'
							})
						),
						showMoreLink
					)
				)
			);
		}
	}]);

	return Default;
}(_react2.default.Component);

Default.propTypes = {
	dispatch: _react2.default.PropTypes.func.isRequired,
	selected: _react2.default.PropTypes.array.isRequired,
	facet: _react2.default.PropTypes.object.isRequired,
	limit: _react2.default.PropTypes.number.isRequired
};
Default.defaultProps = {
	limit: 5,
	showMoreText: 'Show more',
	showLessText: 'Show fewer'
};


module.exports = (0, _OlaFacetToggle.FacetToggle)(Default);
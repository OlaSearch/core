'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _Tag = require('./Misc/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Tooltip = require('./Guide/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedFilters = function (_React$Component) {
	_inherits(SelectedFilters, _React$Component);

	function SelectedFilters(props) {
		_classCallCheck(this, SelectedFilters);

		/* Parse queryString to get the referrer */

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectedFilters).call(this, props));

		_this.handleRemoveFacet = function (facet, value) {

			_this.props.dispatch((0, _Search.removeFacet)(facet, value));

			_this.props.dispatch((0, _Search.executeSearch)());
		};

		_this.closeGuidePopover = function () {

			_this.setState({
				showGuidePopover: false
			});
		};

		var qString = _queryString2.default.parse(location.search);

		_this.state = {
			showGuidePopover: !!qString.referrer
		};
		return _this;
	}

	_createClass(SelectedFilters, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var facets = _props.facets;
			var showQuery = _props.showQuery;
			var q = _props.q;
			var dispatch = _props.dispatch;
			var showGuidePopover = this.state.showGuidePopover;


			return _react2.default.createElement(
				'div',
				{ className: 'ola-facet-tags' },
				_react2.default.createElement(_Tooltip2.default, {
					isShown: showGuidePopover,
					onClose: this.closeGuidePopover
				}),
				showQuery && q ? _react2.default.createElement(
					'div',
					{ className: 'ola-facet-tag' },
					_react2.default.createElement(
						'span',
						{ className: 'ola-facet-tag-name' },
						q
					),
					_react2.default.createElement('button', { className: 'ola-facet-tag-remove', onClick: function onClick() {

							dispatch((0, _Search.clearQueryTerm)());
							dispatch((0, _Search.executeSearch)());
						} })
				) : null,
				facets.map(function (facet, idx) {
					var tags = facet.selected;
					var type = facet.type;
					var label = facet.label;


					return _react2.default.createElement(
						'div',
						{ key: idx, className: 'ola-facet-tags-group' },
						_react2.default.createElement(
							'span',
							{ className: 'ola-facet-tags-heading' },
							facet.displayName,
							': '
						),
						tags.map(function (value, index) {

							var removeFacet = _this2.handleRemoveFacet.bind(_this2, facet, value);

							return _react2.default.createElement(_Tag2.default, {
								key: index,
								onRemove: removeFacet,
								name: value,
								facet: facet
							});
						})
					);
				})
			);
		}
	}]);

	return SelectedFilters;
}(_react2.default.Component);

SelectedFilters.defaultProps = {
	showQuery: false
};


module.exports = SelectedFilters;
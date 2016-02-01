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

var _actionsSearch = require('./../actions/Search');

var _MiscTag = require('./Misc/Tag');

var _MiscTag2 = _interopRequireDefault(_MiscTag);

var _GuideTooltip = require('./Guide/Tooltip');

var _GuideTooltip2 = _interopRequireDefault(_GuideTooltip);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var SelectedFilters = (function (_React$Component) {
	_inherits(SelectedFilters, _React$Component);

	function SelectedFilters(props) {
		var _this = this;

		_classCallCheck(this, SelectedFilters);

		_get(Object.getPrototypeOf(SelectedFilters.prototype), 'constructor', this).call(this, props);

		/* Parse queryString to get the referrer */

		this.closeGuidePopover = function () {

			_this.setState({
				showGuidePopover: false
			});
		};

		var qString = _queryString2['default'].parse(location.search);

		this.state = {
			showGuidePopover: !!qString.referrer
		};
	}

	_createClass(SelectedFilters, [{
		key: 'handleRemoveFacat',
		value: function handleRemoveFacat(facet, value) {

			this.props.dispatch((0, _actionsSearch.removeFacet)(facet, value));

			this.props.dispatch((0, _actionsSearch.executeSearch)());
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var facets = _props.facets;
			var showQuery = _props.showQuery;
			var q = _props.q;
			var dispatch = _props.dispatch;
			var showGuidePopover = this.state.showGuidePopover;

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-facet-tags' },
				_react2['default'].createElement(_GuideTooltip2['default'], {
					isShown: showGuidePopover,
					onClose: this.closeGuidePopover
				}),
				showQuery && q ? _react2['default'].createElement(
					'div',
					{ className: 'ola-facet-tag' },
					_react2['default'].createElement(
						'span',
						{ className: 'ola-facet-tag-name' },
						q
					),
					_react2['default'].createElement('button', { className: 'ola-facet-tag-remove', onClick: function () {

							dispatch((0, _actionsSearch.clearQueryTerm)());
							dispatch((0, _actionsSearch.executeSearch)());
						} })
				) : null,
				facets.map(function (facet, idx) {
					var tags = facet.selected;
					var type = facet.type;
					var label = facet.label;

					return _react2['default'].createElement(
						'div',
						{ key: idx, className: 'ola-facet-tags-group' },
						_react2['default'].createElement(
							'span',
							{ className: 'ola-facet-tags-heading' },
							facet.displayName,
							': '
						),
						tags.map(function (value, index) {

							var removeFacet = _this2.handleRemoveFacat.bind(_this2, facet, value);

							return _react2['default'].createElement(_MiscTag2['default'], {
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
	}], [{
		key: 'defaultProps',
		value: {
			showQuery: false
		},
		enumerable: true
	}]);

	return SelectedFilters;
})(_react2['default'].Component);

exports['default'] = SelectedFilters;
module.exports = exports['default'];
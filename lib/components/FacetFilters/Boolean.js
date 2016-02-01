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

var FacetBoolean = (function (_React$Component) {
	_inherits(FacetBoolean, _React$Component);

	function FacetBoolean() {
		var _this = this;

		_classCallCheck(this, _FacetBoolean);

		_get(Object.getPrototypeOf(_FacetBoolean.prototype), 'constructor', this).apply(this, arguments);

		this.onChange = function (facet, event) {
			var dispatch = _this.props.dispatch;

			if (event.target.checked) {

				dispatch((0, _actionsSearch.replaceFacet)(facet, 'true'));
			} else {

				dispatch((0, _actionsSearch.removeFacet)(facet, 'true'));
			}

			dispatch((0, _actionsSearch.executeSearch)());
		};
	}

	_createClass(FacetBoolean, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var facet = _props.facet;
			var selected = _props.selected;

			if (!facet.values.length) return null;

			var displayName = facet.displayName;

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-facet' },
				_react2['default'].createElement(
					'h4',
					{ className: 'ola-facet-title' },
					displayName
				),
				_react2['default'].createElement(
					'label',
					{ className: 'ola-checkbox ola-checkbox-label' },
					_react2['default'].createElement('input', {
						type: 'checkbox',
						checked: !!selected.length,
						onChange: function (event) {

							_this2.onChange.call(_this2, facet, event);
						}
					}),
					displayName
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			dispatch: _react2['default'].PropTypes.func.isRequired,
			facet: _react2['default'].PropTypes.object.isRequired,
			selected: _react2['default'].PropTypes.array.isRequired
		},
		enumerable: true
	}]);

	var _FacetBoolean = FacetBoolean;
	FacetBoolean = (0, _decoratorsOlaFacetToggle.FacetToggle)(FacetBoolean) || FacetBoolean;
	return FacetBoolean;
})(_react2['default'].Component);

exports['default'] = FacetBoolean;
module.exports = exports['default'];
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Guide = require('./../../actions/Guide');

var _Question = require('./Question');

var _Question2 = _interopRequireDefault(_Question);

var _urlSync = require('./../../services/urlSync');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Guide = function (_React$Component) {
	_inherits(Guide, _React$Component);

	function Guide(props) {
		_classCallCheck(this, Guide);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Guide).call(this, props));

		_this.onContinue = function () {
			var dispatch = _this.props.dispatch;

			dispatch((0, _Guide.incrementIndex)());

			_this.invokeSearch();
		};

		_this.handleChange = function (facet, value, idx) {

			_this.props.dispatch((0, _Guide.replaceFacet)(facet, value));

			var index = _this.props.Guide.index;

			if (idx != index) {

				/* Clear all the selected facets */

				if (idx < index) {
					_this.props.dispatch((0, _Guide.clearFacetAfterIndex)(idx));
				}

				_this.invokeSearch(idx + 1);
			}
		};

		_this.onHandleSearch = function () {
			var facet_query = _this.props.Guide.query.facet_query;

			window.location.href = _this.props.searchUrl + (0, _urlSync.buildQueryString)({ facet_query: facet_query, referrer: 'guide' });
		};

		return _this;
	}

	_createClass(Guide, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var config = this.context.config;
			var _props = this.props;
			var dispatch = _props.dispatch;
			var name = _props.name;

			if (!config.guides.hasOwnProperty(name)) throw new Error('Guide error: Cannot find ' + name + ' in config file');

			var questions = config.guides[name].filter(function (facet) {
				return !!facet.question;
			});

			var fields = questions.map(function (q) {
				return q.name;
			});

			dispatch((0, _Guide.initGuide)({ questions: questions, fields: fields }));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {

			if (this.props.Guide.facets.length != prevProps.Guide.facets.length) {

				this.invokeSearch();
			}
		}
	}, {
		key: 'invokeSearch',
		value: function invokeSearch() {
			var activeIndex = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var _props2 = this.props;
			var dispatch = _props2.dispatch;
			var Guide = _props2.Guide;
			var facets = Guide.facets;
			var index = Guide.index;

			if (!facets.length) {
				console.warn('No facets for guide');
				return;
			}

			var idx = activeIndex != null ? activeIndex : index;

			var currentFl = facets[idx].name;

			dispatch((0, _Guide.executeSearch)({ fl: currentFl, index: idx }));
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props$Guide = this.props.Guide;
			var facets = _props$Guide.facets;
			var index = _props$Guide.index;
			var _props3 = this.props;
			var Device = _props3.Device;
			var btnContinueText = _props3.btnContinueText;
			var btnSubmitText = _props3.btnSubmitText;

			var size = facets.length;
			var list = facets.filter(function (facet, idx) {
				return idx <= index;
			});
			var isLastIndex = index == size - 1;

			return _react2.default.createElement(
				'div',
				{ className: 'ola-guide' },
				list.map(function (item, idx) {

					return _react2.default.createElement(_Question2.default, {
						item: item,
						key: idx,
						index: idx,
						onChange: _this2.handleChange,
						active: idx === index,
						device: Device
					});
				}),
				isLastIndex ? _react2.default.createElement(
					'button',
					{
						className: 'ola-btn ola-btn-primary',
						onClick: this.onHandleSearch
					},
					btnSubmitText
				) : _react2.default.createElement(
					'button',
					{
						className: 'ola-btn ola-btn-primary',
						onClick: this.onContinue
					},
					btnContinueText
				)
			);
		}
	}]);

	return Guide;
}(_react2.default.Component);

Guide.propTypes = {
	index: _react2.default.PropTypes.number,
	searchUrl: _react2.default.PropTypes.string
};
Guide.defaultProps = {
	searchUrl: 'search.html?',
	btnContinueText: 'Continue',
	btnSubmitText: 'Search'
};
Guide.contextTypes = {
	config: _react2.default.PropTypes.object
};

function mapStateToProps(state) {

	return {
		Guide: state.Guide,
		Device: state.Device
	};
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(Guide);
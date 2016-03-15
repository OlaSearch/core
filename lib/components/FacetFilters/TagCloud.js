'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var TagCloud = function (_React$Component) {
    _inherits(TagCloud, _React$Component);

    function TagCloud() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TagCloud);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TagCloud)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleAddFacet = function (facet, value) {
            var dispatch = _this.props.dispatch;


            dispatch((0, _Search.addFacet)(facet, value));

            dispatch((0, _Search.executeSearch)());
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TagCloud, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var facet = _props.facet;
            var selected = _props.selected;
            var isCollapsed = _props.isCollapsed;
            var toggleDisplay = _props.toggleDisplay;
            var fontSizeMin = _props.fontSizeMin;
            var fontSizeMax = _props.fontSizeMax;
            var showSelectedFacetItem = _props.showSelectedFacetItem;
            var values = facet.values;

            var counts = values.map(function (value) {
                return value.count;
            });
            var max = Math.max.apply(this, counts);
            var min = Math.min.apply(this, counts);

            var klass = (0, _classnames2['default'])({
                'ola-facet': true,
                'ola-facet-collapsed': isCollapsed
            });

            if (!showSelectedFacetItem) values = values.filter(function (item) {
                return selected.indexOf(item.name) == -1;
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
                    values.map(function (value, idx) {
                        var name = value.name;
                        var count = value.count;

                        var size = count == min ? fontSizeMin : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin;
                        var handleAddFacet = _this2.handleAddFacet.bind(_this2, facet, name);

                        return _react2['default'].createElement(
                            'button',
                            { className: 'ola-btn-tag', key: idx, style: { fontSize: size + 'px' }, onClick: handleAddFacet },
                            name
                        );
                    })
                )
            );
        }
    }]);

    return TagCloud;
}(_react2['default'].Component);

TagCloud.defaultProps = {
    fontSizeMin: 16,
    fontSizeMax: 24,
    showSelectedFacetItem: false
};
;

module.exports = (0, _OlaFacetToggle.FacetToggle)(TagCloud);
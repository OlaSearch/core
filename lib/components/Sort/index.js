'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _ref = _react2['default'].createElement(
  'option',
  { value: '' },
  'Relevance'
);

var Sort = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Sort, _React$Component);

  function Sort() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Sort);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Sort)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.changeSort)(event.target.value));
      dispatch((0, _Search.executeSearch)());
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Sort, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var sortBy = this.context.config.sortBy;
      var _props = this.props;
      var selected = _props.selected;
      var translate = _props.translate;


      return _react2['default'].createElement(
        'div',
        { className: 'ola-sort' },
        _react2['default'].createElement(
          'label',
          null,
          translate('sort_label'),
          ' '
        ),
        _react2['default'].createElement(
          'select',
          {
            className: 'ola-sort-select',
            value: selected,
            onChange: this.handleChange
          },
          _ref,
          sortBy.map(function (sort, idx) {
            return _react2['default'].createElement(
              'option',
              { key: idx, value: sort.value },
              sort.name
            );
          })
        )
      );
    }
  }]);

  return Sort;
}(_react2['default'].Component);

Sort.contextTypes = {
  config: _react2['default'].PropTypes.object
};


module.exports = (0, _OlaTranslate2['default'])(Sort);
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _reactList = require('react-list');

var _reactList2 = require('../../../.babelhelper.js').interopRequireDefault(_reactList);

var _utilities = require('./../../utilities');

var _FilterInput = require('./common/FilterInput');

var _FilterInput2 = require('../../../.babelhelper.js').interopRequireDefault(_FilterInput);

var CheckboxFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(CheckboxFilter, _React$Component);

  function CheckboxFilter(props) {
    require('../../../.babelhelper.js').classCallCheck(this, CheckboxFilter);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxFilter).call(this, props));

    _this.handleAddFacet = function (value) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var facet = _this$props.facet;


      _this.setState({
        filterText: ''
      });

      /**
       * Allows only single selection
       * @param  {[type]} facet.allowSingleSelection
       * @return {[type]}
       */
      if (facet.allowSingleSelection) {
        dispatch((0, _Search.replaceFacet)(facet, value));
      } else {
        dispatch((0, _Search.addFacet)(facet, value));
      }
      dispatch((0, _Search.executeSearch)());
    };

    _this.handleRemoveFacet = function (value) {
      var _this$props2 = _this.props;
      var dispatch = _this$props2.dispatch;
      var facet = _this$props2.facet;

      dispatch((0, _Search.removeFacet)(facet, value));
      dispatch((0, _Search.executeSearch)());
    };

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: event.target.value
      });
    };

    _this.isSelected = function (name) {
      return _this.props.selected.indexOf(name) > -1;
    };

    _this.itemRenderer = function (values, index, key) {
      var facetNames = _this.props.facet.facetNames;
      var _values$index = values[index];
      var name = _values$index.name;
      var count = _values$index.count;

      var displayName = (0, _utilities.getDisplayName)(facetNames, name);
      var isActive = _this.isSelected(name);

      return _react2['default'].createElement(CheckBoxItem, {
        key: index,
        name: name,
        displayName: displayName,
        count: count,
        handleAddFacet: _this.handleAddFacet,
        handleRemoveFacet: _this.handleRemoveFacet,
        isActive: isActive
      });
    };

    _this.state = {
      filterText: '',
      showMore: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(CheckboxFilter, [{
    key: 'render',
    value: function render() {
      var filterText = this.state.filterText;
      var _props = this.props;
      var facet = _props.facet;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var limit = _props.limit;
      var listType = _props.listType;
      var translate = _props.translate;
      var values = facet.values;
      var displayName = facet.displayName;
      var allowSingleSelection = facet.allowSingleSelection;
      var allowedNames = facet.allowedNames;

      /* Remove values with no name or name doesnt match allowedNames */

      values = values.filter(function (value) {
        return value.name && (allowedNames ? allowedNames.indexOf(value.name) !== -1 : true);
      });

      var originalSize = values.length;

      /* Filter values */

      values = values.filter(function (item) {
        return item.name.toString().match(new RegExp(filterText, 'i'));
      });

      var size = values.length;
      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed,
        'ola-facet-single-select': allowSingleSelection
      });
      var filterInput = originalSize > limit ? _react2['default'].createElement(_FilterInput2['default'], {
        value: filterText,
        onChange: this.onChangeFilterText,
        placeholder: translate('facet_filter_placeholder')
      }) : null;
      var itemRendererBound = this.itemRenderer.bind(this, values);

      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          displayName
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
                itemRenderer: itemRendererBound,
                length: size,
                type: listType
              })
            )
          )
        )
      );
    }
  }]);

  return CheckboxFilter;
}(_react2['default'].Component);

/**
 * Checkbox Item
 * JSX No Bind
 */


CheckboxFilter.defaultProps = {
  limit: 6,
  listType: 'uniform'
};

var CheckBoxItem = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(CheckBoxItem, _React$Component2);

  function CheckBoxItem() {
    var _Object$getPrototypeO;

    var _temp, _this2, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, CheckBoxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CheckBoxItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.onChecked = function (event) {
      var _this2$props = _this2.props;
      var name = _this2$props.name;
      var handleAddFacet = _this2$props.handleAddFacet;
      var handleRemoveFacet = _this2$props.handleRemoveFacet;

      if (event.target.checked) {
        handleAddFacet(name);
      } else {
        handleRemoveFacet(name);
      }
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this2, _ret);
  }

  require('../../../.babelhelper.js').createClass(CheckBoxItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var isActive = _props2.isActive;
      var count = _props2.count;
      var displayName = _props2.displayName;

      var labelKlass = (0, _classnames2['default'])({
        'ola-checkbox ola-checkbox-label': true,
        'ola-checkbox-active': isActive
      });
      return _react2['default'].createElement(
        'label',
        { className: labelKlass },
        _react2['default'].createElement('input', {
          type: 'checkbox',
          checked: isActive,
          onChange: this.onChecked
        }),
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-name', title: displayName },
          displayName
        ),
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-count' },
          count
        )
      );
    }
  }]);

  return CheckBoxItem;
}(_react2['default'].Component);

module.exports = (0, _olaTranslate2['default'])((0, _OlaFacetToggle2['default'])(CheckboxFilter));
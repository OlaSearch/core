'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var AnswerCard = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AnswerCard, _React$Component);

  function AnswerCard() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, AnswerCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AnswerCard)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSelect = function () {
      if (_this.props.result.hasOwnProperty('additional_data')) return _this.props.onSelect(_this.props.result);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(AnswerCard, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var result = _props.result;
      var cdn = _props.cdn;
      var imagePlaceholder = _props.imagePlaceholder;
      var isActive = _props.isActive;
      var module = _props.module;
      var image = result.image;
      var description = result.description;
      var subtitle = result.subtitle;
      var title = result.title;
      var exists = result.exists;

      var isClickable = !!result.additional_data;
      if (module === 'spices.facts.place.capital') {
        image = image.length > 1 ? image[1] : image;
      }
      var klass = (0, _classnames2['default'])('ola-answer-item', {
        'ola-answer-item-active': isActive,
        'ola-answer-item-isSelectable': isClickable,
        'ola-answer-item-deActive': !exists
      });
      image = image || imagePlaceholder;
      var bgImage = image ? (0, _utilities.isSvg)(image) ? image : '' + (cdn ? cdn + '/' : '') + image : null;
      return _react2['default'].createElement(
        'div',
        { className: klass, onClick: this.handleSelect },
        image ? _react2['default'].createElement('div', { className: 'ola-answer-image', style: {
            backgroundImage: 'url("' + bgImage + '")'
          } }) : null,
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-content' },
          _react2['default'].createElement(
            'h3',
            { className: 'ola-answer-title' },
            title
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-answer-subtitle' },
            subtitle || description
          )
        )
      );
    }
  }]);

  return AnswerCard;
}(_react2['default'].Component);

module.exports = AnswerCard;
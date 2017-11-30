'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = AnswerCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AnswerCard(_ref) {
  var result = _ref.result,
      onSelect = _ref.onSelect,
      cdn = _ref.cdn,
      imagePlaceholder = _ref.imagePlaceholder,
      isActive = _ref.isActive,
      module = _ref.module;

  function handleSelect() {
    if (result.hasOwnProperty('additional_data')) return onSelect(result);
  }

  var image = result.image,
      subtitle = result.subtitle,
      title = result.title,
      exists = result.exists;

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
    { className: klass, onClick: handleSelect },
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
        subtitle
      )
    )
  );
}
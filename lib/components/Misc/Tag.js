'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../../utilities');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _Settings = require('./../../constants/Settings');

var _x = require('@olasearch/icons/lib/x');

var _x2 = _interopRequireDefault(_x);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref = _react2['default'].createElement(_x2['default'], { size: 16 });

function Tag(props) {
  var displayName = '';
  var name = props.name,
      onRemove = props.onRemove,
      facet = props.facet;
  var type = facet.type,
      label = facet.label,
      _facet$template = facet.template,
      template = _facet$template === undefined ? _Settings.DEFAULT_RANGE_TEMPLATE : _facet$template,
      facetNames = facet.facetNames,
      _facet$dateFormat = facet.dateFormat,
      dateFormat = _facet$dateFormat === undefined ? _Settings.DEFAULT_DISPLAY_DATE_FORMAT : _facet$dateFormat,
      interval = facet.interval;


  switch (type) {
    case 'range':
    case 'daterange':
    case 'datepicker':
      if (typeof name === 'string') {
        displayName = name;
      } else {
        var from = name[0],
            to = name[1];
        /* All dates will be in UTC */

        displayName = (0, _utilities.supplant)(template, {
          from: type !== _Settings.NUMERICAL_RANGE && dateFormat ? _dateParser2['default'].formatUTC(from, dateFormat, 'from') : from,
          to: type !== _Settings.NUMERICAL_RANGE && dateFormat ? _dateParser2['default'].formatUTC(to, dateFormat, 'to') : to,
          name: facet.displayName || facet.name
        });
      }
      break;

    case 'rating':
      var index = name[0] / interval;
      displayName = label[index];
      break;

    case 'geo_distance':
      displayName = facet.displayName || name;
      break;

    case 'boolean':
      displayName = facet.valueDisplayName || (0, _utilities.getDisplayName)(facetNames, name);
      break;

    default:
      displayName = (0, _utilities.getDisplayName)(facetNames, name);
      break;
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-facet-tag' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-facet-tag-name' },
      displayName
    ),
    _react2['default'].createElement(
      'button',
      { className: 'ola-facet-tag-remove', onClick: onRemove },
      _react2['default'].createElement(
        'span',
        null,
        props.buttonLabel
      ),
      _ref
    )
  );
}

Tag.defaultProps = {
  buttonLabel: 'Remove'
};

module.exports = Tag;
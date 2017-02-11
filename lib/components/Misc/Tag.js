'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = require('../../../.babelhelper.js').interopRequireDefault(_dateParser);

var Tag = function Tag(props) {
  var displayName = '';
  var name = props.name,
      onRemove = props.onRemove,
      facet = props.facet;
  var type = facet.type,
      label = facet.label,
      template = facet.template,
      facetNames = facet.facetNames,
      dateFormat = facet.dateFormat,
      interval = facet.interval;


  switch (type) {
    case 'range':
    case 'daterange':
    case 'datepicker':
      if (typeof name === 'string') {
        displayName = name;
      } else {
        var _name = require('../../../.babelhelper.js').slicedToArray(name, 2),
            from = _name[0],
            to = _name[1];

        displayName = (0, _utilities.supplant)(template, {
          from: dateFormat ? _dateParser2['default'].format(from, dateFormat) : from,
          to: dateFormat ? _dateParser2['default'].format(to, dateFormat) : to
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
      )
    )
  );
};

Tag.defaultProps = {
  buttonLabel: 'Remove'
};

module.exports = Tag;
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = require('../../../.babelhelper.js').interopRequireDefault(_dateParser);

var Tag = function Tag(props) {
  var displayName = '';
  var name = props.name;
  var onRemove = props.onRemove;
  var facet = props.facet;
  var type = facet.type;
  var label = facet.label;
  var template = facet.template;
  var facetNames = facet.facetNames;
  var dateFormat = facet.dateFormat;
  var interval = facet.interval;


  switch (type) {
    case 'range':
      if (typeof name === 'string') {
        displayName = name;
      } else {
        var _name = require('../../../.babelhelper.js').slicedToArray(name, 2);

        var _from = _name[0];
        var _to = _name[1];

        displayName = (0, _utilities.supplant)(template, { from: _from, to: _to });
      }
      break;

    case 'daterange':
      var _name2 = require('../../../.babelhelper.js').slicedToArray(name, 2);

      var from = _name2[0];
      var to = _name2[1];

      var fromDate = isNaN(from) ? from : new Date(parseInt(from));
      var toDate = isNaN(to) ? to : new Date(parseInt(to));
      displayName = (0, _utilities.supplant)(template, {
        from: _dateParser2['default'].format(fromDate, dateFormat),
        to: _dateParser2['default'].format(toDate, dateFormat)
      });
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
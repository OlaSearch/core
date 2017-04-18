'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../../utilities');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
        var _name = _slicedToArray(name, 2),
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
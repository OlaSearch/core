'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tag = function Tag(props, context) {
  var displayName = '';
  var name = props.name;
  var onRemove = props.onRemove;
  var facet = props.facet;
  var type = facet.type;
  var label = facet.label;
  var template = facet.template;
  var dateFormat = context.config.dateFormat;


  switch (type) {
    case 'range':
      if (typeof name === 'string') {
        displayName = name;
      } else {
        var _name = _slicedToArray(name, 2);

        var _from = _name[0];
        var _to = _name[1];

        displayName = (0, _utilities.supplant)(template, { from: _from, to: _to });
      }
      break;

    case 'daterange':
      var _name2 = _slicedToArray(name, 2);

      var from = _name2[0];
      var to = _name2[1];

      var fromDate = new Date(parseInt(from));
      var toDate = new Date(parseInt(to));

      displayName = (0, _utilities.supplant)(template, {
        from: _dateParser2['default'].format(fromDate, dateFormat),
        to: _dateParser2['default'].format(toDate, dateFormat)
      });
      break;

    case 'rating':
      var index = name[0] / 20;
      displayName = label[index];
      break;

    case 'geo_distance':
      displayName = name;
      break;

    case 'boolean':
      displayName = facet.valueDisplayName || (0, _utilities.getDisplayName)(context.config.facetNames, name);
      break;

    default:
      displayName = (0, _utilities.getDisplayName)(context.config.facetNames, name);
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
        'Remove'
      )
    )
  );
};

Tag.propTypes = {
  name: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.array]),
  onRemove: _react2['default'].PropTypes.func,
  facet: _react2['default'].PropTypes.object
};

Tag.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = Tag;
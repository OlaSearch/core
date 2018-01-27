'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GeoLocation = require('./Geo/GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _ClearLocation = require('./Geo/ClearLocation');

var _ClearLocation2 = _interopRequireDefault(_ClearLocation);

var _Search = require('./../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_ClearLocation2['default'], { onSuccess: _Search.executeSearch });

var _ref3 = _react2['default'].createElement(_GeoLocation2['default'], { onSuccess: _Search.executeSearch });

var GeoNotify = function GeoNotify(_ref) {
  var answer = _ref.answer,
      location = _ref.location;

  /* Does the intent require user's location */
  var suggestLocation = answer && answer.location;

  if (!suggestLocation) return null;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-location-notify' },
    location ? _ref2 : _ref3
  );
};

function mapStateToProps(state) {
  return {
    location: state.Context.location,
    answer: state.AppState.answer
  };
}

module.exports = injectTranslate(connect(mapStateToProps, { executeSearch: _Search.executeSearch })(GeoNotify));
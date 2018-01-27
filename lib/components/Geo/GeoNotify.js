'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GeoNotify = function GeoNotify(_ref) {
  var answer = _ref.answer,
      location = _ref.location,
      executeSearch = _ref.executeSearch,
      isPhone = _ref.isPhone,
      translate = _ref.translate;

  /* Does the intent require user's location */
  var suggestLocation = answer && answer.location;
  if (!suggestLocation || isPhone) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-location-notify' },
    _react2['default'].createElement(
      'span',
      null,
      location ? translate('showing_nearby_results') : translate('share_location')
    ),
    _react2['default'].createElement(_GeoLocation2['default'], { onSuccess: executeSearch })
  );
};

function mapStateToProps(state) {
  return {
    location: state.Context.location,
    answer: state.AppState.answer,
    isPhone: state.Device.isPhone
  };
}

module.exports = (0, _withTranslate2['default'])((0, _reactRedux.connect)(mapStateToProps, { executeSearch: _Search.executeSearch })(GeoNotify));
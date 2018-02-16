'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GeoLocation = require('./GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function GeoNotify(_ref) {
  var answer = _ref.answer,
      location = _ref.location,
      executeSearch = _ref.executeSearch,
      isPhone = _ref.isPhone,
      translate = _ref.translate,
      rest = (0, _objectWithoutProperties3['default'])(_ref, ['answer', 'location', 'executeSearch', 'isPhone', 'translate']);

  /* Does the intent require user's location */
  var askForLocation = answer && answer.location;
  /**
   * do we need to ask for location
   */
  if (!askForLocation && !location || isPhone) return null;
  // if (!suggestLocation || isPhone) return null
  return _react2['default'].createElement(
    'div',
    { className: 'ola-location-notify' },
    _react2['default'].createElement(
      'span',
      null,
      location ? translate('showing_nearby_results') : translate('share_location')
    ),
    _react2['default'].createElement(_GeoLocation2['default'], (0, _extends3['default'])({ onSuccess: executeSearch }, rest))
  );
}

function mapStateToProps(state) {
  return {
    location: state.Context.location,
    answer: state.AppState.answer,
    isPhone: state.Device.isPhone
  };
}

module.exports = (0, _withTranslate2['default'])((0, _reactRedux.connect)(mapStateToProps, { executeSearch: _Search.executeSearch })(GeoNotify));
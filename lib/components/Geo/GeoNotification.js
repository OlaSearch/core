'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('./../../actions/Context');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function GeoNotification(_ref) {
  var location = _ref.location,
      fieldName = _ref.fieldName,
      removeContextField = _ref.removeContextField;

  if (!location) return null;
  return _react2['default'].createElement(
    'div',
    null,
    'Showing results that are closer to your',
    _react2['default'].createElement(
      'button',
      { onClick: removeContextField },
      'Clear'
    )
  );
}

GeoNotification.defaultProps = {
  fieldName: 'location'
};

function mapStateToProps(state) {
  return {
    location: state.Context.location
  };
}

module.exprots = (0, _reactRedux.connect)(mapStateToProps, { removeContextField: _Context.removeContextField })(GeoNotification);
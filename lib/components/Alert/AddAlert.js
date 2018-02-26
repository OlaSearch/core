'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Alert = require('./../../actions/Alert');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withLogger = require('./../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AddAlert(_ref) {
  var q = _ref.q,
      queriesById = _ref.queriesById,
      queryIds = _ref.queryIds,
      translate = _ref.translate,
      createAlert = _ref.createAlert,
      deleteAlert = _ref.deleteAlert,
      log = _ref.log,
      inProgressAlert = _ref.inProgressAlert,
      logPayload = _ref.logPayload;

  if (!q) return null;
  var exists = queryIds.some(function (id) {
    return q === queriesById[id].query;
  });
  var classes = (0, _classnames2['default'])('ola-alert-add', {
    'ola-alert-add-disabled': exists
  });
  function handleClick() {
    var queryId = void 0;
    if (exists) {
      queryId = queryIds.filter(function (id) {
        return q === queriesById[id].query;
      }).reduce(function (acc, obj) {
        return obj;
      }, null);
    }
    exists ? queryId && deleteAlert(queryId) : createAlert(q);
    /* Log */
    log({
      eventType: 'C',
      eventCategory: 'alert',
      eventAction: 'click',
      eventLabel: exists ? 'Remove' : 'Add',
      payload: logPayload
    });
  }
  return _react2['default'].createElement(
    'button',
    {
      className: classes,
      onClick: handleClick,
      disabled: inProgressAlert
    },
    exists ? translate('alert_button_remove') : translate('alert_button_add')
  );
}

function mapStateToProps(state) {
  return {
    queryIds: state.AppState.queryIds,
    queriesById: state.AppState.queriesById,
    inProgressAlert: state.AppState.inProgressAlert
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, {
  createAlert: _Alert.createAlert,
  deleteAlert: _Alert.deleteAlert
})((0, _withLogger2['default'])((0, _withTranslate2['default'])(AddAlert)));
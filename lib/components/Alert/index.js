'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _Alert = require('./../../actions/Alert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Alert = function (_React$Component) {
  (0, _inherits3['default'])(Alert, _React$Component);

  function Alert() {
    (0, _classCallCheck3['default'])(this, Alert);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  Alert.prototype.componentDidMount = function componentDidMount() {
    this.props.fetchAlerts();
  };

  Alert.prototype.render = function render() {
    var _props = this.props,
        queryIds = _props.queryIds,
        queriesById = _props.queriesById,
        deleteAlert = _props.deleteAlert;

    return _react2['default'].createElement(
      'div',
      { className: 'ola-alerts' },
      queryIds.map(function (id) {
        var _queriesById$id = queriesById[id],
            query = _queriesById$id.query,
            docIds = _queriesById$id.docIds,
            timestamp = _queriesById$id.timestamp;

        return _react2['default'].createElement(Query, {
          key: id,
          query: query,
          docs: docIds,
          timestamp: timestamp,
          id: id,
          onDelete: deleteAlert
        });
      })
    );
  };

  return Alert;
}(_react2['default'].Component);

function Query(_ref) {
  var id = _ref.id,
      query = _ref.query,
      docs = _ref.docs,
      timestamp = _ref.timestamp,
      onDelete = _ref.onDelete;

  function handleDelete() {
    onDelete(id);
  }
  var docLen = docs.length;
  var docTmpl = docLen > 0 ? '- ' + docLen + ' doc' + (docLen > 1 ? 's' : '') : null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-alerts-item' },
    _react2['default'].createElement(
      'a',
      null,
      query,
      ' ',
      docTmpl
    ),
    _react2['default'].createElement(
      'span',
      null,
      'Added on ',
      _dateParser2['default'].format(timestamp, 'D MMM YYYY')
    ),
    _react2['default'].createElement(
      'button',
      { type: 'button', onClick: handleDelete },
      'Delete query'
    )
  );
}

function mapStateToProps(state) {
  return {
    queryIds: state.AppState.queryIds,
    queriesById: state.AppState.queriesById
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, {
  fetchAlerts: _Alert.fetchAlerts,
  deleteAlert: _Alert.deleteAlert,
  createAlert: _Alert.createAlert
})(Alert);
'use strict';

var _redux = require('redux');

var _reducers = require('./../reducers');

var _reducers2 = require('../../.babelhelper.js').interopRequireDefault(_reducers);

var _createOlaMiddleware = require('./../middleware/createOlaMiddleware');

var _createOlaMiddleware2 = require('../../.babelhelper.js').interopRequireDefault(_createOlaMiddleware);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = require('../../.babelhelper.js').interopRequireDefault(_reduxThunk);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _invariant = require('invariant');

var _invariant2 = require('../../.babelhelper.js').interopRequireDefault(_invariant);

/**
 * Signature
 * createStore(
 *   config,
 *   searchProvider,
 *   reducers,
 *   middlewares,
 *   Store enhancers
 * )
 */

module.exports = function (config, searchProvider) {
  var reducers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var middlewares = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
  var enhancers = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

  if (!config) {
    throw new Error('Invalid: Could not find config while creating store in `createStore`');
  }
  if (!searchProvider) {
    throw new Error('Invalid: Could not find searchProvider while creating store in `createStore`');
  }
  /* Options that should be passed to OlaProvider */
  var Parser = searchProvider.Parser;
  var QueryBuilder = searchProvider.QueryBuilder;
  var Http = searchProvider.Http;


  if (!Parser || !QueryBuilder || !Http) {
    throw new Error('Invalid: Search adapters must contain Parser, QueryBuilder and Http prototypes');
  }
  var options = {
    config: config,
    parser: new Parser(config), /* For olaMiddleware */
    queryBuilder: new QueryBuilder(config), /* For olaMiddleware */
    searchService: new Http(config) /* For olaMiddleware */
  };
  var olaMiddleWare = (0, _createOlaMiddleware2['default'])(options);

  /* Reducer */
  var olaReducers = (0, _redux.combineReducers)(Object.assign({}, _reducers2['default'], reducers));
  var store = void 0;

  if (process.env.NODE_ENV === 'production') {
    store = (0, _redux.createStore)(olaReducers, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_reduxThunk2['default'], olaMiddleWare].concat(require('../../.babelhelper.js').toConsumableArray(middlewares)))].concat(require('../../.babelhelper.js').toConsumableArray(enhancers))));
  } else {
    var createLogger = require('redux-logger');
    var logger = createLogger({
      collapsed: true
    });
    store = (0, _redux.createStore)(olaReducers, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_reduxThunk2['default'], olaMiddleWare, logger].concat(require('../../.babelhelper.js').toConsumableArray(middlewares))), window.devToolsExtension ? window.devToolsExtension() : function (f) {
      return f;
    }].concat(require('../../.babelhelper.js').toConsumableArray(enhancers))));
  }

  /**
   * Rehydrate store
   */
  store.dispatch({
    type: _ActionTypes2['default'].OLA_REHYDRATE,
    namespace: config.namespace
  });

  return store;
};
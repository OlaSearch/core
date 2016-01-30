import { combineReducers } from 'redux';
import AppState from './AppState';
import QueryState from './QueryState';
import AutoSuggest from './AutoSuggest';
import Guide from './Guide';
import Device from './Device';
import Timestamp from './Timestamp';

export default combineReducers({
  AppState,
  QueryState,
  AutoSuggest,
  Guide,
  Device,  
  Timestamp,
})
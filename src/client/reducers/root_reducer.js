import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import index from './index_reducer'

const rootReducer = combineReducers({
  routing,
  index
});

export default rootReducer;
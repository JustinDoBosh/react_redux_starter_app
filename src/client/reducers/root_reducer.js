import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (error) {
    console.log(error);
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  errorMessage,
  routing
});

export default rootReducer;
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { api } from '../middleware/api'
import { logger, crashReporter } from '../middleware/logging'
import rootReducer from '../reducers/root_reducer'
import ReduxPromise from 'redux-promise'

function configureStore(history, initialState){
  const store =  createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      ReduxPromise,
      crashReporter,
      logger
    )
  )

  return store
}

export default configureStore

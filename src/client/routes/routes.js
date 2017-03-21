import React from 'react'
import { IndexRoute, Route, IndexRedirect, Router, Redirect, browserHistory } from 'react-router'
import App from '../containers/app'


const routes = (
  <Router history={ browserHistory}>
    <Route path="/" component={App}>
      
    </Route>
  </Router>
)

export default routes

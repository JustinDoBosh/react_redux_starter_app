import React from 'react'
import { IndexRoute, Route, IndexRedirect, Router, Redirect, browserHistory } from 'react-router'
import App from '../containers/app'
import Home from '../containers/index'

const routes = (
  <Router history={ browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    </Route>
  </Router>
)

export default routes

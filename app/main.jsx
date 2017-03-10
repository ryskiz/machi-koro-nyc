'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

import Board from './components/Board'


const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div id="parent">
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/board" />
        <Route path="/board" component={Board} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

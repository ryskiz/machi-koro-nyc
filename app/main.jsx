'use strict';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import Routes from './components/Routes';


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
      <Routes/>
  </Provider>,
  document.getElementById('main')
);

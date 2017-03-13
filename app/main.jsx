'use strict';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'


import store from './store'
import Routes from './components/Routes';

render(
  <Provider store={store}>
    <MuiThemeProvider >
      <Routes/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
);

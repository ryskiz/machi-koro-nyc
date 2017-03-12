import React from 'react';
import { connect } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {purchaseEstablishment, allPlayers} from '../basestuff';

import MenuWrap from './MenuWrap';
let Menu = require('react-burger-menu').push;
import Board from './Board';
import socketListen from '../sockets';

const App = connect(
    ({ game }) => ({ game })
)(
    ({ game, children }) =>
        <div>
            <MenuWrap wait={20}>
                <Menu id="menu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'} right>
                    <h1>Players</h1>
                    {
                        game.players.length && game.players.map((player) => {
                            return (
                                <a href="#">Player {player.index + 1}</a>
                            )
                        })
                    }
                </Menu>
            </MenuWrap>
            <main id="page-wrap">
                {children}
            </main>
        </div>
);

socketListen(socket)

const Routes = (props) => {
  return (
      <Router history={browserHistory}>
          <Route path="/" component={App}>
              <IndexRedirect to="/board" />
              <Route path="/board" component={Board}/>
          </Route>
      </Router>
  );
};


export default connect(null)(Routes);

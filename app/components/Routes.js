import React from 'react';
import { connect } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { updatePlayersArray, updateLastNumberRolled, updateNextPlayerIndexTurn, setFirstPlayerTurn, startGame, buy, receivingMoney, receiveMoney } from '../reducers/gameReducer';
import {purchaseEstablishment, allPlayers} from '../basestuff';
import Login from './Login';
import WhoAmI from './WhoAmI';
import MenuWrap from './MenuWrap';
let Menu = require('react-burger-menu').push;
import Board from './Board';
import socketListen from '../sockets';

const App = connect(
    ({ auth }) => ({ user: auth })
)(
    ({ user, children }) =>
        <div>
            <MenuWrap wait={20}>
                <Menu id="menu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'} right>
                        <a href="#">something</a>
                        <a href="#">something</a>
                        <a href="#">something</a>
                        <a href="#">something</a>
                        <a href="#">something</a>
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

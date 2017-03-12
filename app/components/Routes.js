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



const Routes = ({initialListen}) => {
  return (
      <Router history={browserHistory}>
          <Route path="/" component={App} >
              <IndexRedirect to="/board" />
              <Route path="/board" component={Board}/>
          </Route>
      </Router>
  );
};

const mapDispatch = dispatch => ({
    initialListen: function(){
        socket.on('addPlayer', (players)=> {
            dispatch(updatePlayersArray(players))
        });

        socket.on('playerRoll', (dice)=> {
            dispatch(updateLastNumberRolled(dice.roll))
        });

        socket.on('endTurn', (indices) => {
          dispatch(updateNextPlayerIndexTurn(indices.nextPlayerIndex, indices.lastPlayerIndex))
        });

        socket.on('startingPlayer', (player) => {
          alert(`The starting player will be Player ${player.index + 1}`)
          dispatch(setFirstPlayerTurn(player.index))
          dispatch(startGame())
        });

        socket.on('playerBuy', ({game, playerId, establishmentId}) => {
            let newState = purchaseEstablishment(game, playerId, establishmentId);
            dispatch(buy(newState))
        });

        socket.on('playerReceiveMoney', ({playerAmountsToChange}) => {
          playerAmountsToChange.forEach(changeObject => {
            dispatch(receiveMoney(changeObject.playerIndex, changeObject.amount))
          });
        });

    }
});


export default connect(null, mapDispatch)(Routes);

import React from 'react';
import { connect } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { updatePlayersArray, updateLastNumberRolled, updateNextPlayerIndexTurn, setFirstPlayerTurn, startGame } from '../reducers/gameReducer';
import Login from './Login';
import WhoAmI from './WhoAmI';

import Board from './Board';

const App = connect(
    ({ auth }) => ({ user: auth })
)(
    ({ user, children }) =>
        <div id="parent">
            <nav>
                {user ? <WhoAmI /> : <Login />}
            </nav>
            {children}
        </div>
);



const Routes = ({initialListen}) => {
  return (
      <Router history={browserHistory}>
          <Route path="/" component={App} onEnter={initialListen}>
              <IndexRedirect to="/board" />
              <Route path="/board" component={Board} />
          </Route>
      </Router>
  );
};

const mapDispatch = dispatch => ({
    initialListen: function(){
        socket.on('addPlayer', (players)=> {
            console.log("FUCKING PLAYERS", players);
            dispatch(updatePlayersArray(players))
        })
        socket.on('playerRoll', (dice)=> {
            console.log("FUCKING DICE", dice);
            dispatch(updateLastNumberRolled(dice.roll))
        })
        socket.on('endTurn', (indices)=> {
          dispatch(updateNextPlayerIndexTurn(indices.nextPlayerIndex, indices.lastPlayerIndex))
        })

        socket.on('startingPlayer', (player)=>{
          alert(`The starting player will be Player ${player.index + 1}`)
          dispatch(setFirstPlayerTurn(player.index))
          dispatch(startGame())
        })


    }
});


export default connect(null, mapDispatch)(Routes);

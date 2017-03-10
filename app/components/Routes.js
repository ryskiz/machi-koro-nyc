import React from 'react';
import { connect } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { updatePlayersArray } from '../reducers/gameReducer';
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
    }
})


export default connect(null, mapDispatch)(Routes);
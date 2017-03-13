import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {purchaseEstablishment, allPlayers} from '../basestuff';

import MenuWrap from './MenuWrap';
let Menu = require('react-burger-menu').push;
import Board from './Board';
import socketListen from '../sockets';


const App = connect(
    ({game}) => ({game})
)(
    ({game, children}) =>

        <div>
            <MenuWrap wait={20}>
                <Menu id="menu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'} right>
                    <h1>Players</h1>
                    {
                        game.players.length && game.players.map((player) => {
                            return (
                                <div>
                                    <h1>Player {player.index + 1}</h1>
                                    <h4>Cash: {player.wallet}</h4>
                                    <h4>------------</h4>
                                    {
                                        player.cardsInPossession.map((card) => {
                                            if (card.quantity > 0) {
                                                return (
                                                    <div>
                                                        <h5>{card.title}x{card.quantity}</h5>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
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
                <IndexRedirect to="/board"/>
                <Route path="/board" component={Board}/>
            </Route>
        </Router>
    );
};


export default connect(null)(Routes);

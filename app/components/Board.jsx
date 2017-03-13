import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {startingEstablishments, landmarks} from '../basestuff'
import {
    addPlayer,
    initialHand,
    rollTwo,
    rollOne,
    endPlayerTurn,
    startingGame,
    buyEstablishment,
    receivingMoney
} from '../reducers/gameReducer'
import Dice from './Dice';
import Card from './Card'
import { SpringGrid } from 'react-stonecutter';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.onBuyClick = this.onBuyClick.bind(this);
        this.onAddPlayerClick = this.onAddPlayerClick.bind(this);
        this.rollDice = this.rollDice.bind(this);
        this.onStartGame = this.onStartGame.bind(this);
        this.state = {
            myId: socket.id
        }
    }

    onAddPlayerClick(evt) {
        evt.preventDefault();
        if (this.props.game.players.length && this.props.game.players.length === 4) {
            alert('The game is full!')
        } else {
            if (socket.id === this.state.myId) {
                let num = this.props.game.players.length;
                this.props.addplayer({
                    wallet: 3,
                    canRollTwo: false,
                    landmarks: landmarks,
                    cardsInPossession: initialHand,
                    isTurn: false,
                    playerId: socket.id,
                    index: num,
                    initialRoll: Math.floor(Math.random() * (100) + 1)
                });
            }
        }
    }

    rollDice(evt, roll) {
        evt.preventDefault();
        if (this.props.game.players.length && this.props.game.players[0].canRollTwo) {
            this.props.roll2()
        } else {
            // let numberRolled = Math.floor(Math.random() * 6 + 1);
            let newState = Object.assign({}, this.props.game, {lastNumberRolled: roll});
            this.props.roll1(roll);
            this.props.receivingMoney(newState)
        }
    }

    onBuyClick(itemId, evt) {
        evt.preventDefault();
        this.props.buy(this.props.game, this.state.myId, itemId)
    }

    onEndTurnClick(client, evt) {
        evt.preventDefault();
        this.props.endPlayerTurn(client);
    }

    onStartGame(client, evt) {
        evt.preventDefault();
        this.props.startGame(client);
    }

    render() {
        const client = this.props.game.players.length && this.props.game.players.filter(player => {
                return player.playerId === socket.id
            })[0];

        let items = this.props.game.cardsOnField;

        return (
            <div>
                <div className="container">
                    <div className="row panelUpper">
                      <h1 className="title">Machi Koro - New York City!</h1>

                        {
                            client ?
                                <div className="col-md-12">
                                    <h3>{`You are Player ${client.index + 1}`}</h3>
                                    <h3> My
                                        bank: {this.props.game.players.length && this.props.game.players.filter((player) => {
                                            return player.playerId === this.state.myId
                                        })[0].wallet} </h3>
                                    <h3>Last Roll: {this.props.game.lastNumberRolled}</h3>
                                </div>
                                :
                                <h3>You are not logged in!</h3>
                        }
                    </div>
                </div>
                <div className="container">
                    {
                        this.props.game.gameStarted ?
                            <div>
                                {
                                    client && client.isTurn ?
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="btn-group">
                                                    <Dice />
                                                    <button type="button" className="btn btn-primary active"
                                                            onClick={(evt) => {
                                                                this.onEndTurnClick(client, evt)
                                                            }}>End Turn
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <h3>It is not your turn!</h3>
                                }
                                <div className="row">
                                    {
                                        items && items.map(item => (
                                            <div className={"col-md-2 well itemcontainer " + item.color} key={item.id}>
                                                <div className="">
                                                    <div className="itemcontainernamecont">
                                                        <h4 >
                                                            <div id="itemcost">
                                                                {
                                                                    item.active[1] ?
                                                                        <h5>{item.active[0]}-{item.active[1]}</h5> :
                                                                        <h5>{item.active[0]}</h5>
                                                                }
                                                                <h4>{item.title}</h4>
                                                                <img src={item.iconImage}></img>
                                                            </div>
                                                        </h4>
                                                        <div id="">
                                                            Quantity: {item.quantity}

                                                        </div>

                                                        <div>
                                                            {
                                                                item.quantity === 0 ?
                                                                    <button type="button"
                                                                            className="btn btn-primary disabled">
                                                                        None
                                                                        Left</button>
                                                                    :
                                                                    <div onClick={(evt) => {
                                                                        if (client && client.isTurn) {
                                                                            this.onBuyClick(item.id, evt)
                                                                        } else {
                                                                            alert("IT'S NOT YOUR TURN!")
                                                                        }
                                                                    }}
                                                                         className="coin-container">
                                                                        <div className="coin gold">
                                                                            <p>{item.cost}</p>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="btn-group">
                                    {
                                        this.props.game.players.length && this.props.game.players.length === 4 ?
                                            <button type="button" className="btn btn-primary disabled">Game
                                                Full</button>
                                            :
                                            client ?
                                                <button type="button" className="btn btn-primary disabled">Already
                                                    Joined</button>
                                                :
                                                <button type="button" className="btn btn-primary active"
                                                        onClick={this.onAddPlayerClick}>Join Game</button>
                                    }
                                    {
                                        this.props.game.players.length && this.props.game.players.length > 1 ?
                                            <button type="button" className="btn btn-primary active" onClick={(evt) => {
                                                this.onStartGame(client, evt)
                                            }}>Start Game</button>
                                            :
                                            <button type="button" className="btn btn-primary disabled">Need at least 2
                                                players!</button>

                                    }
                                </div>
                            </div>
                          }
                        </div>
                        <div className="container">

                        </div>
                        <div className="container">
                          <div className="row">
                            <SpringGrid
                              component="ul"
                              columns={5}
                              columnWidth={150}
                              gutterWidth={5}
                              gutterHeight={5}
                              itemHeight={200}
                              springConfig={{ stiffness: 170, damping: 26 }}
                              >
                              {
                                client.cardsInPossession && client.cardsInPossession.filter(card => card.quantity > 0).map(card => (
                                  <div className="col-md-2 well itemcontainer" key={card.id}>
                                      <div className="">
                                          <div className="itemcontainernamecont">
                                              <div id="">
                                                  Quantity: {card.quantity}
                                              </div>
                                              <div id="">
                                                  {card.title}
                                              </div>

                                          </div>
                                      </div>
                                  </div>
                                ))
                              }
                            </SpringGrid>
                          </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({game}) => ({game});

const mapDispatchToProps = dispatch => ({
    addplayer: function (player) {
        dispatch(addPlayer(player))
    },
    roll1: function (num) {
        dispatch(rollOne(num))
    },
    roll2: function () {
        dispatch(rollTwo())
    },
    endPlayerTurn: function (player) {
        dispatch(endPlayerTurn(player))
    },
    startGame: function (client) {
        dispatch(startingGame(client))
    },
    buy: function (game, playerId, establishmentId) {
        dispatch(buyEstablishment(game, playerId, establishmentId))
    },
    receivingMoney: function (gameObj) {
        dispatch(receivingMoney(gameObj))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Board)

import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {startingEstablishments, landmarks} from '../basestuff'
import { addPlayer, initialHand, rollTwo, rollOne, endPlayerTurn, startingGame } from '../reducers/gameReducer'


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onBuyClick = this.onBuyClick.bind(this);
    this.onAddPlayerClick = this.onAddPlayerClick.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
  }

  onAddPlayerClick(evt) {
    evt.preventDefault();
    if(this.props.game.players && this.props.game.players.length === 4){
      alert('The game is full!')
    } else {
      let num;
      if(this.props.game.players) num = this.props.game.players.length
      this.props.addplayer({
        wallet: 3,
        canRollTwo: false,
        landmarks: landmarks,
        cardsInPossession: initialHand,
        isTurn: false,
        playerId: socket.id,
        index: num,
        initialRoll: Math.floor(Math.random()*(100) + 1)
      });
    }
  }

  rollDice(evt) {
    evt.preventDefault();
    if (this.props.game.players && this.props.game.players[0].canRollTwo) {
      this.props.roll2()
    } else {
      this.props.roll1()
    }
  }

  onBuyClick(evt, itemId) {
    evt.preventDefault();
    console.log('coin clicks', itemId);
  }

  onEndTurnClick(client, evt) {
    evt.preventDefault();
    console.log('current player whose turn it is', client)
    this.props.endPlayerTurn(client);
  }

  onStartGame(client, evt){
    evt.preventDefault();
    console.log('logged in client is: ', client);
    this.props.startGame(client);
  }

  render() {
    const client = this.props.game.players.filter(player => {
      return player.playerId === socket.id
    })[0];

    const items = [...startingEstablishments];
    return (
      <div className="container">
        <h1 className="">Machi Koro - New York City!</h1>
        {
          client ? <h3>{`You are Player ${client.index + 1}`}</h3> : <h3>You are not logged in!</h3>
      }

      {
        this.props.game.gameStarted ?
        <div className="row">
          {
            client && client.isTurn ?
            <div className="btn-group">
              <button type="button" className="btn btn-primary active" onClick={this.rollDice}>Roll Dice</button>
              <button type="button" className="btn btn-primary active" onClick={(evt)=>{this.onEndTurnClick(client, evt)}}>End Turn</button>
            </div>
            :
            <h3>It is not your turn!</h3>
          }

          {
            items && items.map(item => (
              <div className="col-md-2 well itemcontainer" key={item.id}>
                <div className="">
                  <div className="itemcontainernamecont">
                    <img src={item.iconImage} />
                    <h4>
                      <div>
                        {item.cost}
                      </div>
                      <span>
                        <Link to={'/items/' + item.id + '/reviews'}>{item.title}</Link>
                      </span>
                    </h4>
                    <div id="">
                      Quantity: {item.quantity}
                    </div>
                    <div id="">
                      {item.subtitle}
                    </div>
                    <div>
                      {
                        item.quantity === 0 ?
                        <button type="button" className="btn btn-primary disabled">None
                          Left</button>
                        :
                        <div onClick={this.onBuyClick} className="coin-container">
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
        :
        <div className="row">
          <div className="btn-group">
            {
              this.props.game.players && this.props.game.players.length === 4 ?
              <button type="button" className="btn btn-primary disabled">Game Full</button>
              :
              client ?
              <button type="button" className="btn btn-primary disabled">Already Joined</button>
              :
              <button type="button" className="btn btn-primary active" onClick={this.onAddPlayerClick}>Join Game</button>
            }
            {
              this.props.game.players.length > 1 ?
              <button type="button" className="btn btn-primary active" onClick={(evt)=>{this.onStartGame(client, evt)}}>Start Game</button>
              :
              <button type="button" className="btn btn-primary disabled">Need at least 2 players!</button>

            }
          </div>
        </div>
      }
    </div>
    )
  }
}
const mapStateToProps = ({game}) => ({game});

const mapDispatchToProps = dispatch => ({
  addplayer: function (player) {
    dispatch(addPlayer(player))
  },
  roll1: function(){
    dispatch(rollOne())
  },
  roll2: function(){
    dispatch(rollTwo())
  },
  endPlayerTurn: function(player){
    dispatch(endPlayerTurn(player))
  },
  startGame: function(client){
    dispatch(startingGame(client))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Board)

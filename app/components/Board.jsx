import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { startingEstablishments, landmarks } from '../basestuff'
import { addPlayer, initialHand, updatePlayersArray } from '../reducers/gameReducer'


class Board extends React.Component {
  constructor(props){
    super(props)
    this.onBuyClick = this.onBuyClick.bind(this)
    this.onAddPlayerClick = this.onAddPlayerClick.bind(this)
  }

  onAddPlayerClick(evt){
    evt.preventDefault();
    if(this.props.players.length >= 4) {
      throw new Error("The game is full")
    } else {


    this.props.addplayer({
      wallet: 3,
      canRollTwo: false,
      landmarks: landmarks,
      cardsInPossession: initialHand,
      isTurn: false,
      playerId: socket.id
    })
    socket.on('addPlayer', (players)=> {
      this.props.updateplayersarray(players)
      })

    }
  }



  onBuyClick(evt){
    evt.preventDefault();
    this.props.currentPlayer

  }
  render(){
    const items = [...startingEstablishments]
    return (
      <div className="container">
        <div className="row">
          <h3 className="">Machi Koro - New York City!</h3>
          <button type="button" className="btn btn-primary active" onClick={this.onAddPlayerClick}>Join Game</button>
        </div>
        <div className="row">
          {items && items.map(item => (
            <div className="col-md-2 well itemcontainer" key={item.id}>

              <div className="">
                <div className="itemcontainernamecont">
                  <h4 >

                    <div>
                      {item.active.length===2 ? item.active[0] + ' - ' + item.active[1] : item.active[0]}
                    </div>
                    <span>
                      <Link to={'/items/' + item.id + '/reviews'}>{item.title}</Link>
                    </span>
                  </h4>

                  <div>
                    Item Cost: { item.cost }
                  </div>
                  <div id="">
                    Quantity: {item.quantity}
                  </div>
                  <div id="">
                    {item.subtitle}
                  </div>
                  <div>
                    {item.quantity === 0 ?  <button type="button" className="btn btn-primary disabled">None Left</button> :
                      <button type="button" className="btn btn-primary active" onClick={this.onBuyClick}>Buy</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      )
    }
  }
const mapStateToProps = (state) => ({
  currentPlayer: state.game.currentRoller,
  players: state.game.players
})

const mapDispatchToProps = dispatch => ({
  addplayer: function(player){
    dispatch(addPlayer(player))
  },
  updateplayersarray: function(player){
    dispatch(updatePlayersArray(player))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Board)

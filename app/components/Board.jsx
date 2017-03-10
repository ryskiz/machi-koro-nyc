import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {startingEstablishments, landmarks} from '../basestuff'
import {addPlayer, initialHand, rollTwo, rollOne} from '../reducers/gameReducer'


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.onBuyClick = this.onBuyClick.bind(this);
        this.onAddPlayerClick = this.onAddPlayerClick.bind(this);
        this.rollDice = this.rollDice.bind(this);
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
            index: num
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

    onBuyClick(evt) {
        evt.preventDefault();
    }

    render() {
        const items = [...startingEstablishments];
        return (
            <div className="container">
                <div className="row">
                    <h3 className="">Machi Koro - New York City!</h3>
                    {this.props.game.players && this.props.game.players.length === 4 ? <button type="button" className="btn btn-primary disabled">Game Full
                      </button>  : <button type="button" className="btn btn-primary active" onClick={this.onAddPlayerClick}>Join Game</button>}
                    <button type="button" className="btn btn-primary active" onClick={this.rollDice}>Roll Dice</button>
                </div>
                <div className="row">
                    {items && items.map(item => (
                        <div className="col-md-2 well itemcontainer" key={item.id}>

                            <div className="">
                                <div className="itemcontainernamecont">
                                    <h4 >
                                        <div>
                                            {item.cost}
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
                                        {item.quantity === 0 ?
                                            <button type="button" className="btn btn-primary disabled">None
                                                Left</button> :
                                            <button type="button" className="btn btn-primary active"
                                                    onClick={this.onBuyClick}>Buy</button>
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
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Board)

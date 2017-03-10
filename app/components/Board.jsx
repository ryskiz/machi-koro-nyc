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
    console.log(this.props)
    evt.preventDefault();
    this.props.addplayer({
        wallet: 3,
        canRollTwo: false,
        landmarks: landmarks,
        cardsInPossession: initialHand,
        isTurn: false
    })
  }

  onBuyClick(evt){
    evt.preventDefault();
  }
  render(){
    const items = [...startingEstablishments]
    return (
      <div className="container">
        <div className="row">
          <h3 className="">Machi Koro - New York City!</h3>
          <button type="button" className="btn btn-primary active" onClick={this.onAddPlayerClick}>Add Player</button>
        </div>
          <div className="row">
            {items && items.map(item => (
              <div className="col-md-2 well itemcontainer" key={item.type}>

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

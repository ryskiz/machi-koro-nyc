import React from 'react';
import ReactDice from 'react-dice-complete';
import { connect } from 'react-redux';
import {
    rollTwo,
    rollOne,
    receivingMoney
} from '../reducers/gameReducer'

class Dice extends React.Component {
    constructor(props){
        super(props)
        this.rollAll = this.rollAll.bind(this)
        this.rollDoneCallback = this.rollDoneCallback.bind(this)
    }
    rollAll() {
        this.reactDice.rollAll()
    }

    rollDoneCallback(num) {
        this.props.roll1(num);
        let newState = Object.assign({}, this.props.game, {lastNumberRolled: num});
        this.props.receivingMoney(newState)
    }

    render() {
        return (
            <div>
                <ReactDice numDice={1} rollDone={this.rollDoneCallback} ref={dice => this.reactDice = dice}
                />
            </div>
        )
    }
}

const mapState = ({game}) => ({game});

const mapDispatchToProps = dispatch => ({
    roll1: function (num) {
        dispatch(rollOne(num))
    },
    roll2: function () {
        dispatch(rollTwo())
    },
    receivingMoney: function (gameObj) {
        dispatch(receivingMoney(gameObj))
    }
});


export default connect(mapState, mapDispatchToProps)(Dice)
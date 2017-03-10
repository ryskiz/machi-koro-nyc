import React from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/styles.css';

export default class Dice extends React.Component {

    rollAll() {
        this.reactDice.rollAll()
    }

    static rollDoneCallback(num) {
        console.log(`You rolled a ${num}`)
    }

    render() {
        return (
            <div>
                <ReactDice
                    numDice=2
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                />
            </div>
        )
    }

}
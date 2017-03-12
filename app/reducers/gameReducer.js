import {startingEstablishments, purchaseEstablishment, findPlayersActiveCards } from '../basestuff'
import axios from 'axios';
//Constants

const RECEIVE_PLAYER = 'RECEIVE_PLAYER'
const RECEIVING_PLAYER = 'RECEIVING_PLAYER'
const TAKE_CARD = 'TAKE_CARD'
const END_TURN = 'END_TURN';
const UPDATE_TURN = 'UPDATE_TURN'
const END_GAME = 'END_GAME'

const PICK_CARD = 'PICK_CARD';
const ROLL_DICE = 'ROLL_DICE';
const STEAL_CARD = 'STEAL_CARD';
const ACTIVATE_LANDMARK = 'ACTIVATE_LANDMARK';
const TOGGLE_MONEY = 'TOGGLE_MONEY';

const ACTIVATE_SOCKET = 'ACTIVATE_SOCKET';
const PLAYER_ROLLING = 'PLAYER_ROLLING';
const PLAYER_ROLL = 'PLAYER_ROLL';
const BUY_ESTABLISHMENT = 'BUY_ESTABLISHMENT';
const RECEIVE_MONEY = 'RECEIVE_MONEY';

const START_GAME = 'START_GAME';
const SET_FIRST_PLAYER = 'SET_FIRST_PLAYER';


export let initialHand = [
    {
        title: 'Wheat Field (Halal Cart)',
        id: 0,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'GRAIN',
        count: 6,
        cost: 1,
        effect: ['from bank', 1],
        active: [1],
        spawn: 1,
        quantity: 1
    },
    {
        title: 'Ranch (Pizzeria)',
        id: 1,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'CATTLE',
        count: 6,
        cost: 1,
        effect: ['from bank', 1],
        active: [2],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Bakery (Corner Bodega)',
        id: 2,
        subtitle: 'Get 1 coin from the bank, on your turn only.',
        type: 'STORE',
        count: 6,
        cost: 1,
        effect: ['from bank', 1, true],
        active: [2, 3],
        spawn: 1,
        quantity: 1
    },
    {
        title: 'Café (Dive Bar)',
        id: 3,
        subtitle: 'Get 1 coin from the player who rolled the dice.',
        type: 'CUP',
        count: 6,
        cost: 2,
        effect: ['from player who rolled', 1],
        active: [3],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Convenience Store (Duane Reade)',
        id: 4,
        subtitle: 'Get 3 coins from the bank, on your turn only.',
        type: 'STORE',
        count: 6,
        cost: 2,
        effect: ['from bank', 3, true],
        active: [4],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Forest (Studio Apartment)',
        id: 5,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'INDUSTRY',
        count: 6,
        cost: 3,
        effect: ['from bank', 1],
        active: [5],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Business Center (Leasing Office)',
        id: 6,
        subtitle: 'Trade one non-MAJOR establishment with another player, on your turn only.',
        type: 'MAJOR',
        count: 4,
        cost: 8,
        effect: ['business', 0, true],
        active: [6],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Stadium (New Venture)',
        id: 7,
        subtitle: 'Get 2 coins from all players, on your turn only.',
        type: 'MAJOR',
        count: 4,
        effect: ['stadium', 2, true],
        cost: 6,
        active: [6],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'TV Station (Hedge Fund)',
        id: 8,
        subtitle: 'Take 5 coins from any one player, on your turn only.',
        type: 'MAJOR',
        count: 4,
        effect: ['tv station', 5, true],
        cost: 7,
        active: [6],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Cheese Factory (5-Star Restaurant)',
        id: 9,
        subtitle: 'Get 3 coins from the bank for each CATTLE establishment that you own, on your turn only.',
        type: 'FACTORY',
        count: 6,
        effect: ['multiplier', 3, true, 'CATTLE'],
        cost: 5,
        active: [7],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Furniture Factory (Apartment Building)',
        id: 10,
        subtitle: 'Get 3 coins from the bank for each FACTORY establishment that you own, on your turn only.',
        type: 'FACTORY',
        count: 6,
        effect: ['multiplier', 3, true, 'INDUSTRY'],
        cost: 3,
        active: [8],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Mine (Brownstone Apartment)',
        id: 11,
        subtitle: "Get 5 coins from the bank, on anyone's turn.",
        type: 'INDUSTRY',
        count: 6,
        effect: ['from bank', 5],
        cost: 6,
        active: [9],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Family Restaurant (Nightclub)',
        id: 12,
        subtitle: 'Get 2 coins from the player who rolled the dice.',
        type: 'CUP',
        count: 6,
        effect: ['from player who rolled', 2],
        cost: 3,
        active: [9, 10],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Apple Orchard (Metro Stop)',
        id: 13,
        subtitle: "Get 3 coins from the bank, on anyone's turn.",
        type: 'GRAIN',
        count: 6,
        effect: ['from bank', 3],
        cost: 3,
        active: [10],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Fruit and Vegetable Market (Whole Foods)',
        id: 14,
        subtitle: 'Get 2 coins from the bank for each GRAIN establishment that you own, on your turn only.',
        type: 'FRUIT',
        count: 6,
        effect: ['multiplier', 2, true, 'GRAIN'],
        cost: 2,
        active: [11, 12],
        spawn: 0,
        quantity: 0
    }
];

//Actions

const receivePlayer = player => ({
    type: RECEIVE_PLAYER,
    player
})

const receivingPlayer = () => ({type: RECEIVING_PLAYER});

const playerRolling = () => ({type: PLAYER_ROLLING});

const roll = number => ({type: PLAYER_ROLL, number});


export const startGame = () => ({

    type: START_GAME

})

export const buy = gameObj => ({type: BUY_ESTABLISHMENT, gameObj});


export const receiveMoney = (playerIndex, amount) => ({type: RECEIVE_MONEY, playerIndex, amount})



const takeCard = cardId => ({
    type: TAKE_CARD,
    cardId
})

const endTurn = playerIndex => ({
    type: END_TURN,
    playerIndex
})

const endGame = () => ({
    type: END_GAME
})

const pick = cardId => ({
    type: PICK_CARD,
    cardId
});

const steal = stolenCard => ({
    type: STEAL_CARD,
    stolenCard
});

const activateLandmark = (landmarkId) => ({
    type: ACTIVATE_LANDMARK,
    landmarkId
});

const toggleMoney = (amount) => ({
    type: TOGGLE_MONEY,
    amount
});

const updateTurn = (nextPlayerIndex, lastPlayerIndex) => ({
    type: UPDATE_TURN,
    nextPlayerIndex,
    lastPlayerIndex
});

const setFirstPlayer = (playerIndex) => ({
    type: SET_FIRST_PLAYER,
    playerIndex
})

//Reducer

const initialState = {
    cardsOnField: startingEstablishments,
    gameStarted: false,
    gameWon: false,
    playerJustRolled: false,
    lastNumberRolled: 0,
    players: []
};


export default function (state = initialState, action) {

    const newState = Object.assign({}, state);

    switch (action.type) {
        case PICK_CARD:
            newState.cardsInPossession = action.items;
            newState.playerJustRolled = false;
            break;
        case TOGGLE_MONEY:
            newState.wallet += action.amount;
            break;
        case STEAL_CARD:
            break;
        case ACTIVATE_LANDMARK:
            newState.landmarks[action.landmarkId].built = true;
            break;
        case PLAYER_ROLL:
            newState.lastNumberRolled = action.number;
            newState.playerJustRolled = true;
            return newState;
            break;
        case SET_FIRST_PLAYER:
            newState.players[action.playerIndex].isTurn = true;
            return newState;
            break;
        case UPDATE_TURN:
            newState.players[action.lastPlayerIndex].isTurn = false;
            newState.players[action.nextPlayerIndex].isTurn = true;
            return newState;
            break;
        case START_GAME:
            newState.gameStarted = true;
            return newState;
            break;
        case RECEIVE_MONEY:
          newState.playerJustRolled = false;
          newState.players[action.playerIndex].wallet += action.amount;
          return newState;
          break;
        case PLAYER_ROLLING:
            return newState;
            break;
        case BUY_ESTABLISHMENT:
            return action.gameObj;
            break
        case ACTIVATE_SOCKET:
            return newState;
            break;
        case RECEIVE_PLAYER:
            newState.players = action.player;
            newState.playerJustRolled = false;
            return newState;
            break;
        case RECEIVING_PLAYER:
            return newState;
            break;
        case TAKE_CARD:
            break;
        case END_GAME:
            newState.gameWon = true;
            break;
        default:
            return state
    }
}

// Dispatch Functions

export const addPlayer = playerObj => dispatch => {
    socket.emit('add', playerObj);
};


export const updatePlayersArray = newPlayerArr => dispatch => {
    dispatch(receivePlayer(newPlayerArr))
};

export const rollTwo = () => dispatch => {
    let die1 = Math.floor(Math.random() * 6 + 1);
    let die2 = Math.floor(Math.random() * 6 + 1);
    socket.emit('updateLastRoll', (die1 + die2))
};

export const rollOne = (num) => dispatch => {
    socket.emit('updateLastRoll', num);
};

export const updateLastNumberRolled = number => dispatch => {
    dispatch(roll(number))
};


export const endPlayerTurn = player => dispatch => {
    socket.emit('endTurn', player);
}
export const setFirstPlayerTurn = (playerIndex) => dispatch => {
	dispatch(setFirstPlayer(playerIndex))
}

export const startingGame = client => dispatch => {
    socket.emit('start', client);
}

export const updateNextPlayerIndexTurn = (nextPlayerIndex, lastPlayerIndex) => dispatch => {
    dispatch(updateTurn(nextPlayerIndex, lastPlayerIndex))
}

export const buyEstablishment = (game, playerId, establishmentId) => dispatch => {
    socket.emit('playerBuyEstablishment', {game, playerId, establishmentId});
};

export const receivingMoney = gameObj => dispatch => {
    let playerAmountsToChange = [];
    let playersInObj = gameObj.players;
    let rollNumber = gameObj.lastNumberRolled;

    playersInObj.forEach(player => {
      let updatesForPlayer = {amount: 0, playerIndex: player.index};
      let activeCards = player.cardsInPossession.filter(card=>{
        return card.quantity > 0
      });

      activeCards.forEach(card => {
            if(card.active.includes(rollNumber) && player.isTurn && card.effect[2]){
                updatesForPlayer.amount += (card.effect[1] * card.quantity);
            }
            if(card.active.includes(rollNumber) && card.effect[0] === 'multiplier' && card.effect[2] && player.isTurn) {
                let multiplierCount = activeCards.filter(card => card.type === card.effect[3]).length;
                updatesForPlayer.amount += (card.effect[1] * multiplierCount);
            }
            if(card.active.includes(rollNumber) && !card.effect[2] && card.effect[0] === 'from bank') {
                updatesForPlayer.amount += (card.effect[1] * card.quantity)
            }


            if(card.effect[0] === 'stadium'){
              let rollingPlayer = playersInObj.filter(rollingPlayer => rollingPlayer.isTurn)[0];
              for(let i = player.index + 1; i !== player.index; i = (i + 1) % playersInObj.length){
                  let amountFromPlayer = [];
                  let totalAmount = 0;
                  if(playerInObj[i].wallet < (card.quantity * card.effect[1])){
                    amountFromPlayer.push({amount: playerInObj[i].wallet, playerIndex: playersInObj[i].index})
                    totalAmount += playerInObj[i].wallet
                  } else {
                    amountFromPlayer.push({amount:(card.effect[1] * card.quantity), playerIndex: playersInObj[i].index})
                    totalAmount += (card.effect[1] * card.quantity);
                  }
                }
              if(player.isTurn){
                updatesForPlayer.amount += totalAmount;
              } else {
                updatesForPlayer.amount -= (amountFromPlayer.filter(playerToTakeFrom => playerToTakeFrom.playerIndex === player.index)[0].amount)
              }
            }

            if(card.effect[0] === 'tv station'){

            }

            if(card.effect[0] === 'business'){

            }
        })
        let redCardNumbers = [3, 9, 10];
        if(player.isTurn && redCardNumbers.includes(rollNumber)){
          let playersToPay = [];
          let playerWhoRolledWallet = player.wallet;
          let totalSubtracted = 0;
          let i;
          if(player.index === playersInObj.length-1){
            i = 0
          } else {
            i = player.index + 1
          }
          for(i; i !== player.index; i = (i + 1) % playersInObj.length){
              let otherPlayerActiveRedCard = playersInObj[i].cardsInPossession.filter(card=>{
                return card.quantity > 0 && card.active.includes(rollNumber) && card.type === 'CUP'
              })[0];
              console.log('other player red card', otherPlayerActiveRedCard)

              if(playerWhoRolledWallet < (otherPlayerActiveRedCard.effect[1] * otherPlayerActiveRedCard.quantity)){
                playersToPay.push({amount: playerWhoRolledWallet, playerIndex: playersInObj[i].index})
                totalSubtracted += playerWhoRolledWallet
                playerWhoRolledWallet = 0;
                break
              } else {
                playersToPay.push({amount:(otherPlayerActiveRedCard.effect[1] * otherPlayerActiveRedCard.quantity), playerIndex: playersInObj[i].index})
                totalSubtracted += (otherPlayerActiveRedCard.effect[1] * otherPlayerActiveRedCard.quantity)
                playerWhoRolledWallet -= (otherPlayerActiveRedCard.effect[1] * otherPlayerActiveRedCard.quantity)
              }
          }
          console.log('total loss', totalSubtracted)
          console.log('players to pay', playersToPay)
          updatesForPlayer.amount -= totalSubtracted;
          playersToPay.forEach(player => {
            playerAmountsToChange.push(player)
          })
        }
        playerAmountsToChange.push(updatesForPlayer)
      });
    socket.emit('playerReceive', playerAmountsToChange);
  };

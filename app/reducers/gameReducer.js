import {startingEstablishments} from '../basestuff'
import axios from 'axios'

//Constants

const RECEIVE_PLAYER = 'RECEIVE_PLAYER'
const RECEIVING_PLAYER = 'RECEIVING_PLAYER'
const TAKE_CARD = 'TAKE_CARD'
const NEW_ROLLER = 'NEW_ROLLER'
const END_GAME = 'END_GAME'

const PICK_CARD = 'PICK_CARD';
const ROLL_DICE = 'ROLL_DICE';
const STEAL_CARD = 'STEAL_CARD';
const ACTIVATE_LANDMARK = 'ACTIVATE_LANDMARK';
const TOGGLE_MONEY = 'TOGGLE_MONEY';
const PLAYER_TURN = 'PLAYER_TURN;';
const ACTIVATE_SOCKET = 'ACTIVATE_SOCKET';


export const initialHand = [
    {
        title: 'Wheat Field (Halal Cart)',
        id: 0,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'Wheat Field',
        count: 6,
        cost: 1,
        active: [1],
        spawn: 1,
        quantity: 1
    },
    {
        title: 'Ranch (Pizzeria)',
        id: 1,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'Ranch',
        count: 6,
        cost: 1,
        active: [2],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Bakery (Corner Bodega)',
        id: 2,
        subtitle: 'Get 1 coin from the bank, on your turn only.',
        type: 'Bakery',
        count: 6,
        cost: 1,
        active: [2, 3],
        spawn: 1,
        quantity: 1
    },
    {
        title: 'Café (Dive Bar)',
        id: 3,
        subtitle: 'Get 1 coin from the player who rolled the dice.',
        type: 'Cafe',
        count: 6,
        cost: 2,
        active: [3],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Convenience Store (Duane Reade)',
        id: 4,
        subtitle: 'Get 3 coins from the bank, on your turn only.',
        type: 'Convenience Store',
        count: 6,
        cost: 2,
        active: [4],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Forest (Studio Apartment)',
        id: 5,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'Forest',
        count: 6,
        cost: 3,
        active: [5],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Business Center (Leasing Office)',
        id: 6,
        subtitle: 'Trade one non-TOWER establishment with another player, on your turn only.',
        type: 'Business Center',
        count: 4,
        cost: 8,
        active: [6],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Stadium (New Venture)',
        id: 7,
        subtitle: 'Get 2 coins from all players, on your turn only.',
        type: 'Stadium',
        count: 4,
        cost: 6,
        active: [6],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'TV Station (Hedge Fund)',
        id: 8,
        subtitle: 'Take 5 coins from any one player, on your turn only.',
        type: 'TV Station',
        count: 4,
        cost: 7,
        active: [6],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Cheese Factory (5-Star Restaurant)',
        id: 9,
        subtitle: 'Get 3 coins from the bank for each CATTLE establishment that you own, on your turn only.',
        type: 'Cheese Factory',
        count: 6,
        cost: 5,
        active: [7],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Furniture Factory (Apartment Building)',
        id: 10,
        subtitle: 'Get 3 coins from the bank for each FACTORY establishment that you own, on your turn only.',
        type: 'Furniture Factory',
        count: 6,
        cost: 3,
        active: [8],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Mine (Brownstone Apartment)',
        id: 11,
        subtitle: "Get 5 coins from the bank, on anyone's turn.",
        type: 'Mine',
        count: 6,
        cost: 6,
        active: [9],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Family Restaurant (Nightclub)',
        id: 12,
        subtitle: 'Get 2 coins from the player who rolled the dice.',
        type: 'Family Restaurant',
        count: 6,
        cost: 3,
        active: [9, 10],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Apple Orchard (Metro Stop)',
        id: 13,
        subtitle: "Get 3 coins from the bank, on anyone's turn.",
        type: 'Apple Orchard',
        count: 6,
        cost: 3,
        active: [10],
        spawn: 0,
        quantity: 0
    },
    {
        title: 'Fruit and Vegetable Market (Whole Foods)',
        id: 14,
        subtitle: 'Get 2 coins from the bank for each GRAIN establishment that you own, on your turn only.',
        type: 'Fruit and Vegetable Market',
        count: 6,
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

const receivingPlayer = () => ({type: RECEIVING_PLAYER})

const takeCard = cardId => ({
    type: TAKE_CARD,
    cardId
})

const newRoller = playerId => ({
    type: NEW_ROLLER,
    playerId
})

const endGame = () => ({
    type: END_GAME
})

const pick = cardId => ({
    type: PICK_CARD,
    cardId
});

const roll = dice => ({
    type: ROLL_DICE,
    //payload is number rolled
    dice
});

const steal = stolenCard => ({
    type: STEAL_CARD,
    stolenCard
});

const activateLandmark = (landmarkId) => ({
    type: ACTIVATE_LANDMARK,
    landmarkId
})

const toggleMoney = (amount) => ({
    type: TOGGLE_MONEY,
    amount
})

const playerTurn = () => ({
    type: PLAYER_TURN
})


//Reducer

const initialState = {
    cardsOnField: startingEstablishments,
    currentRoller: null,
    gameWon: false
}


export default function (state = initialState, action) {

    const newState = Object.assign({}, state)

    switch (action.type) {
        case PICK_CARD:
            newState.cardsInPossession = action.items;
            break;
        case TOGGLE_MONEY:
            newState.wallet += action.amount;
            break;
        case ROLL_DICE:
            newState.selected = action.item;
            break;
        case STEAL_CARD:
            break;
        case ACTIVATE_LANDMARK:
            newState.landmarks[action.landmarkId].built = true;
            break;
        case PLAYER_TURN:
            newState.isTurn = true;
            return newState;
            break;
        case ACTIVATE_SOCKET:
            return newState;
            break;
        case RECEIVE_PLAYER:
            newState.players = action.player
            return newState;
            break;
        case RECEIVING_PLAYER:
            return newState;
            break;
        case TAKE_CARD:
            break
        case NEW_ROLLER:
            newState.currentRoller = action.playerId
            break
        case END_GAME:
            newState.gameWon = true
            break
        default:
            return state
    }
}

// Dispatch Functions

export const addPlayer = playerObj => dispatch => {
    axios.post('/game/addPlayer', playerObj)
        .then((res) => {
            dispatch(receivingPlayer())
        })
        .catch(console.error.bind(console))
};


export const updatePlayersArray = newPlayerArr => dispatch => {
    dispatch(receivePlayer(newPlayerArr))
}

export const activateSocket = () => dispatch => {
    axios.post('/')
}

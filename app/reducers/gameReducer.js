import {startingEstablishments} from '../basestuff'
import axios from 'axios'

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

const START_GAME = 'START_GAME';
const SET_FIRST_PLAYER = 'SET_FIRST_PLAYER';


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

const receivingPlayer = () => ({type: RECEIVING_PLAYER});

const playerRolling = () => ({type: PLAYER_ROLLING});

const roll = number => ({type: PLAYER_ROLL, number});

export const startGame = () => ({
	type: START_GAME
})

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
    lastNumberRolled: 0,
		players: []
};


export default function (state = initialState, action) {

    const newState = Object.assign({}, state);

    switch (action.type) {
        case PICK_CARD:
            newState.cardsInPossession = action.items;
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
            return newState;
            break;
				case SET_FIRST_PLAYER:
						newState.players[action.playerIndex].isTurn = true;
						return newState;
				case UPDATE_TURN:
						newState.players[action.lastPlayerIndex].isTurn = false;
						newState.players[action.nextPlayerIndex].isTurn = true;
						return newState;
  			case START_GAME:
						newState.gameStarted = true;
						return newState;
        case ACTIVATE_SOCKET:
            return newState;
            break;
        case RECEIVE_PLAYER:
            newState.players = action.player;
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
    axios.post('/game/addPlayer', playerObj)
        .then((res) => {
            dispatch(receivingPlayer())
        })
        .catch(console.error.bind(console))
};


export const updatePlayersArray = newPlayerArr => dispatch => {
    dispatch(receivePlayer(newPlayerArr))
};

export const rollTwo = () => dispatch => {
    let die1 = Math.floor(Math.random() * 6 + 1);
    let die2 = Math.floor(Math.random() * 6 + 1);
    axios.post('/game/playerRoll', {roll: die1 + die2})
        .then(() => {
            dispatch(playerRolling())
        })
        .catch(console.error.bind(console));
};

export const rollOne = () => dispatch => {
    let numberRolled = Math.floor(Math.random() * 6 + 1);
    axios.post('/game/playerRoll', {roll: numberRolled})
        .then(() => {
            dispatch(playerRolling())
        })
        .catch(console.error.bind(console));
};

export const updateLastNumberRolled = number => dispatch => {
    dispatch(roll(number))
};

export const endPlayerTurn = player => dispatch => {
	axios.post('/game/endTurn', {player})
		.then(()=>{
			console.log(`player with index ${player.index} has ended turn!`)
		})
		.catch(console.error.bind(console));
}

export const updateNextPlayerIndexTurn = (nextPlayerIndex, lastPlayerIndex) => dispatch => {
	dispatch(updateTurn(nextPlayerIndex, lastPlayerIndex))
}

export const setFirstPlayerTurn = (playerIndex) => dispatch => {
	dispatch(setFirstPlayer(playerIndex))
}

export const startingGame = client => dispatch => {
	axios.post('/game/startingGame', {client})
		.then(()=>{
			console.log('Selecting the starting player!')
		})
		.catch(console.error.bind(console))
}

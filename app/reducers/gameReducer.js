//Constants

const RECEIVE_PLAYER = 'RECEIVE_PLAYER'
const TAKE_CARD = 'TAKE_CARD'
const NEW_ROLLER = 'NEW_ROLLER'
const END_GAME = 'END_GAME'

//Actions

const receivePlayer = player => ({
  type: RECEIVE_PLAYER,
  player
})

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

//Dispatchers




//Reducer

const initialState = {
  players: [],
  cardsOnField: [],
  currentRoller: null,
  gameWon: false
}


export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

    switch (action.type) {
      case RECEIVE_PLAYER:
        newState.players.concat([action.player])
        break
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

  return newState
}

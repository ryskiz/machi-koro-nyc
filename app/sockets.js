import store from './store';
import { updatePlayersArray, updateLastNumberRolled, updateNextPlayerIndexTurn, setFirstPlayerTurn, startGame, buy, receivingMoney, receiveMoney } from './reducers/gameReducer';
import {purchaseEstablishment, allPlayers} from './basestuff';


export default function socketListen(socket){
  socket.on('addPlayer', (players)=> {
      store.dispatch(updatePlayersArray(players))
  });

  socket.on('playerRoll', (dice)=> {
      store.dispatch(updateLastNumberRolled(dice.roll))
  });

  socket.on('endTurn', (indices) => {
    store.dispatch(updateNextPlayerIndexTurn(indices.nextPlayerIndex, indices.lastPlayerIndex))
  });

  socket.on('startingPlayer', (player) => {
    alert(`The starting player will be Player ${player.index + 1}`)
    store.dispatch(setFirstPlayerTurn(player.index))
    store.dispatch(startGame())
  });

  socket.on('playerBuy', ({game, playerId, establishmentId}) => {
      let newState = purchaseEstablishment(game, playerId, establishmentId);
      store.dispatch(buy(newState))
  });

  socket.on('playerReceiveMoney', ({playerAmountsToChange}) => {
    playerAmountsToChange.forEach(changeObject => {
      store.dispatch(receiveMoney(changeObject.playerIndex, changeObject.amount))
    });
  });
}

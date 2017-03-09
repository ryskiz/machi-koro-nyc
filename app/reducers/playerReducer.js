import { RECEIVE_ITEMS, RECEIVE_SINGLE_ITEM } from '../constants'

///////////////////////////////////////
/////////////////constants/////////////
///////////////////////////////////////


const PICK_CARD = 'PICK_CARD';
const ROLL_DICE = 'ROLL_DICE';
const STEAL_CARD = 'STEAL_CARD';


///////////////////////////////////////////
////////////////////actions////////////////
////////////////////////////////////////////

const pick = card => ({
    type: PICK_CARD,
    card
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




//////////////////////////////////////////////
////////////////////reducer///////////////////
//////////////////////////////////////////////

const initialState = {
    wallet: 3,
    canRollTwo: false,
    cards:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
};


export default function (state = initialState, action) {

    const newState = Object.assign({}, state);

    switch (action.type) {

        case PICK_CARD:
            newState.list = action.items;
            break;
        case ROLL_DICE:
            newState.selected = action.item;
            break;
        case STEAL_CARD:

            break;
        default:
            return state
    }

    return newState
}





/////////////////////////////////////////////////////////
//////////////////dispatch functions/////////////////////
////////////////////////////////////////////////////////




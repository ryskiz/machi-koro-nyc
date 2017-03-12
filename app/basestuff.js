export function radioTowerEffect(player) {
    return {
        player: {
            ...player,
            rollsAllowedPerTurn: 2,
        },
    };
}

export function amusementParkEffect(player) {
    const extraTurnWhen = player.extraTurnWhen ?
        [...player.extraTurnWhen, 'doubles'] :
        ['doubles'];

    return {
        player: {
            ...player,
            extraTurnWhen
        },
    };
}

export function shoppingMallEffect(player) {
    const addedBonuses = {
        [ESTABLISHMENT_TYPES.COFFEE]: 1,
        [ESTABLISHMENT_TYPES.GOODS]: 1,
    };

    if (player.bonuses) {
        Object.keys(player.bonuses).forEach((k) => {
            addedBonuses[k] = player.bonuses[k] + (addedBonuses[k] || 0);
        });
    }

    return {
        player: {
            ...player,
            bonuses: addedBonuses,
        },
    };
}

export function trainStationEffect(player) {
    return {
        player: {
            ...player,
            diceAvailable: 2,
        },
    };
}

export const startingEstablishments = [
    {
        title: 'Wheat Field (Halal Cart)',
        id: 0,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'Wheat',
        cost: 1,
        active: [1],
        quantity: 6,
        color: 'blue'
    },
    {
        title: 'Ranch (Pizzeria)',
        id: 1,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'Cow',
        cost: 1,
        active: [2],
        quantity: 6,
        color: 'blue'
    },
    {
        title: 'Bakery (Corner Bodega)',
        id: 2,
        subtitle: 'Get 1 coin from the bank, on your turn only.',
        type: 'Bread',
        cost: 1,
        active: [2, 3],
        quantity: 6,
        color: 'green'
    },
    {
        title: 'Café (Dive Bar)',
        id: 3,
        subtitle: 'Get 1 coin from the player who rolled the dice.',
        type: 'Cup',
        cost: 2,
        active: [3],
        quantity: 6,
        color: 'red'
    },
    {
        title: 'Convenience Store (Duane Reade)',
        id: 4,
        subtitle: 'Get 3 coins from the bank, on your turn only.',
        type: 'Bread',
        cost: 2,
        active: [4],
        quantity: 6,
        color: 'green'
    },
    {
        title: 'Forest (Studio Apartment)',
        id: 5,
        subtitle: "Get 1 coin from the bank, on anyone's turn.",
        type: 'Gear',
        cost: 3,
        active: [5],
        quantity: 6,
        color: 'blue'
    },
    {
        title: 'Business Center (Leasing Office)',
        id: 6,
        subtitle: 'Trade one non-Major establishment with another player, on your turn only.',
        type: 'Major',
        cost: 8,
        active: [6],
        quantity: 4,
        color: 'purple'
    },
    {
        title: 'Stadium (New Venture)',
        id: 7,
        subtitle: 'Get 2 coins from all players, on your turn only.',
        type: 'Major',
        cost: 6,
        active: [6],
        quantity: 4,
        color: 'purple'
    },
    {
        title: 'TV Station (Hedge Fund)',
        id: 8,
        subtitle: 'Take 5 coins from any one player, on your turn only.',
        type: 'Major',
        cost: 7,
        active: [6],
        quantity: 4,
        color: 'purple'
    },
    {
        title: 'Cheese Factory (5-Star Restaurant)',
        id: 9,
        subtitle: 'Get 3 coins from the bank for each Cow establishment that you own, on your turn only.',
        type: 'Factory',
        cost: 5,
        active: [7],
        quantity: 6,
        color: 'green'
    },
    {
        title: 'Furniture Factory (Apartment Building)',
        id: 10,
        subtitle: 'Get 3 coins from the bank for each Factory establishment that you own, on your turn only.',
        type: 'Factory',
        cost: 3,
        active: [8],
        quantity: 6,
        color: 'green'
    },
    {
        title: 'Mine (Brownstone Apartment)',
        id: 11,
        subtitle: "Get 5 coins from the bank, on anyone's turn.",
        type: 'Gear',
        cost: 6,
        active: [9],
        quantity: 6,
        color: 'blue'
    },
    {
        title: 'Family Restaurant (Nightclub)',
        id: 12,
        subtitle: 'Get 2 coins from the player who rolled the dice.',
        type: 'Cup',
        cost: 3,
        active: [9, 10],
        quantity: 6,
        color: 'blue'
    },
    {
        title: 'Apple Orchard (Metro Stop)',
        id: 13,
        subtitle: "Get 3 coins from the bank, on anyone's turn.",
        type: 'Wheat',
        cost: 3,
        active: [10],
        quantity: 6,
        color: 'blue'
    },
    {
        title: 'Fruit and Vegetable Market (Whole Foods)',
        id: 14,
        subtitle: 'Get 2 coins from the bank for each GRAIN establishment that you own, on your turn only.',
        type: 'Fruit',
        cost: 2,
        active: [11, 12],
        quantity: 6,
        color: 'green'
    }
];
export const landmarks = [
    {
        id: 0,
        title: 'Train Station (Penn Station)',
        subtitle: 'You may roll 1 or 2 die.',
        cost: 4,
        effect: 'trainStationEffect',
        built: false,
    },
    {
        id: 1,
        title: 'Shopping Mall (Times Square)',
        subtitle: 'Each of your CUP and STORE establishments earn +1 coin.',
        cost: 10,
        effect: 'shoppingMallEffect',
        built: false,
    },
    {
        id: 2,
        title: 'Amusement Park (Central Park)',
        subtitle: 'If you roll doubles, take another turn after this one.',
        cost: 16,
        effect: 'amusementParkEffect',
        built: false,
    },
    {
        id: 3,
        title: 'Radio Tower (Freedom Tower)',
        subtitle: 'Once every turn, you can choose to re-roll your die.',
        cost: 22,
        effect: 'radioTowerEffect',
        built: false,
    },
];


export function createGame(name = 'Unnamed Game') {
    const establishments = [];

    // this is absolutely incapable of handling the
    // market scheme introduced in the harbor exp.
    //
    // oh 🐳
    baseGame.establishments.forEach((es) => {
        for (let i = 0; i < es.count; i++) {
            establishments.push({
                ...es,
                id: generateId(),
                count: undefined,
            });
        }
    });

    return {
        name,
        establishments,
        id: generateId(),
        bank: Infinity,
        players: [],
        maxPlayers: 4,
    };
}

export function createPlayer(name = 'Unnamed Player') {
    return {
        name,
        id: generateId(),
        money: 0,
        extraTurnWhen: [],
        rollsAllowedPerTurn: 1,

        establishments: baseGame.establishments
            .filter((es) => es.spawn)
            .map((es) => ({
                ...es,
                id: generateId(),
            })),

        landmarks: baseGame.landmarks.map((lm) => ({
            ...lm,
            id: generateId(),
            purchased: false,
        })),
    };
}

export function addPlayerToGame(game, player) {
    if (game.players.length === game.maxPlayers) {
        throw new Error('Game is full');
    }

    return {
        ...game,
        players: [
            ...game.players,
            player,
        ],
    };
}

export function findPlayer(game, playerId) {
    const players = game.players.filter(p => p.playerId === playerId);

    if (!players.length) {
        return null;
    }

    return players[0];
}

export function findPlayersActiveCards(player){
    return player.cardsInPossession.filter((obj) => {
        return obj.quantity > 0;
    })
}

export function setMoney(game, playerId, money) {
    const player = findPlayer(game, playerId);

    if (!player) {
        throw new Error('Player not in game');
    }

    return {
        ...game,
        players: [
            ...game.players.filter(p => p.id !== playerId),
            {
                ...player,
                money,
            },
        ],
    };
}

export function findMarketEstablishment(game, establishmentId) {

    const establishments = game.cardsOnField.filter(e => e.id === establishmentId);


    if (!establishments.length) {
        return null;
    }

    return establishments[0];
}


// export function receiveMoney(gameObj, player){
//
//     let activeCards = findPlayersActiveCards(player);
//     let rollNumber = gameObj.lastNumberRolled;
//     activeCards.forEach((card) => {
//         if(card.active.includes(rollNumber)){
//             if(card.effect[2] && player.isTurn){
//                 console.log("SHOULDNT BE HERE IF NOT MY TURN");
//                 player.wallet += (card.effect[1] * card.quantity)
//             } else if(card.effect[0] === 'from bank') {
//                 console.log("SHOULD be here either way");
//                 player.wallet += (card.effect[1] * card.quantity)
//             }
//         }
//     });
//     // gameObj.playerJustRolled = false;
//     return player;
// }
//
// export function allPlayers(gameObj){
//     let finalGameState = [];
//     gameObj.players.forEach((player) => {
//         finalGameState.push(receiveMoney(gameObj, player))
//     });
//     return Object.assign({}, gameObj, {players: finalGameState, playerJustRolled: false});
// }


export function purchaseEstablishment(game, playerId, establishmentId) {
    const player = findPlayer(game, playerId);

    const establishment = findMarketEstablishment(game, establishmentId);

    if (!player) {
        throw new Error('Player not in game');
    }

    if (!establishment) {
        throw new Error('Establishment not available for purchase');
    }

    if (player.wallet < establishment.cost) {
        throw new Error('Player cannot afford establishment');
    }

    game.cardsOnField[establishmentId].quantity--;
    game.playerJustRolled = false;
    for(let i = 0; i < game.players.length; i++){
        if(game.players[i].playerId === playerId) {
            game.players[i].cardsInPossession[establishmentId].quantity++;
            game.players[i].wallet -= establishment.cost;
        }
    }
    return Object.assign({}, game);
}

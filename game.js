'use strict'

var cards = require('./cards');
var hands = require('./hands');

function getPlayerWithBestHand(){
    bestPlayer = null;
    bestHand = null;

    for(var i = 0; i < players.length;i++){

        var playerCards = players[i].pocketCards.slice(0);
        playerCards.push.apply(playerCards, commonCards);

        var hand = hands.getBestHand(playerCards);

        if(!bestPlayer || !bestHand){
            bestPlayer = players[i];
            bestHand = hand;
            continue;
        }

        if(hand.value > bestHand.value){
            bestPlayer = players[i];
            bestHand = hand;
            continue;
        }

    }

    return bestPlayer;
}

function echoBestPlayer(round){
    getPlayerWithBestHand();
    console.log(`After the ${round}, ${bestPlayer.name} is winning with a ${hands.getName(bestHand.value)}`);
}

var players = [{name: "John"}, {name: "Paul"}, {name: "George"}, {name: "Ringo"}];

var bestPlayer = null;
var bestHand = null;

var deck = cards.shuffle();


// deal
for (var i = 0; i < players.length; i++) {
    players[i].pocketCards = deck.splice(0, 2);
}

var commonCards = [];

echoBestPlayer('deal');

// now the flop
commonCards = deck.splice(0, 3);
echoBestPlayer('flop');

commonCards.push.apply(commonCards, deck.splice(0, 1));
echoBestPlayer('turn');

commonCards.push.apply(commonCards, deck.splice(0, 1));
echoBestPlayer('river');
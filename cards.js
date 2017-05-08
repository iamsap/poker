'use strict'

const CLUBS = 'clubs';
const HEARTS = 'hearts';
const DIAMONDS = 'diamonds';
const SPADES = 'spades';

const SUITS = [CLUBS, HEARTS, DIAMONDS, SPADES];

const CARD_NAMES = [null, null, "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];

var cards = [];

SUITS.forEach((suit) => {
    for (var i = 2; i <= 14; i++) {
        // Aces can be low or high
        var isAce = i == CARD_NAMES.length - 1;
        cards.push({value: i, name: CARD_NAMES[i], suit: suit, isAce:isAce})
    }
});

function shuffle() {
    var dealCards = cards.slice(0);

    for (let i = dealCards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [dealCards[i - 1], dealCards[j]] = [dealCards[j], dealCards[i - 1]];
    }
    return dealCards;
}

function getValue(valueName){
    for(var i = 0; i < CARD_NAMES.length;i++){
        if(CARD_NAMES[i] == valueName){
            return i;
        }
    }

    return -1;
}

function toCard(val) {
    var parts = val.split(' ');
    if (parts.length != 3) {
        throw new Error(`I don't know how to parse ${val}`);
    }

    var cardName = parts[0];    // <val>,of,suit
    var cardVal = getValue(cardName);

    if (cardVal == -1) {
        throw new Error(`I don't know how to translate ${cardVal} into a card value.  Try one of these: ${CARD_NAMES}`);
    }

    var suitName = parts[2];  // val,of, <suit>
    var card = null;
    SUITS.forEach((suit, idx) => {
        if (suitName === suit) {
            card = {value: cardVal, name: CARD_NAMES[cardVal], suit: suit};
        }
    });

    if (!card) {
        throw new Error(`I don't know how to translate ${suitName} into a suit.  Try one of these: ${SUITS}`);
    }else {
        return card;
    }

}

module.exports = {cards: cards, suits: SUITS, names: CARD_NAMES, shuffle: shuffle, toCard: toCard, getValue:getValue};
'use strict'

const HIGH_CARD = 0;
const PAIR = 1;
const TWO_PAIR = 2;
const THREE_OF_A_KIND = 3;
const STRAIGHT = 4;
const FLUSH = 5;
const FULL_HOUSE = 6;
const FOUR_OF_A_KIND = 7;
const STRAIGHT_FLUSH = 8;
const ROYAL_FLUSH = 9;

var cardLib = require('./cards');

const HANDS = [HIGH_CARD, PAIR, TWO_PAIR, THREE_OF_A_KIND, STRAIGHT, FLUSH, FULL_HOUSE, STRAIGHT_FLUSH, ROYAL_FLUSH];

function getName(val){
    switch(val){
        case HIGH_CARD:
            return "high card";
        case PAIR:
            return "pair";
        case TWO_PAIR:
            return "two pair";
        case THREE_OF_A_KIND:
            return "three of a kind";
        case STRAIGHT:
            return "straight";
        case FLUSH:
            return "flush";
        case FULL_HOUSE:
            return "full house";
        case FOUR_OF_A_KIND:
            return "four of a kind";
        case STRAIGHT_FLUSH:
            return "straight flush";
        case ROYAL_FLUSH:
            return "royal flush";
    }

    throw new Error('I have no idea what a ' + val + ' is');
}

function getBestHand(cards) {
    var hand = getRoyalFlush(cards);

    if (!hand) {
        hand = getStraightFlush(cards);
    }

    if (!hand) {
        hand = getFourOfAKind(cards);
    }

    if (!hand) {
        hand = getFullHouse(cards);
    }

    if (!hand) {
        hand = getFlush(cards);
    }

    if (!hand) {
        hand = getStraight(cards);
    }

    if (!hand) {
        hand = getThreeOfAKind(cards);
    }

    if (!hand) {
        hand = getTwoPair(cards);
    }

    if (!hand) {
        hand = getPair(cards);
    }

    if (!hand) {
        hand = getHighCard(cards);
    }

    return hand;
}

function getRoyalFlush(cards) {

    var straightFlush = getStraightFlush(cards);
    if(!straightFlush){
        return null;
    }

    if(straightFlush.cards[0].value == cardLib.getValue("ten") && straightFlush.cards[4].value == cardLib.getValue("ace")){
        return {value:ROYAL_FLUSH, cards:straightFlush.cards};
    }

    return null;

}
function getStraightFlush(cards) {
    var flush = getFlush(cards);
    var straight = getStraight(cards);

    if (!flush || !straight) {
        return null;
    }

    flush = flush.cards;
    straight = straight.cards;

    flush = sort(flush);
    for (var i = 0; i < straight.length; i++) {
        if (flush[i].value == straight[i].value && flush[i].suit == straight[i].suit) {
            continue;
        }
        return null;
    }

    return {value: STRAIGHT_FLUSH, cards: straight};
}
function getFullHouse(cards) {

    var matches = {};

    cards.forEach((card) => {
        if (!matches[card.value]) {
            matches[card.value] = [];
        }

        matches[card.value].push(card);
    });

    var threeOfAKind = null;
    var twoOfAKind = null;

    Object.keys(matches).forEach((val) => {
        if (matches[val].length == 2) {
            twoOfAKind = matches[val];
            return;
        }

        if (matches[val].length == 3) {
            threeOfAKind = matches[val];
            return;
        }
    });

    if (threeOfAKind && twoOfAKind) {
        var winningCards = threeOfAKind.slice(0);
        winningCards.push.apply(winningCards, twoOfAKind);

        return {value: FULL_HOUSE, cards: winningCards};
    }

    return null;
}
function getFlush(cards) {
    var suits = {};
    cards.forEach((card) => {
        if (!suits[card.suit]) {
            suits[card.suit] = [];
        }

        suits[card.suit].push(card);
    });

    var flush = null;
    Object.keys(suits).forEach((suit) => {
        var cards = suits[suit];

        if (cards.length < 5) {
            return;
        }

        if (cards.length > 5) {
            cards = cards.slice(cards.length - 5);
        }

        flush = {value: FLUSH, cards: cards};
    });

    return flush;
}

function sort(cards) {
    var sorted = cards.sort((obj1, obj2) => {
        if (obj1.value < obj2.value) {
            return -1;
        } else if (obj1.value > obj2.value) {
            return 1;
        }
        return 0;
    });

    return sorted;
}

function getStraight(cards) {

    var sorted = sort(cards);
    var consecutive = [];

    for (var i = 0; i < sorted.length; i++) {

        if (consecutive.length == 0) {
            consecutive.push(sorted[i]);
            continue;
        }

        var card = sorted[i];
        var lastCard = consecutive[consecutive.length - 1];

        // if previous value - 1 last card
        if ((card.value - 1) == lastCard.value) {
            consecutive.push(card);
        }
        else if (consecutive.length < 5) {
            consecutive = [];
            consecutive.push(card);
        }

    }
    // just take the best 5
    if (consecutive.length > 5) {
        consecutive = consecutive.slice(consecutive.length - 5);
    }

    if (consecutive.length == 5) {
        return {value: STRAIGHT, cards: consecutive};
    }

    return null;
}

function getFourOfAKind(cards) {
    var matches = {};

    for (var i = 0; i < cards.length; i++) {
        if (!matches[cards[i].value]) {
            matches[cards[i].value] = [];
        }
        matches[cards[i].value].push(cards[i]);
    }

    var pair = null;

    Object.keys(matches).forEach((val, idx) => {
        var cards = matches[val];
        if (cards.length == 4) {
            pair = cards;
            return;
        }
    });

    if (pair && pair.length == 3) {
        return {value: FOUR_OF_A_KIND, cards: pair};
    }

    return null;
}

function getThreeOfAKind(cards) {
    var matches = {};

    for (var i = 0; i < cards.length; i++) {
        if (!matches[cards[i].value]) {
            matches[cards[i].value] = [];
        }
        matches[cards[i].value].push(cards[i]);
    }

    var pair = null;

    Object.keys(matches).forEach((val, idx) => {
        var cards = matches[val];
        if (cards.length == 3) {
            pair = cards;
            return;
        }
    });

    if (pair && pair.length == 3) {
        return {value: THREE_OF_A_KIND, cards: pair};
    }

    return null;
}

function getTwoPair(cards) {
    var matches = {};

    for (var i = 0; i < cards.length; i++) {
        if (!matches[cards[i].value]) {
            matches[cards[i].value] = [];
        }
        matches[cards[i].value].push(cards[i]);
    }

    var pairs = [];

    Object.keys(matches).forEach((val, idx) => {
        var cards = matches[val];
        if (cards.length == 2) {
            pairs.push(cards[0]);
            pairs.push(cards[1]);
            return;
        }
    });

    if (pairs && pairs.length == 4) {
        return {value: TWO_PAIR, cards: pairs};
    }

    return null;
}
function getPair(cards) {
    var matches = {};

    for (var i = 0; i < cards.length; i++) {
        if (!matches[cards[i].value]) {
            matches[cards[i].value] = [];
        }
        matches[cards[i].value].push(cards[i]);
    }

    var pair = null;

    Object.keys(matches).forEach((val, idx) => {
        var cards = matches[val];
        if (cards.length == 2) {
            pair = cards;
            return;
        }
    });

    if (pair && pair.length == 2) {
        return {value: PAIR, cards: pair};
    }

    return null;
}
function getHighCard(cards) {
    var idx = -1;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].value > idx) {
            idx = i;
        }
    }

    return {value: HIGH_CARD, cards: [cards[idx]]};
}

module.exports = {
    HANDS: HANDS,
    HIGH_CARD: HIGH_CARD,
    PAIR: PAIR,
    TWO_PAIR: TWO_PAIR,
    THREE_OF_A_KIND: THREE_OF_A_KIND,
    STRAIGHT: STRAIGHT,
    FLUSH: FLUSH,
    FULL_HOUSE: FULL_HOUSE,
    STRAIGHT_FLUSH: STRAIGHT_FLUSH,
    ROYAL_FLUSH: ROYAL_FLUSH,
    getBestHand: getBestHand,
    getRoyalFlush: getRoyalFlush,
    getStraightFlush: getStraightFlush,
    getFullHouse: getFullHouse,
    getFlush: getFlush,
    getStraight: getStraight,
    getThreeOfAKind: getThreeOfAKind,
    getTwoPair: getTwoPair,
    getPair: getPair,
    getHighCard: getHighCard,
    getName:getName
};




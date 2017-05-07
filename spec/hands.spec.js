var hands = require('../hands');
var cards = require('../cards');

describe('hands spec', () => {

    it('can detect a high card', () => {
        var myhand = [ cards.toCard('seven of diamonds'), cards.toCard('three of spades'), cards.toCard('four of diamonds'), cards.toCard('ace of spades'), cards.toCard('nine of hearts') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.HIGH_CARD);
    });

    it('can detect a pair as the highest hand', () => {
        var myhand = [ cards.toCard('three of diamonds'), cards.toCard('three of spades'), cards.toCard('four of diamonds'), cards.toCard('ace of spades'), cards.toCard('nine of hearts') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.PAIR);
    });

    it('can detect two pairs as the highest hand', () => {
        var myhand = [ cards.toCard('three of diamonds'), cards.toCard('three of spades'), cards.toCard('four of diamonds'), cards.toCard('ace of spades'), cards.toCard('four of hearts') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.TWO_PAIR);
    });

    it('can detect three of a kind as the highest hand', () => {
        var myhand = [ cards.toCard('three of diamonds'), cards.toCard('three of spades'), cards.toCard('four of diamonds'), cards.toCard('ace of spades'), cards.toCard('three of hearts') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.THREE_OF_A_KIND);
    });

    it('can detect a straight as the highest hand', () => {
        var myhand = [ cards.toCard('five of diamonds'), cards.toCard('four of spades'), cards.toCard('two of diamonds'), cards.toCard('three of spades'), cards.toCard('six of hearts') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.STRAIGHT);
        expect(besthand.cards.length).toEqual(5);
    });

    it('can detect a straight and pick the best 5 cards', () => {
        var myhand = [ cards.toCard('five of diamonds'), cards.toCard('four of spades'), cards.toCard('two of diamonds'), cards.toCard('three of spades'), cards.toCard('six of hearts') , cards.toCard('seven of hearts'), cards.toCard('eight of hearts')];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.STRAIGHT);
        expect(besthand.cards.length).toEqual(5);
        expect(besthand.cards[4].value).toEqual(8);
    });

    it('can detect three of a kind as the highest hand', () => {
        var myhand = [ cards.toCard('three of diamonds'), cards.toCard('eight of clubs'), cards.toCard('ace of diamonds'), cards.toCard('four of diamonds'), cards.toCard('ace of diamonds'), cards.toCard('three of diamonds') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.FLUSH);
    });

    it('can detect three of a kind as the highest hand', () => {
        var myhand = [ cards.toCard('three of diamonds'), cards.toCard("four of spades"), cards.toCard("six of hearts"), cards.toCard("three of clubs"), cards.toCard("four of hearts"), cards.toCard("three of spades") ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.cards.length).toEqual(5);
        expect(besthand.value).toEqual(hands.FULL_HOUSE);
    });

    it('can detect three of a kind as the highest hand', () => {
        var myhand = [ cards.toCard('three of diamonds'), cards.toCard('five of diamonds'), cards.toCard('four of diamonds'), cards.toCard('seven of diamonds'), cards.toCard('six of diamonds') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.cards.length).toEqual(5);
        expect(besthand.value).toEqual(hands.STRAIGHT_FLUSH);
    });

    it('can detect royal flush', () => {
        var myhand = [ cards.toCard('ten of diamonds'), cards.toCard('king of diamonds'), cards.toCard('queen of diamonds'), cards.toCard('jack of diamonds'), cards.toCard('ace of diamonds') ];
        var besthand = hands.getBestHand(myhand);
        expect(besthand.value).toEqual(hands.ROYAL_FLUSH);
    });

});
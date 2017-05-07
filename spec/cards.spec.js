var cards = require('../cards');

describe('cards', () => {

    it('has 52 cards', () => {
        expect(cards.cards.length).toEqual(52);
    });

    it('has 4 suits', () => {
        expect(cards.suits.length).toEqual(4);
    });

    it('has 15 card names', () => {
        expect(cards.names.length).toEqual(15);
    });

    it('contains a shuffle function ', () => {
        expect(cards['shuffle']).toBeDefined();
        expect(typeof cards['shuffle']).toEqual('function');
    });

    it('does not modify the orig cards when I deal', () => {
        var orgCardsStr = '';
        var newCardsStr = '';

        var delt = cards.shuffle();

        cards.cards.forEach((card, idx) => {
            orgCardsStr += card.value + card.suit + card.name;
            newCardsStr += delt[idx].value + delt[idx].suit + delt[idx].name;
        });

        expect(orgCardsStr).not.toEqual(newCardsStr);
    });

    it('has a handy function called toCard', () => {
        expect(cards['toCard']).toBeDefined();
        expect(typeof cards['toCard']).toEqual('function');
    });

    it('can translate a string into a card', () => {
        var test = 'four of clubs';

        var card = cards.toCard(test);
        expect(card).toBeDefined();
        expect(card.value == 6 && card.suit == 'clubs' && card.name == 'four');
    });

});
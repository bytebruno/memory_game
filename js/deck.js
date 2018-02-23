var Deck = function() {

    // NAME OF CARDS (ICONS)
    this.namesList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", 
        "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
        "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
    
    // CARDS OBJECTS ARRAY
    this.cardsList = [];
}

// SHUFFLE FUNCTION
Deck.prototype.shuffle = function() {

    var currentIndex = this.namesList.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.namesList[currentIndex];
        this.namesList[currentIndex] = this.namesList[randomIndex];
        this.namesList[randomIndex] = temporaryValue;
    }

    return this.namesList;
}

// CREATE DECK, ADDING THE CARDS OBJECTS INSIDE CARDSLIST
Deck.prototype.createDeck = function() {

    this.namesList.forEach((name, index) => {
        this.cardsList.push(new Card(name, 'card' + index));
    });
}
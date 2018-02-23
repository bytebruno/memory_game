var Card = function(name, id) {
    this.name = name;
    this.id = id;
    this.elemPage = {};

    this.createCard();
}

// CREATE THE CARD TEMPLATE AND ADD TO THE GAME PAGE
Card.prototype.createCard = function() {

   $('.deck').append(`<div class="col-md-3 col-sm-3 col-xs-4">
                            <li class="card" id="${this.id}" onclick="game.openCard(this)">
                            <i class="${this.name}"></i>
                        </li>
                      </div>` );

    this.elemPage = $('#' + this.id).data('card', this);
}

// SET THE MATCH CLASS TO THE CARD'S ELEMENT
Card.prototype.match = function (){
    $(this.elemPage).addClass('match');
    $(this.elemPage).effect({effect:'bounce', times:1, distance:40});
}

// REMOVE THE OPEN AND SHOW CLASSES FROM THE CARD'S ELEMENT
Card.prototype.error = function (){
    $(this.elemPage).addClass('error');
    $(this.elemPage).effect({effect:'shake', times:2});
    setTimeout(() => {
        $(this.elemPage).removeClass('open showicon error');
        $(this.elemPage).addClass('flip');
    },1000);
    
}

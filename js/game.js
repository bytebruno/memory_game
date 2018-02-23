var Game = function() {
    this.moves = 0;
    this.canClick = true;
    this.deck = {};
    this.timer = {};
    this.openCards = [];
    this.isTiming = false;
    
}

Game.prototype.newGame = function() {
    // RESET ALL VARIABLES AND THE VIEW
    this.resetAll();

    // CREATE NEW DECK
    this.deck = new Deck();

    // CREATE NEW TIMER
    this.timer = new Timer();
    
    // SHUFFLE CARDS NAMES IN ARRAY
    this.deck.shuffle();

    // CREATE CARDS ON DECK
    this.deck.createDeck();   
}

Game.prototype.openCard = function(elem) {
    // PLAYER CAN CLICK CARDS? => RETURN
    if(!this.canClick) return;

    // START TIMING
    if(!this.isTiming) this.startTiming();

    // THE CARD IS ALREADY OPENNED? => RETURN
    if($(elem).is('.open,.match')) return;

    // GET CARD OBJECT OF THE HTML ELEMENT
    var card = $(elem).data('card');

    // CSS TO OPEN THE CARD
    $(elem).addClass('open');

    // DELAY FOR BETTER GAME PLAY
    setTimeout(()=>{
        // CSS TO SHOW THE ICON
        $(elem).addClass('showicon');

        setTimeout(() =>{
            // ADD CARD TO THE ARRAY OF OPEN CARDS
            this.addOpenCards(card);
            // CHECK PLAYER MOVE
            this.checkMove(card);
        },350);
        
    },250);
    
}

// ADD CARD TO THE ARRAY OF OPEN CARDS
Game.prototype.addOpenCards = function(card){
    this.openCards.push(card);
}

// CHECK PLAYER MOVE
Game.prototype.checkMove = function(elem){

    // HAVE 2 CARDS IN ARRAY? => RETURN
    if(this.openCards.length !== 2) return;

    // GET CARDS OBJECTS
    var carta1 = this.openCards[0];
    var carta2 = this.openCards[1];

    // INCREASE MOVE COUNTER
    this.increaseMoves();
    // CHECK IF IS TIME TO DECREASE STAR
    this.checkStars();

    // CHECK IF THE CARDS ARE SIMILAR
    if(carta1.name === carta2.name){
        // SET MATCH CSS AND ANIMATE
        carta1.match();
        carta2.match();
        this.isAllMatched()
    }else{       
        carta1.error();
        carta2.error();
    }
    
    // ERASE LIST OF OPEN CARDS
    this.openCards = [];
}

Game.prototype.isAllMatched = function() {
    var count = 0;

    this.deck.cardsList.forEach(card => {
        if ($(card.elemPage).hasClass('match'))
            count++; 
    });
    
    if(count === this.deck.cardsList.length){
        this.canClick = false;
        this.timer.stop(); 
        swal({
            title: "Você ganhou!",
            text: `Com ${$('.fa-star').length} estrelas,  ${this.moves} jogadas e levou o tempo ${$('#timer').html()}.
                  \n Deseja iniciar outro jogo?`,
            icon: "success",
            buttons: ['Não','Sim'],
            closeOnClickOutside: false,
            closeOnEsc: false
          })
          .then((playAgain) => {
            if (playAgain) {
              swal("Iniciando novo jogo..", {
                icon: "success",
                timer: 1500,
                buttons: false
              }).then(() => this.newGame());
              
            }
          });
    }
    
}

Game.prototype.increaseMoves = function(){
    this.moves++;
    this.setMovesOnPage();
}

Game.prototype.setMovesOnPage = function(){
    $('.moves').text(this.moves);
}

Game.prototype.checkStars =  function(){
    
    if(this.moves === 12){
        $('.fa-star').last().removeClass('fa-star').addClass('fa-star-o');
    }else if(this.moves === 20){
        $('.fa-star').last().removeClass('fa-star').addClass('fa-star-o');
    }
}

Game.prototype.resetAll = function(){
    // RESET VARIABLES AND OBJECTS
    this.moves = 0;
    this.canClick = true;
    this.setMovesOnPage();
    $('.fa-star-o').removeClass('fa-star-o').addClass('fa-star');

    // CLEAN TIMER
    this.isTiming = false;
    $('#timer').html('00:00:00');

    // CLEAN THE CARDS FROM GAME
    $('.deck').empty();
    this.openCards = [];
}

Game.prototype.startTiming = function(){
    this.isTiming = true;
    this.timer.start();
    this.timer.addEventListener('secondsUpdated', () => {
        $('#timer').html(this.timer.getTimeValues().toString());
    });
}
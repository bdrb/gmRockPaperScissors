
var cardsCount = 3;
var meCards = [];
var opCards = [];

var getRandomState = function(){
	var v = Math.floor((Math.random()/4*10));
	return v + 1;
}

var getCardColor = function(state){
	var res = "";
	switch(state){
		case 0:
			res = "cornflowerblue";
			break;
		case 1:
			res = "silver";
			break;
		case 2:
			res = "coral";
			break;
		case 3:
			res = "purple";
			break;
	}
	return res;
}

var get_card_class = function(state){
	var res = "";
	switch(state){
		case 0:
			res = "card";
			break;
		case 1:
			res = "card_s";
			break;
		case 2:
			res = "card_c";
			break;
		case 3:
			res = "card_p";
			break;
	}
	return res;
}

var init = function($me, $op){



	$('#me').toggleClass('card');
	$('#op').toggleClass('card');
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var fightResult = function(me, op){

	switch(op){
		case 0:
			res = "error";
			break;
		case 1:
			if(me === 1)
				res = "void";
			else if(me === 2)
				res = "lose";
			else if(me === 3)
				res = "win";
			break;
		case 2:
			if(me === 1)
				res = "win";
			else if(me === 2)
				res = "void";
			else if(me === 3)
				res = "lose";
			break;
		case 3:
			if(me === 1)
				res = "lose";
			else if(me === 2)
				res = "win";
			else if(me === 3)
				res = "void";
			break;
	}
	return res;

}

var fight = function(){

	for(var i = 0; i < meCards.length; i++){
		if(meCards[i].state == 0)
			return "check cards";
	}

	if(meCards.length == 0 && opCards.length !== 0)
		return "lose";
	if(meCards.length !== 0 && opCards.length == 0)
			return "win";
	if(meCards.length == 0 && opCards.length == 0)
			return "Ooo!!";

	var res = "unknown";
	if(opCards[0].state == 0){
		opCards[0].state = getRandomState();
	}
	opCards[0].elem.css('background-color', getCardColor(opCards[0].state));

	var res = fightResult(meCards[0].state, opCards[0].state);

	if(res == "win"){
		opCards[0].elem.fadeOut(1000);
		opCards.shift();
	}
	else if(res == "lose"){
		meCards[0].elem.fadeOut(1000);
		meCards.shift();
	}
	else{
		opCards[0].elem.fadeOut(1000);
		opCards.shift();
		meCards[0].elem.fadeOut(1000);
		meCards.shift();
	}
	return res;
}

var cardClick = function(cardId){
	var card = "";
	for(var i = 0; i < meCards.length; i++){
			if(meCards[i].id == cardId){
					card = meCards[i];
					break;
			}
	}
	if(card == ""){
		for(var i = 0; i < opCards.length; i++){
				if(opCards[i].id == cardId){
						card = opCards[i];
						return;
				}
		}
	}

	if(card.state < 3) card.state++;
	else               card.state = 1;

	var cur_class = get_card_class(card.state);
	// if(card.elem.hasClass('card')){
	// 	card.elem.removeClass('card');
	// }
	if(card.elem.hasClass('card_s')){
		card.elem.removeClass('card_s');
	}
	if(card.elem.hasClass('card_c')){
		card.elem.removeClass('card_c');
	}
	if(card.elem.hasClass('card_p')){
		card.elem.removeClass('card_p');
	}
	card.elem.addClass(cur_class);
}

var Card = function(id, state, elem){
	this.id = id;
	this.state = state,
	this.elem = elem
}

var init = function ($meCards, $opCards) {

    $meCards.empty();
    $opCards.empty();

    meCards = [];
    opCards = [];

    //for (var i = meCards.length - 1 ; i >= 0 ; i--) {
    //    meCards.shift();
    //}
    //for (var i = opCards.length - 1 ; i >= 0 ; i--) {
    //    opCards.shift();
    //}

    for (var i = cardsCount - 1 ; i >= 0 ; i--) {
        $meCards.append("<div id = 'me" + i + "' class = 'card'></div>");
        meCards[i] = new Card("me" + i, 0, $('#me' + i));
    }

    for (var i = 0 ; i < cardsCount ; i++) {
        $opCards.append("<div id = 'op" + i + "' class = 'card'></div>");
        opCards[i] = new Card("op" + i, 0, $('#op' + i));
    }
}

$(document).ready(function()
{
    if (cardsCount === 0) {
        cardsCount = 1;
    }

    //init($("#me-cards"), $("#op-cards"));
    
    $('#cards-count').html(cardsCount);
	

	for (var i = cardsCount - 1 ; i >= 0 ; i--){
			$("#me-cards").append("<div id = 'me" + i + "' class = 'card'></div>");
			meCards[i] = new Card("me" + i, 0, $('#me' + i));
	}

	for (var i = 0 ; i < cardsCount ; i++){
			$("#op-cards").append("<div id = 'op" + i + "' class = 'card'></div>");
			opCards[i] = new Card("op" + i, 0, $('#op' + i));
	}
    
	$(".card").on('click', function(){
		cardClick($(this).prop("id"));
	});
    
    $('#fight').click(function(){
        $('#res').html(fight());
    });

    $('#cards-count').click(function () {
        if (cardsCount == 10) {
            cardsCount = 1;
        }
        else {
            cardsCount++;
        }
        $('#cards-count').html(cardsCount);
        init($("#me-cards"), $("#op-cards"));
    });
});

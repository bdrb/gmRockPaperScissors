var me_state = 0;
var op_state = 0;

var get_random_state = function(){
	var v = Math.floor((Math.random()/4*10));
	return v + 1;
}

var get_card_color = function(state){
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

var init = function(){
	$('#me').toggleClass('card');
	$('#op').toggleClass('card');
}

var fight = function($op){
	op_state = get_random_state();
	$op.css('background-color', get_card_color(op_state));
	var res = "unknown";
	switch(op_state){
		case 0:
			res = "error";
			break;
		case 1:
			if(me_state === 1)
				res = "void";
			else if(me_state === 2)
				res = "lose";
			else if(me_state === 3)
				res = "win";
			break;
		case 2:
			if(me_state === 1)
				res = "win";
			else if(me_state === 2)
				res = "void";
			else if(me_state === 3)
				res = "lose";
			break;
		case 3:
			if(me_state === 1)
				res = "lose";
			else if(me_state === 2)
				res = "win";
			else if(me_state === 3)
				res = "#void";
			break;
	}
	return res;
}

$(document).ready(function()
{
	//init();

	$('#me').click(function(){

		if(me_state < 3)
			me_state ++;
		else
			me_state = 1;

		//var cur_class = get_card_class(me_state);
		//$('#me').toggleClass(cur_class);
		var cur_color = get_card_color(me_state);
		$('#me').css('background-color', cur_color);

	});
	$('#fight').click(function(){
		if(me_state !== 0){
			$('#res').html(fight($('#op')));
		}
	});
});

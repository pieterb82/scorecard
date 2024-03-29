var socket;
var handicap = document.getElementById("handicap");
var holes = document.getElementById("holes");
var selectedHole;
var stablefordCount = 0;
var holes = [];

$(document).ready(function(){
		$('#holes').hide();
		$('#prev').hide();
		$('#next').hide();

		console.log('Scorecard started!');
		socket = io.connect('htp://localhost:8000');
		socket.on('status', function (data){
			$('#hole'+data.id).children('.stableford').html("Stablefordpunten: "+data.stablefordpunten);
			holes[data.id] = data.stablefordpunten;
			console.log(holes);
			$("#strokes").html("Slagen: "+getStrokes());
			$("#points").html("Stablefordpunten: "+getStablefordTotal());
		});
		socket.on('hole', function (data){
			showHoles(data);

			console.log(data);
		});


});


function setName(){
	var naam = document.getElementById("naam");
	socket.emit('setname', {name : naam.value});
	$("#holes").show('slow', function(){
			$('#name').slideUp();
			$('#next').show();
			$('#prev').show();
	});
}

function getStablefordTotal(){
 	var val = 0;
	for(key in holes){
		val += holes[key];
	}
	return val;
}

function getStrokes(){
	var val = 0;
	$('.holestroke').each(function(index){val += parseInt($(this).val());});
	return val;
}

function next(){
	var $active = $('div.active');
	if($active.next().length>0){
		$active.next().addClass('active');
		$active.removeClass('active');
	}
}

function prev(){
	var $active = $('div.active');
	if($active.prev().length>0){
		$active.prev().addClass('active');
		$active.removeClass('active');
	}
}


function increase(id){
	var scoreid = document.getElementById(id);
	var scorecard_id = document.getElementById("score_id");
	scoreid.value++;
	var si =  $("#strokeindex"+id).val();
	var parin =  $("#par"+id).val()
	socket.emit('score', {hole: id, score : scoreid.value, name: document.getElementById("naam").value, strokeindex: si, par : parin});
}

function decrease(id){
	var scoreid = document.getElementById(id);
	var scorecard_id = document.getElementById("score_id");
	if(scoreid.value!=0){
		scoreid.value--;
		var si =  $("#strokeindex"+id).val();
		var parin =  $("#par"+id).val()
		socket.emit('score', {hole: id, score : scoreid.value, name: document.getElementById("naam").value, strokeindex : si, par : parin});
	}
}
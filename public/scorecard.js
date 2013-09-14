var socket;
var courses = document.getElementById("courseselect");
var handicap = document.getElementById("handicap");
var holes = document.getElementById("holes");
var selectedHole;

$(document).ready(function(){
		$('#handicap').hide();
		$('#holes').hide();
		console.log('Scorecard started!');
		socket = io.connect('htp://localhost:8000');
		socket.on('status', function (data){
			console.log(data);
		});
		socket.on('hole', function (data){
			showHoles(data);
			console.log(data);
		});
});

function courseSelected(hole){
	$("#handicap").show('slow', function(){
		$("#courseselect").slideUp();
	});
	selectedHole = document.getElementById("course").value;
}

function strokes(){
	var stroke = document.getElementById("strokes");
	socket.emit('strokes', {strokes : stroke.value});
	$("#holes").show('slow', function(){
			$('#handicap').slideUp();
	});
	socket.emit('gethole', {id : selectedHole}, function (err, data){
		console.log(data);
	});
}

function increase(id){
	var scoreid = document.getElementById(id);
	var scorecard_id = document.getElementById("score_id");
	scoreid.value++;
	socket.emit('score', {hole: id, score : scoreid.value, card_id: scorecard_id.value});
	console.log("Hole " + id + " score : "+ scoreid.value);
}

function decrease(id){
	var scoreid = document.getElementById(id);
	var scorecard_id = document.getElementById("score_id");
	if(scoreid.value!=0){
		scoreid.value--;
		socket.emit('score', {hole: id, score : scoreid.value, card_id: scorecard_id.value});
		console.log("Hole " + id + " score : "+ scoreid.value);
	}
}

function showHoles(data){
	console.log(JSON.stringify(data));
	var html = "";
	
	for(i=0; i<data.holes.length; i++){
		if(i==9){
			html += '<div style="clear:both;"></div>';
		}
		//console.log(temp);
		html += '<div id="hole'+(i+1)+'" style="float:left;margin-right:10px;width:50px;">';
		html += '<h3>Hole '+(i+1)+'</h3>';
		html += '<p>Par '+data.holes[i].par+'</p>'
		html += '<button onclick="increase('+(i+1)+')">+</button>';
		html += '<input type="text" value="0" id="'+(i+1)+'" style="width:25px;">';
		html += '<button onclick="decrease('+(i+1)+')">-</button>';
		html += '</div>';	
	}
	$('#holes').html(html);
}
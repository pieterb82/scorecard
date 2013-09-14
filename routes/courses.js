// Required Libraries for application
var routes = require('./score');

var dbUrl = "courses";
var collections = ["courses"];

var db = require("mongojs").connect(dbUrl, collections);

exports.findAll = function(req, res){
		db.courses.find(function(err, items){
			//var scorecard_i = routes.createScorecard();
			routes.createScorecard(function(result){
				res.render('page', { banen : items , scorecard: result});
				//console.log(items);		
			});
		});
}

exports.getHole = function (input_id, socket){
	db.courses.findOne({id : parseInt(input_id)}, function(err, hole){
		
		console.log(hole.holes);
		socket.emit('hole', {holes : hole.holes});
	});
}
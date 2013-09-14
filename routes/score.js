var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
	ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('scorecard', server);

/* Opening database, if scorecard doesn't exists create scorecard with dummy data */
db.open(function (err, db){
	if(!err){
		console.log("Connected to 'scorecard' database");
		db.collection('scorecard', {strict: true}, function(err, collection){
			if(err){
				console.log("Scorecard doesn't exist, creating dummy card.");
				//populateDb();
			}else {
				console.log('Scorecards are found');
			}
		});
	}
});

exports.findAll = function(req, res){
	db.collection('scorecard', function(err, collection){
		collection.find().toArray(function(err, items){
			res.render('page', {scorecards: items});
		});
	});
}

exports.score = function (data){
	console.log('Hole ' + data.hole + ': '+ data.score + ' stroke(s)');
	var hole = "hole"+data.hole;
	var obj = {};
	obj[hole] = data.score;
	//console.log("Scorecard: "+data.card_id+" will be updated");
	_id = data.card_id;
	console.log(_id);
	db.collection('scorecard', function (err, collection){
		collection.update({'_id' : BSON.ObjectID(_id) },  {$set: obj}, { safe:true }, function (err, result){
			if(err){
				console.log("Error updating hole");
			} else {
				console.log("Hole is updated in database!");
			}
		});
	});
}

exports.createScorecard = function(callback){
	var scorecard = {
		hole1: 0, hole2: 0, hole3: 0, hole4: 0, hole5: 0, hole6: 0, hole7: 0, hole8: 0, hole9: 0,
		hole10: 0, hole11: 0, hole12: 0, hole13: 0, hole14: 0, hole15: 0, hole16: 0, hole17: 0, hole18: 0,
		name : 'Pieter'
	}

	console.log('Scorecard toevoegen');
	db.collection('scorecard', function(err, collection){
		collection.insert(scorecard, {safe:true}, function(err, result){
			console.log(result[0]._id);
			callback(result[0]._id);
		});
		
	});

}
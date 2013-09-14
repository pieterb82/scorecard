var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('courses', server);

/* Opening database, if courses doesn't exists create scorecard with dummy data */
db.open(function (err, db){
	if(!err){
		console.log("Connected to 'courses' database");
		db.collection('courses', {strict: true}, function(err, collection){
			if(err){
				console.log("Courses doesn't exist, creating courses.");
				populateDb();
			}else {
				console.log('Courses are found');
			}
		});
	}
});

exports.findAll = function(req, res){
		db.courses.find(function(err, items){
			res.render('page', { courses : items, naam: "Testing"});
			console.log(items);
		});
}

var courses = [
	{
		id : 1,
		name : "Burggolf Middelburg",
		holes : [
			{par : 5, strokeindex : 5},
			{par : 4, strokeindex : 15},
			{par : 3, strokeindex : 11},
			{par : 4, strokeindex : 13},
			{par : 4, storkeindex : 1},
			{par : 3, strokeindex : 17},
			{par : 4, strokeindex : 9},
			{par : 4, strokeindex : 7},
			{par : 4, strokeindex : 3},
			{par : 5, strokeindex : 6},
			{par : 4, strokeindex : 16},
			{par : 3, strokeindex : 13},
			{par : 4, strokeindex : 14},
			{par : 4, storkeindex : 2},
			{par : 3, strokeindex : 18},
			{par : 4, strokeindex : 10},
			{par : 4, strokeindex : 8},
			{par : 4, strokeindex : 4}
		]
	},
	{
		id : 2,
		name : "De Goese Golf",
		holes : [
			{par : 4, strokeindex : 14},
			{par : 4, strokeindex : 2},
			{par : 3, strokeindex : 18},
			{par : 5, strokeindex : 12},
			{par : 4, storkeindex : 8},
			{par : 3, strokeindex : 16},
			{par : 4, strokeindex : 6},
			{par : 4, strokeindex : 10},
			{par : 5, strokeindex : 4},
			{par : 4, strokeindex : 7},
			{par : 4, strokeindex : 17},
			{par : 3, strokeindex : 15},
			{par : 5, strokeindex : 9},
			{par : 4, storkeindex : 11},
			{par : 4, strokeindex : 1},
			{par : 4, strokeindex : 5},
			{par : 3, strokeindex : 13},
			{par : 4, strokeindex : 3}
		]
	}];

var populateDb = function(){
	db.collection('courses', function(err, collection){
		collection.insert(courses, {safe:true}, function(err, result){});
	});
}
//required libraries
var express = require('express'),
	routes = require('./routes/score'),
	stableford = require('./class/stableford');

//setting express app configuration
var app = express();
app.configure(function(){
	app.use(express.logger('tiny')); /* default, short, tiny, dev */
	app.use(express.bodyParser());
});

app.set('views', __dirname+'/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function (req, res){
	res.render("index");
});
app.use(express.static(__dirname + '/public'));

stableford.setStrokes(26);

var io = require('socket.io').listen(app.listen(8000));

var sockets = [];
io.sockets.on('connection',function (socket){
	sockets.push(socket);
	socket.on('score', function (data){
		routes.score(data);
		console.log(data);
		socket.emit('status' , {stablefordpunten : stableford.calculateStableford(data.score, data.par, data.strokeindex), id : data.hole});
	});
	socket.on('setname', function (data){
		routes.createScorecard(data.name);
	});
	socket.on('gethole', function (data){
		courses.getHole(data.id, socket);
	});
});
console.log('Listening on port 8000....');
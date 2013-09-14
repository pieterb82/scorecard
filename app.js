//required libraries
var express = require('express'),
	routes = require('./routes/score'),
	stableford = require('./class/stableford')
	courses = require('./routes/courses');

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
app.get("/scorecard", courses.findAll);
app.use(express.static(__dirname + '/public'));

stableford.setStrokes(13);

var io = require('socket.io').listen(app.listen(8000));

io.sockets.on('connection',function (socket){
	socket.on('score', function (data){
		routes.score(data);
		socket.emit('status' , 'Hole' + data.hole + " is updated to " + data.score + ' stroke(s). Stableford is: '+ stableford.calculateStableford(data.score, 5, 5));
	});
	socket.on('strokes', function (data){
		stableford.setStrokes(data.strokes);
		console.log('Strokes set: '+ data.strokes);
	});
	socket.on('gethole', function (data){
		courses.getHole(data.id, socket);
	});
});
console.log('Listening on port 8000....');
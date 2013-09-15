var fs = require('fs');


exports.score = function (data){
	console.log('Hole ' + data.hole + ': '+ data.score + ' stroke(s)');
	var hole = "hole"+data.hole;
	console.log("Scorecard: "+data.name+" will be updated");
	file = 'tmp/'+data.name+'.json';
	fs.readFile(file, function (err, filedata){
			if(err){
				console.log(err);
			} else {
				var content = JSON.parse(filedata);
				content[hole] = data.score;
				fs.writeFile(file, JSON.stringify(content), function (err){});
			}
		});
}

exports.createScorecard = function(name){
	var scorecard = {
		hole10: 0, hole11: 0, hole12: 0, hole13: 0, hole14: 0, hole15: 0, hole16: 0, hole17: 0, hole18: 0,
		name : name
	}
	file = 'tmp/'+name+'.json';
	fs.writeFile(file, JSON.stringify(scorecard), function (err){
		if(err){
			console.log(err);
		} else {
			console.log('Scorecard toevoegen voor ' + name);
		}
	});
	
}
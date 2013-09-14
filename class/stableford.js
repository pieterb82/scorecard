var extra_strokes = 0;
var min_extra_per_hole = 0;
var stroke_index_dependend = 0;

exports.setStrokes = function (strokes){
	extra_strokes = strokes;
	min_extra_per_hole = Math.floor(extra_strokes/18);
	stroke_index_dependend = extra_strokes - (min_extra_per_hole*18);
}

exports.showStrokes = function(){
	console.log('Extra strokes: ' + extra_strokes + ' Min per hole: ' + min_extra_per_hole + ' Stroke Index Dependend strokes: ' + stroke_index_dependend);
}

exports.calculateStableford = function(strokes, par,strokeindex){
	var hole_extra_strokes = min_extra_per_hole;
	if(stroke_index_dependend != 0)
	{
		if(strokeindex<stroke_index_dependend){
			hole_extra_strokes++;
		}
	}
	var result = (par + hole_extra_strokes) - strokes;
	switch(result){
		case -2 : return 0;break;
		case -1 : return 1;break;
		case 0 : return 2; break;
		case 1 : return 3; break;
		case 2 : return 4; break;
		case 3 : return 5; break;
		case 4 : return 6; break;
		case 5 : return 7; break;
		case 6 : return 8; break;
		case 7 : return 9; break;
		default: return 0; break;
	}
}
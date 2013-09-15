var extra_strokes = 0;
var min_extra_per_hole = 0;
var stroke_index_dependend = 0;

exports.setStrokes = function (strokes){
	extra_strokes = strokes;
	//console.log('Extra strokes '+strokes);
	min_extra_per_hole = Math.floor(extra_strokes/9);
	//console.log('Minimal extra per hole ' +min_extra_per_hole+' strokes');
	stroke_index_dependend = extra_strokes - (min_extra_per_hole*9);
	//console.log('Hole dependend extra '+stroke_index_dependend+' strokes');
}

exports.showStrokes = function(){
	console.log('Extra strokes: ' + extra_strokes + ' Min per hole: ' + min_extra_per_hole + ' Stroke Index Dependend strokes: ' + stroke_index_dependend);
}

exports.calculateStableford = function(strokes, par,strokeindex){
	console.log("Calculating stableford - Stokes "+ strokes + " - par " + par +" - strokeindex: "+strokeindex);
	var hole_extra_strokes = min_extra_per_hole;
	if(stroke_index_dependend != 0)
	{
		if(strokeindex<stroke_index_dependend){
			hole_extra_strokes++;
		}
	}

	console.log("resultaat = ( par " + par +" + "+ hole_extra_strokes+ " ) - "+strokes );
	var result = (parseInt(par) + parseInt(hole_extra_strokes)) - parseInt(strokes);
	console.log(result);
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
var noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var row, column;
var theGrid = [];
var thisRow;
var rows = 16;
var columns = 32; 	
for (i = 0; i < rows; i++){
 		thisRow = [];
		for (j = 0; j < columns; j++){
			thisRow.push(-1);
		}
		theGrid.push(thisRow);
	}
$(document).ready(function(){
	var tweet = grid(16,32,$(".gridContainer"));
	var mouseIsClicked = false;
	var stepEntered = false;
	$('#plus').mousedown(function(){
		$('.newInstrument').toggleClass("clicked");
	});

	$('.row .step').mousedown(function(){
		mouseIsClicked = true;
		$(this).toggleClass("clicked");
			column = $(this).index();
			row = $(this).parent().index();
			theGrid[row][column] =  theGrid[row][column] * -1;
	}).mouseup(function(){
		mouseIsClicked = false;
	// }).mousemove(function(){
	}).mouseenter(function(){
		if(mouseIsClicked){
			$(this).toggleClass("clicked");
			column = $(this).index();
			row = $(this).parent().index();
			theGrid[row][column] *= -1;
			console.log('row:  ', row);
			console.log('column:  ', column);
			// console.log(theGrid);
		}
		// if($(this).mouseleave()){
		// 	$(this).toggleClass("clicked");
		// }

		// so you're basically saying if the div from the last mouse location is followed by the 
		// 
		// $(this).mouseleave(function(){
		// 	$(this).toggleClass("clicked");

		// });
	}).mouseleave(function(){
		//this.hasClass("clicked") then toggle???
		//

	});


	$(".newInsButton").click(function(){

		var instName = $("#insName").val();
		var rowCount = $("#rowCount").val();
		console.log("instName:  ", instName);
		console.log("rowCount:   ",rowCount);

	});


});










function grid(rows, columns, element){
	var w = Math.floor(100/columns);
	var h = Math.floor(100/rows);
	console.log("height," , element.height());
	console.log(element.width());
	var labels = $("<div class='gridlabels'></div>")
	//This creates the column of labels
	for(var i = 0; i < rows; i++){
		thisNote = noteNames[i%noteNames.length];
		thisOctave = Math.floor(i/noteNames.length);
		var rowLabel = $("<div class='rowlabel'>"+thisNote+thisOctave+"</div>").appendTo(labels);		
	}
	element.append(labels);

	//This creates the grid
	var gr = $("<div class='grid'></div>")

	for(var i = 0; i < rows; i++){
		var row = $("<div class='row'></div>").appendTo(gr);
		for(var k = 0; k < columns; k++){
			row.append("<div class='step'></div>");
		}
	}
	element.append(gr);

	$(".row").css({
		"height": h+"%"
	});

	$(".step").css({
		"width": w+"%"
	});



	$(".rowlabel").css({
	"height": h+"%"
	});

// // Create the polarity grid

	for (i = 0; i < rows; i++){
 		thisRow = [];
		for (j = 0; j < columns; j++){
			thisRow.push(-1);
		}
		theGrid.push(thisRow);
	}
	

	return gr;
}






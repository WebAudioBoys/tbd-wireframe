// node modules
var socket = io();

// initialize values
var noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var row, column;
var theGrid = [];
var thisRow;
var rows = 16;
var columns = 32; 

clock = new Tone.Clock(function(){
	console.log('time')
}, 2); //this is frequency whereas p5 was the duration of the tickp	
clock.start();



// page interaction
$(document).ready(function(){
	// initial grid and mouse states
	var tweet = grid(16,32,$('.gridContainer'));
	var mouseIsClicked = false;
	var stepEntered = false;


	//The tab toggler
	$(document).on("click","ul.tabs li a",function(){	
		var tab_id = $(this).attr('data-tab');
		console.log(tab_id);
		$('ul.tabs li a').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});





	// cell click
	$('.row .step').mousedown(function(){
		// track mouse state
		mouseIsClicked = true;
			

		
		// toggle style	
		// $(this).toggleClass("clicked");
		
		// toggle corresponding polarity grid cell
		column = $(this).index();
		row = $(this).parent().index();
		theGrid[row][column] =  theGrid[row][column] * -1;
			
		socket.emit('step',{
		row: row,
		column: column
		});
	
	// exit on unclick
	}).mouseup(function(){
		mouseIsClicked = false;
	
	// subsequent dragged cells
	}).mouseenter(function(){
		if(mouseIsClicked){

			// toggle corresponding polarity grid cell
			column = $(this).index();
			row = $(this).parent().index();
			theGrid[row][column] *= -1;
			
			socket.emit('step',{
			row: row,
			column: column
			});

		}
	});

	// create new instance from user menu specs
	$(document).on("click",".newInsButton",function(){
		//Get user information
		var instName = $("#insName").val();
		var rowCount = $("#rowCount").val();

		//Make new instrument the current instrument
		$('ul.tabs li a').removeClass('current');
		$('.tab-content').removeClass('current');
		
		//Create Tab
		var newTab = '<li><a class="tab-link current" data-tab="'+instName+'">'+instName+'</a></li>';
		$('.tabs').append(newTab);

		//Creating The New Grid
		var newPane = $('<div class="tab-content current" id="'+instName+'"></div>');
		
		var gc = $('<div class="gridContainer"></div>').appendTo(newPane);
		var thisElement = $('.tab-content.current .gridContainer');
		console.log(thisElement);

		var newGrid = grid(rowCount,32,gc);
		
		console.log(newGrid);

		// gc.append(newGrid);
		newPane.appendTo($('#tab-spot'));
		
	});



	socket.on('stepreturn',function(data){
		console.log('Somebody clicked');
		$(".row:eq("+data.row+") .step:eq("+data.column+")").toggleClass("clicked");
	})
});



// grid creation function for init and new tabs











function grid(rows, columns, element){
	// initial values
	var parent_id = element.parent().attr('id');
	console.log(parent_id);
	// var element = $("#"+id+" .gridContainer")
	var w = Math.floor(100/columns);
	var h = Math.floor(100/rows);
	var labels = $("<div class='gridlabels'></div>")
	console.log('the element',element);
	// console checks for grid dimensions
	console.log("height: " , element.height());
	console.log("width: ", element.width());

	// create the column of labels
	for(var i = 0; i < rows; i++){
		thisNote = noteNames[i%noteNames.length];
		thisOctave = Math.floor(i/noteNames.length);
		var rowLabel = $("<div class='rowlabel'>"+thisNote+thisOctave+"</div>").appendTo(labels);		
	}
	element.append(labels);

	// create the grid
	var gr = $("<div class='grid'></div>")

	for(var i = 0; i < rows; i++){
		var row = $("<div class='row' style='height: "+h+"% width=inherit'></div>").appendTo(gr);
		for(var k = 0; k < columns; k++){
			row.append("<div class='step' ></div>");
		}
	}
	
	element.append(gr);
	console.log(gr);

	// size elements based pct for flexible resizing
	$(".row").css({
		"height": h+"%"
	});
	$(" .rowlabel").css({
	"height": h+"%"
	});

	// Create the polarity grid for click/unclick
	for (i = 0; i < rows; i++){
 		thisRow = [];
		for (j = 0; j < columns; j++){
			thisRow.push(-1);
		}
		theGrid.push(thisRow);
	}

	// return completed grid
	return gr;
}




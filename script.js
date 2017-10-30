$(document).ready(function(){

	var tweet = grid(128,32,$(".gridContainer"));

	// var bump =  grid(10,32,$("#bump .gridContainer"));
	// var drums =  grid(16,32,$("#drums .gridContainer"));
var mouseIsClicked = false;
var stepEntered = false;
$('.row .step').mousedown(function(){
		mouseIsClicked = true;
		$(this).toggleClass("clicked");
	}).mouseup(function(){
		mouseIsClicked = false;
	// }).mousemove(function(){
	}).mouseenter(function(){
		if(mouseIsClicked){
			$(this).toggleClass("clicked");
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

	});

});




function grid(rows, columns, element){
	var w = Math.floor(element.innerWidth()/columns);
	var h = Math.floor(element.innerHeight()/32)-2;
	console.log("height," , element.height());
	console.log(element.width());
	var gr = $("<div class='grid'></div>")
	for(var i = 0; i < rows; i++){
		var row = $("<div class='row'></div>").appendTo(gr);
		for(var k = 0; k < columns; k++){
			row.append("<div class='step'></div>");
		}
	}
	element.append(gr);

	$(".step").css({
		"width": w+"px",
		"height": h+"px"
	});
	return gr;
}


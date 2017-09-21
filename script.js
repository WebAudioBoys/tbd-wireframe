$(document).ready(function(){

	var tweet = grid(16,32,$(".gridContainer"));




});




function grid(rows, columns,element){
	var w = Math.floor(element.innerWidth()/columns)-2;
	var h = Math.floor(element.innerHeight()/rows)-2;
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
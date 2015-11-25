'use strict';

//wait for document to load
$(document).ready(function() {

	var canvas = $('#canvas')[0]; //get the canvas HTML element via jQuery
	//0 allows you to get into the canvas - the DOM object - itself
	var brush = canvas.getContext('2d'); //2d or webgl (for 3d)

	brush.fillStyle = "#39275B";
	// brush.strokeStyle = "gold";

	// brush.fillRect(20, 50, 100, 200);	

	// brush.beginPath(); //create the path
	// brush.moveTo(200, 200);	//move to here
	// brush.lineTo(300, 400);	//drag my pen to here
	// brush.lineTo(200, 400);
	// brush.closePath();		//move back to where you started
	// brush.stroke();	//draw the path

	// brush.beginPath();
	// brush.arc(300, 300, 30, 0, 2*Math.PI);
	// brush.fill();

	//respond to mouse clicks in the canvas
	$('#canvas').click(function(event){			//or mousemove
	    //get location information from event
	    console.log(event);
	    var x = event.pageX - $('#canvas').offset().left;
		var y = event.pageY - $('#canvas').offset().top;

	    brush.beginPath();
	    brush.arc(x, y, 5, 0, 2*Math.PI);
	    brush.fill();

	});

	//global scope variable
	var rect = {
		x: 20,
		y: 30,
		width: 20,
		height: 70,
		speedY: 0
	};

	var ball = {
		x: 300 - 15,
		y: 240 - 15,
		radius: 15,
		speedX: 3,
		speedY: 3
	};

	var render = function() {
	  //erase the entire canvas
	  brush.clearRect(0, 0, canvas.width, canvas.height);

	  //code to draw the model.variables
	  brush.fillRect(rect.x, rect.y, rect.width, rect.height);
	  brush.beginPath()
	  brush.arc(ball.x + ball.radius, ball.y + ball.radius, ball.radius, 0, 2*Math.PI);
	  brush.fill();

	};

	render();	//draw the first time

	var update = function() {
		ball.x += ball.speedX;
		ball.y += ball.speedY;

		rect.y += rect.speedY;

		//left wall
		if (ball.x + 2 * ball.radius >= canvas.width) {
			ball.speedX *= -1;
		}
		//right wall
		if (ball.x < 0) {
			ball.speedX *= -1;
		}
		if (ball.y < 0 || ball.y + 2*ball.radius >= canvas.height) {
			ball.speedY *= -1;
		}
		//hit paddle
		if( rect.x <= ball.x+2*ball.radius  &&
		    ball.x <= rect.x+rect.width  &&
		    rect.y <= ball.y+2*ball.radius &&
		    ball.y <= rect.y+rect.height )
		{
		  ball.speedX *= -1;
		}
	}

	var renderFrame = function() {

		render();
		update();

		requestAnimationFrame(renderFrame);
	}

	requestAnimationFrame(renderFrame);


	// setInterval(function() {
	// 	ball.x += 3;

	// 	render();
	// }, 20);

	//respond to key pressed down in the *document*
	$(document).keydown(function(event){

	   //check which key (keycode) is pressed
	   // if(event.which == 37) {	//left arrow
	   //    //respond to key
	   //    rect.x += -5;

	   // }
	   // if(event.which == 39) {	//right arrow
	   //    rect.x += 5;

	   // }
	   if(event.which == 38) {	//up arrow
	      rect.y += -3;

	   }
	   if(event.which == 40) {	//down arrow
	      rect.y += 3;

	   }

	   render();	//redraw the rectangle in the right spot
	});

		$(document).keyup(function(event){

	   //check which key (keycode) is pressed
	   // if(event.which == 37) {	//left arrow
	   //    //respond to key
	   //    rect.x += -5;

	   // }
	   // if(event.which == 39) {	//right arrow
	   //    rect.x += 5;

	   // }
	   if(event.which == 38) {	//up arrow
	      rect.y = 0;

	   }
	   if(event.which == 40) {	//down arrow
	      rect.y = 0;

	   }

	   render();	//redraw the rectangle in the right spot
	});

});


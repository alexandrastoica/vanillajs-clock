(function(){
  function Clock(elem, output){
	var time = 0; 
	var repeat;
	var offset;
	var lapsArray = [];

	function update(){
		time += timePassed();
		var formattedTime = timeFormatter(time); //change time in hh:mm:ss format
		elem.textContent = formattedTime; //append it to the element
		repeat = requestAnimationFrame(update);
	}

	function timePassed(){
		var now = Date.now();
		var timePassed = now - offset; //get the time since start()

		offset = now;
		return timePassed;
	}

	function timeFormatter(timeMil){
		var time = new Date(timeMil);
		var hh = time.getHours(); 
		var mm = time.getMinutes();
		var ss = time.getSeconds();

		//add 0 in front of digits
		if(hh < 10){
			hh = '0' + hh;
		}
		if(mm < 10){
			mm = '0' + mm;
		}
		if(ss < 10){
			ss = '0' + ss;
		}
		//current time in string (hh:mm:ss format)
		var timeString = hh + " : " + mm + " : " + ss; 
		return timeString;
	}

	this.isOn = false; //clock is initially stopped

	this.start = function(){
		//start only if the clock is not on
		if(!this.isOn){
			repeat = requestAnimationFrame(update); //update time
			offset = Date.now(); //get the time from when the clock started
			this.isOn = true; //change flag
		}
	}

	this.stop = function(){
		//stop only if the clock is on
		if(this.isOn){
      //cancel animation
			cancelAnimationFrame(repeat); 
			this.isOn = false; //change flag
		}
	}

	this.destroy = function(){
		//reset time
		time = 0; 
		//reset elements and arrays
		elem.textContent = "00 : 00 : 00";
		lapsArray = [];
		output.innerHTML = '';
	}

	this.lap = function(){
		var formattedTime = timeFormatter(time);
		lapsArray.push(formattedTime);
		output.innerHTML += "<p>Current time: " + lapsArray[lapsArray.length - 1] + "</p>";
	}

	this.getSeconds = function(){
		var getSeconds = Math.round(time/1000);
		output.innerHTML += "<p>Seconds elapsed since start: " + getSeconds + "</p>";
	}
}

var timer = document.getElementById("timer");
var output = document.getElementById("output");

var clock = new Clock(timer, output);

var start = document.getElementById("start");
var stop = document.getElementById("stop");
var destroy = document.getElementById("destroy");
var lap = document.getElementById("lap");
var secondsElapsed = document.getElementById('seconds');

start.addEventListener('click', function(){
	if(!clock.isOn){
		clock.start();
	}
});

stop.addEventListener('click', function(){
	if(clock.isOn){
		clock.stop();
	}
});

destroy.addEventListener('click', function(){
	if(clock.isOn){
		clock.stop();
	}
	clock.destroy();
});

lap.addEventListener('click', function(){
	clock.lap();
});

secondsElapsed.addEventListener('click', function(){
	clock.getSeconds();
});
  
}());
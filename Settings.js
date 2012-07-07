// default constructor for GLSettings objects
function Settings () {
	// attributes
	this.mBackgroundColour = { r: 1.0, g: 0.0, b: 1.0 };
	this.mDebugging = true;
	this.mWithLogging = true;
	this.mTimeStepSizeSeconds = 0.1;

	// display settings in HTML area
	this.printAll = function () {
	
	}
	this.loadFromFile = function (url) {
		// create Ajax object (Asynchronous JavaScript and XML)
		var xmlhttp = new XMLHttpRequest();
		// define function that executes when response is ready
		xmlhttp.onreadystatechange = function() {
			// if response code is correct
			if (xmlhttp.readyState == 4) {
				// read a JSON format file to auto-create the object. add opening and closing parantheses
				gSettings = eval ("(" + xmlhttp.responseText + ")");
			}
		}
		xmlhttp.open("GET", url, false); // false means not asynchronous i.e wait here
		xmlhttp.send(null);
	}
}

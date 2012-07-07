/*------------------------------------------------------------*\
|   Javascript Code for an Encapsulated "Shader Programme"     |
|   Dr Anton Gerdelan                                          |
|   Trinity College Dublin                                     |
|   Ireland                                                    |
|   <gerdela@scss.tcd.ie>                                      |
|   First version 27 June 2012                                 |
\*------------------------------------------------------------*/

// constructor
function ShaderProgramme () {
	// GL handle of main shader programme
	this.mShaderProgrammeIdx = gl.createProgram();
	// GL location of vertex points in shader programme
	this.mVPAttribLoc = 0;
	// GL location of vertex texture coords in shader programme
	this.mVTAttribLoc = 0;
	// GL location of vertex normals in shader programme
	this.mVNAttribLoc = 0;
	// if using vertex points attribute
	this.mHasVPAttrib = false;
	// if using vertex texture coords attribute
	this.mHasVTAttrib = false;
	// if using vertex normals attribute
	this.mHasVNAttrib = false;
	// if using a diffuse map
	this.mHasDiffuseMapUniform = false;
	
	// use programme and enable attributes before rendering
	this.startRendering = function () {
		gl.useProgram (this.mShaderProgrammeIdx); // enable shader
		if (this.mHasVPAttrib) {
			gl.enableVertexAttribArray (this.mVPAttribLoc);
		}
		if (this.mHasVTAttrib) {
			gl.enableVertexAttribArray (this.mVTAttribLoc);
		}
		if (this.mHasVNAttrib) {
			gl.enableVertexAttribArray (this.mVNAttribLoc);
		}
	}
	
	// disable attributes after rendering
	this.stopRendering = function () {
		if (this.mHasVPAttrib) {
			gl.disableVertexAttribArray (this.mVPAttribLoc);
		}
		if (this.mHasVTAttrib) {
			gl.disableVertexAttribArray (this.mVTAttribLoc);
		}
		if (this.mHasVNAttrib) {
			gl.disableVertexAttribArray (this.mVNAttribLoc);
		}
	}
	
	// fetch from url, load, compile, and attach a vertex shader
	this.loadVertexShaderFromURL = function (url, popform) {
		var sourceString = getURLAsString (url);
		// populate the web form text area
		if (popform) {
			document.shadersform.vertextextarea.value = sourceString;
		}
		return this.loadVertexShader (sourceString);
	}
	
	// fetch from url, load, compile, and attach a fragment shader
	this.loadFragmentShaderFromURL = function (url, popform) {
		var sourceString = getURLAsString (url);
		// populate the web form text area
		if (popform) {
			document.shadersform.fragmenttextarea.value = sourceString;
		}
		return this.loadFragmentShader (sourceString);
	}
	
	// load, compile, and attach a vertex shader
	this.loadVertexShader = function (sourceString) {
		var vsidx = gl.createShader (gl.VERTEX_SHADER);
		gl.shaderSource (vsidx, sourceString);
		gl.compileShader (vsidx);
		// print any compile errors in an alert
		if (!gl.getShaderParameter (vsidx, gl.COMPILE_STATUS)) {
			alert (gl.getShaderInfoLog (vsidx));
			return false;
		} 
		gl.attachShader (this.mShaderProgrammeIdx, vsidx);
		return true;
	}
	
	// load,compile, and attach a fragment shader
	this.loadFragmentShader = function (sourceString) {
		var fsidx = gl.createShader (gl.FRAGMENT_SHADER);
		gl.shaderSource (fsidx, sourceString);
		gl.compileShader (fsidx);
		// print any compile errors in an alert
		if (!gl.getShaderParameter(fsidx, gl.COMPILE_STATUS)) {
			alert (gl.getShaderInfoLog (fsidx));
			return false;
		} 
		gl.attachShader (this.mShaderProgrammeIdx, fsidx);
		return true;
	}
	
	// link shader programme
	this.link = function () {
		gl.linkProgram (this.mShaderProgrammeIdx);
		// does this go here...I think so
		gl.validateProgram (this.mShaderProgrammeIdx);
	}
	
	// enable this as the shader programme to use for the next draw calls
	this.use = function () {
		gl.useProgram (this.mShaderProgrammeIdx);
	}
	
	// get handle to per-vertex attribute
	this.getAttributeLocation = function (attributeName) {
		return gl.getAttribLocation (this.mShaderProgrammeIdx, attributeName);
	}
	
	// get handle to a uniform variable
	this.getUniformLocation = function (variableName) {
		return gl.getUniformLocation (this.mShaderProgrammeIdx, variableName);
	}
	
	// set a unform variable value based on its location (might be a bit faster than looking up the name each time)
	this.setUniformIntByLocation = function (location, value) {
		gl.uniform1i (location, value);
	}
	
	// set a unform variable value based on its location (might be a bit faster than looking up the name each time)
	this.setUniformFloatByLocation = function (location, value) {
		gl.uniform1f (location, value);
	}
	
	// set a unform variable value based on its name
	this.setUniformMat4ByName = function (variableName, matrix) {
		var location = this.getUniformLocation(variableName);
		gl.uniformMatrix4fv (location, false, matrix);
	}
	// set a unform variable value based on its location (might be a bit faster than looking up the name each time)
	this.setUniformMat4ByLocation = function (location, matrix) {
		gl.uniformMatrix4fv (location, false, matrix);
	}
}

// get a plain text string from a url
function getURLAsString (url) {
	// create Ajax object (Asynchronous JavaScript and XML)
	var xmlhttp = new XMLHttpRequest();
	// define function that executes when response is ready
	xmlhttp.onreadystatechange = function() {
		// if response code is correct
		if (xmlhttp.readyState == 4) {
			// get as string
		}
	}
	xmlhttp.open("GET", url, false); // false means not asynchronous i.e wait here
	xmlhttp.send(null);
	return xmlhttp.responseText;
}

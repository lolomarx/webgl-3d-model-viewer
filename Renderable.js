/*------------------------------------------------------------*\
|   Javascript Code for an Encapsulated "Renderable" Object    |
|   Dr Anton Gerdelan                                          |
|   Trinity College Dublin                                     |
|   Ireland                                                    |
|   <gerdela@scss.tcd.ie>                                      |
|   First version 27 June 2012                                 |
\*------------------------------------------------------------*/

// constructor
function Renderable () {
	// if should be drawn
	this.mIsVisible = true;
	// index of shader programme to use
	this.mShaderProgrammeIndex = -1;
	// GL index of textures
	this.mDiffuseMapIdx = 0;
	// GL index of various buffers
	this.mVPBufferIdx = 0;
	this.mVTBufferIdx = 0;
	this.mVNBufferIdx = 0;
	// count of vertices in renderable
	this.mVertexCount = 0;
	this.mTriangleCount = 0;
	
	// create a vertex position buffer from given array
	this.createVPBuffer = function (data) {
		this.mVPBufferIdx = gl.createBuffer (); // create buffer
		gl.bindBuffer (gl.ARRAY_BUFFER, this.mVPBufferIdx); // open buffer
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (data), gl.STATIC_DRAW); // put data into buffer
		this.mVertexCount = data.length; // count vertices
		this.mTriangleCount = data.length / 3.0; // count triangles
	}
	
	// create a vertex texture coordinate buffer from given array
	this.createVTBuffer = function (data) {
		this.mVTBufferIdx = gl.createBuffer (); // create buffer
		gl.bindBuffer (gl.ARRAY_BUFFER, this.mVTBufferIdx); // open buffer
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (data), gl.STATIC_DRAW); // put data into buffer
	}
	
	// create a vertex normals buffer from given array
	this.createVNBuffer = function (data) {
		this.mVNBufferIdx = gl.createBuffer (); // create buffer
		gl.bindBuffer (gl.ARRAY_BUFFER, this.mVNBufferIdx); // open buffer
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (data), gl.STATIC_DRAW); // put data into buffer
	}
	
	// load a JSON format mesh. returns the populated object. easy. returns null on error.
	this.loadMeshFromJSON = function (url) {
		var json = null;
		// create Ajax object (Asynchronous JavaScript and XML)
		var xmlhttp = new XMLHttpRequest();
		// define function that executes when response is ready
		xmlhttp.onreadystatechange = function() {
			// if response code is correct
			if (xmlhttp.readyState == 4) {
				// read a JSON format file to auto-create the object. add opening and closing parantheses
				json = eval ("(" + xmlhttp.responseText + ")");
				return json;
			}
		}
		xmlhttp.open ("GET", url, false); // false means not asynchronous i.e wait here
		xmlhttp.send (null);
		this.createVPBuffer (json.mVertexPoints);
		this.createVTBuffer (json.mTextureCoords);
		this.createVNBuffer (json.mVertexNormals);
	}
	
	// render the object
	this.render = function (shaderprog) {
		if (!this.mIsVisible) {
			return;
		}
		// set up to sample diffuse map
		if (shaderprog.mHasDiffuseMapUniform) {
			gl.activeTexture (gl.TEXTURE0); // open harware slot 0
  		gl.bindTexture (gl.TEXTURE_2D, this.mDiffuseMapIdx); // stuff this texture into it
		}
		// set up to render vertex positions
		if (shaderprog.mHasVPAttrib) {
			gl.bindBuffer (gl.ARRAY_BUFFER, this.mVPBufferIdx); // open buffer (already has data in it)
			gl.vertexAttribPointer (shaderprog.mVPAttribLoc, 3, gl.FLOAT, false, 0, 0); // tell current shader how to get memory from buffer
		}
		// set up to render vertex texture coordinates
		if (shaderprog.mHasVTAttrib) {
			gl.bindBuffer (gl.ARRAY_BUFFER, this.mVTBufferIdx); // open buffer (already has data in it)
			gl.vertexAttribPointer (shaderprog.mVTAttribLoc, 2, gl.FLOAT, false, 0, 0); // tell current shader how to get memory from buffer
		}
		// set up to render vertex normals
		if (shaderprog.mHasVNAttrib) {
			gl.bindBuffer (gl.ARRAY_BUFFER, this.mVNBufferIdx); // open buffer (already has data in it)
			gl.vertexAttribPointer (shaderprog.mVNAttribLoc, 3, gl.FLOAT, false, 0, 0); // tell current shader how to get memory from buffer
		}
		// draw
		gl.drawArrays (gl.TRIANGLES, 0, this.mTriangleCount);
	}
}

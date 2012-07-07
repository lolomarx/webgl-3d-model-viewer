var gThumbsArray = new Array ();
var gGreyThumbsArray = new Array ();
var gMouseOverID = "thumb0";
var gDescriptionArray = new Array ();
var gScreensAArray = new Array ();
var gScreensBArray = new Array ();
var gMeshFileArray = new Array ();
var gDiffuseMapArray = new Array ();
var gNameArray = new Array ();
var gCamPosArray = new Array ();
var gCamLookAtArray = new Array ();

// loads a list of files describing meta-data for each model (mesh name, description, thumbnails, etc.) 
function loadModelMetaDataList (listfile) {
	var json = null;
	// create Ajax object (Asynchronous JavaScript and XML)
	var xmlhttp = new XMLHttpRequest ();
	// define function that executes when response is ready
	xmlhttp.onreadystatechange = function() {
		// if response code is correct
		if (xmlhttp.readyState == 4) {
			// read a JSON format file to auto-create the object. add opening and closing parantheses
			json = eval ("(" + xmlhttp.responseText + ")");
			// extract each meta data url
			var len = json.mMetaFiles.length;
			// load each model descriptor
			for (var i = 0; i < len; i++) {
				parseModelMetaData (json.mMetaFiles[i], i);
			}
		}
	}
	xmlhttp.open ("GET", listfile, false); // false means not asynchronous i.e wait here
	xmlhttp.send (null);
}

// populate page with model meta-data (thumnails etc.)
function parseModelMetaData (metafilename, index) {
	var json = null;
	// create Ajax object (Asynchronous JavaScript and XML)
	var xmlhttp = new XMLHttpRequest ();
	// define function that executes when response is ready
	xmlhttp.onreadystatechange = function() {
		// if response code is correct
		if (xmlhttp.readyState == 4) {
			// read a JSON format file to auto-create the object. add opening and closing parantheses
			json = eval ("(" + xmlhttp.responseText + ")");
			// go through array in json and populate thumbnails etc.
			loadModelThumb (json.mThumbFile, index);
			loadModelGreyThumb (json.mGreyThumbFile, index);
			gDescriptionArray[index] = json.mDescription;
			gScreensAArray[index] = json.mScreenShotAFile;
			gScreensBArray[index] = json.mScreenShotBFile;
			gMeshFileArray[index] = json.mMeshFile;
			gDiffuseMapArray[index] = json.mDiffuseMapFile;
			gNameArray[index] = json.mName;
			gCamPosArray[index] = json.mCamPos;
			gCamLookAtArray[index] = json.mCamLookAt;
		}
	}
	xmlhttp.open ("GET", metafilename, false); // false means not asynchronous i.e wait here
	xmlhttp.send (null);
}

// remember colour thumbnail
function loadModelThumb (url, index) {
	gThumbsArray[index] = url;
}

// put grey thumbnail on page, and remember it
function loadModelGreyThumb (url, index) {
	gGreyThumbsArray[index] = url;
	// work out thumnail name on page
	var thumbid = "thumb" + index;
	document.getElementById(thumbid).src = url;
}

function mouseOverImage (imgElement) {
	// get integer index from prev selection ID
	var oldindex = gMouseOverID.match (/\d+/); // this return 1,0 for 10
	// make previous selection grey
	document.getElementById (gMouseOverID).src = gGreyThumbsArray[oldindex];
	// remember current hoveree
	gMouseOverID = imgElement.id;
	var hoverindex = gMouseOverID.match (/\d+/); // this return 1,0 for 10
	// get id
	document.getElementById (imgElement.id).src = gThumbsArray[hoverindex];
} 

function mouseClickImage (imgElement) {
	// get integer index from prev selection ID
	var index = imgElement.id.match (/\d+/); // this return 1,0 for 10
	var textel = document.getElementById ("descriptiontext");
	textel.innerHTML = gDescriptionArray[index];
	// title
	document.getElementById ("meshname").innerHTML = gNameArray[index];
	// side images
	document.getElementById ("screenshotA").src = gScreensAArray[index];
	document.getElementById ("screenshotB").src = gScreensBArray[index];
	// load new mesh
	gCurrentMesh.loadMeshFromJSON (gMeshFileArray[index]);
	document.getElementById ("vertexcount").innerHTML = gCurrentMesh.mVertexCount;
	document.getElementById ("trianglecount").innerHTML = gCurrentMesh.mTriangleCount;
	// load texture
	gCurrentMesh.mDiffuseMapIdx = gl.createTexture();
	var imageData = new Image();
	imageData.onload = function() {
		gl.bindTexture(gl.TEXTURE_2D, gCurrentMesh.mDiffuseMapIdx);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
                //generate mipmaps
                gl.generateMipmap (gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // bi-linear filtering for too many fragments
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); // tri-linear filtering for too many texels
	}
	imageData.src = gDiffuseMapArray[index];
	// move camera
	gCam.mViewMat = mat4.lookAt (gCamPosArray[index], gCamLookAtArray[index], [0, 1, 0], gCam.mViewMat);
	gDebugGeomShader.setUniformMat4ByLocation (gDebugGeomShader_viewmat_loc, gCam.mViewMat);
}


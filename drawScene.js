function drawScene () {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// draw with debug shader
	gDebugGeomShader.startRendering ();
	
	gDebugGeomShader.setUniformMat4ByLocation (gDebugGeomShader_modelmat_loc, gModelMat);
	gCurrentMesh.render (gDebugGeomShader);
	
	gDebugGeomShader.stopRendering ();
	
	gFrameCount++;
}

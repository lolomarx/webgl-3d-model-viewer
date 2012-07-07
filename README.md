webgl-3d-model-viewer
=====================

Shows off a portfolio of your 3d models. Simple. Elegant. Throw stuff in and it works. Easy to extend. HTML5 and WebGL.
View a working version here: http://antongerdelan.net/3dmodelviewer/

instructions for adding a model
===============================
# convert your mesh into .json format. you can use my converter tool to convert .obj to .json
  # .obj mesh must be triangles, not quads
  # .obj mesh must have positions, texture coordinates, and normals
# create 2 thumbnails (I used 1 colour, and 1 greyscale of 32x32 pixel size)
# create a new description file in modelsmeta/
# add the name of the description file to modelsmetalist.json
# to add a new thumbnail tab to the web page, open up index.html and add

<img id="thumb6" src="thumbs/default.png" onClick="" />

you can add more, just change thumb6 to thumb7 thumb8 etc.
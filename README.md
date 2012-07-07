webgl-3d-model-viewer
=====================

Shows off a portfolio of your 3d models. Simple. Elegant. Throw stuff in and it works. Easy to extend. HTML5 and WebGL.
View a working version here: http://antongerdelan.net/3dmodelviewer/

install
=======
just copy all of this stuff into a folder on your web server.

instructions for adding a model
===============================
* convert your mesh into .json format. you can use my converter tool to convert .obj to .json
 * grab it here https://github.com/capnramses/.obj-to-.json-converter
 * .obj mesh must be triangles, not quads
 * .obj mesh must have positions, texture coordinates, and normals
* create 2 thumbnails (I used 1 colour, and 1 greyscale of 32x32 pixel size)
* create a new description file in modelsmeta/
* add the name of the description file to modelsmetalist.json
* to add a new thumbnail tab to the web page, open up index.html and add a new img element to the end block at lines 14-18. "thumb6." next time "thumb7".

customise
=========
* edit the .css file to change the colours and fonts
* the layout is just an HTML table in index.html
* the shaders are loaded from files ending in .glsl. the lighting is in there

current limitations/future extensions
=====================================
* it should be quite easy to add support for specular maps
* I'll add something to play animations in the near future
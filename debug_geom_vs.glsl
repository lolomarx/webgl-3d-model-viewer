attribute vec3 vp_loc;
attribute vec2 vt;
attribute vec3 vn_loc;
uniform mat4 projmat;
uniform mat4 viewmat;
uniform mat4 modelmat;

varying vec3 pos_eye;
varying vec2 texcoord;
varying vec3 norm_eye;

void main (void) {
	pos_eye = (viewmat * modelmat *  vec4 (vp_loc, 1.0)).xyz;
	texcoord = vt;
	norm_eye = (viewmat * modelmat *  vec4 (vn_loc, 0.0)).xyz;
	norm_eye = normalize (norm_eye);
	gl_Position = projmat * viewmat * modelmat * vec4 (vp_loc, 1.0);
}

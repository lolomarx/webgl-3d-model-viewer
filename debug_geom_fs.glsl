precision mediump float;

varying vec3 pos_eye;
varying vec2 texcoord;
varying vec3 norm_eye;
uniform sampler2D diffuse_map;

void main (void) {
	vec3 lightpos_wor = vec3 (10.0, 5.0, 10.0);
	vec3 s = normalize (lightpos_wor - pos_eye);
	float ndots = dot (norm_eye, s);

	vec3 Ld = vec3 (0.6, 0.6, 0.6);
	vec4 Kd = texture2D (diffuse_map, texcoord);
	vec3 Id = Ld * Kd.rgb * ndots;
	vec3 La = vec3 (0.2, 0.2, 0.2);
	vec3 Ia = La * Kd.rgb;
	
	gl_FragColor = vec4 (Ia + Id, Kd.a);
	//gl_FragColor = vec4 (ndots, ndots, ndots, 1.0);
}

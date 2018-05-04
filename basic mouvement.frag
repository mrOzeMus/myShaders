// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float DistLine(vec3 ro, vec3 rd, vec3 p){
    return length(cross(p- ro, rd))/ length(rd);
}

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv -= .5;
    uv.x*= u_resolution.x / u_resolution.y;
	vec3 ro = vec3(0.0, .0, -2.);
    vec3 rd= vec3(uv.x, uv.y, .0)-ro;
    
   // vec3 p = vec3(.0, .0, 2.);
    vec3 p= vec3(.3*sin(u_time), 0. , 1. + cos(u_time));
    float d = DistLine(ro, rd, p);
    
    d=smoothstep(.1,.09,d);
    
    gl_FragColor= vec4(d);

}
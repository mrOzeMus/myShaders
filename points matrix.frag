// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float map (vec3 p){
    
    vec3 q =fract(p) * 2.0-1.0;
    return length(q) -abs((cos(u_time / 2.400)+1.0));
    
}


float trace(vec3 o, vec3 r){
    float t= 0.0;
    for (int i= 0; i<5; ++i){
        vec3 p = o + r * t;
        float d= map(p);
        t += d *-1.660;
    }
    return t;
}



void main() {
	
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 -0.936;
    uv.x *= u_resolution.x / u_resolution.y;
    
    
    vec3 r = normalize(vec3(uv, 1.0));
    r.xy *= tan(u_time/8.336) * -0.170*mat2(.8*cos(u_time), -sin(u_time), sin(u_time), cos(u_time));
    vec3 o= vec3(.0, .0, u_time);
    float t= trace(o,r );
    
    float fog = 4.832/ (1.0 +t *t *.1);
    vec3 fc =vec3(fog);
    
    
    
    
    
    
    gl_FragColor = vec4(fc, 1.0);
}
// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float Band(float t, float start, float end, float b){
    
    float step1 = smoothstep(start - b, start +b, t);
    float step2 = smoothstep(end + b, end -b, t);
    
    
    return step1*step2;   
    
}

float Rect(vec2 uv, float left, float right, float bottom, float top, float blur){
    float band1 = Band(uv.x, left, right, blur);
    float band2 = Band(uv.y, bottom, top, blur);
    
    return band1* band2;
    
    
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	uv -= .5;
    uv *= u_resolution.x/ u_resolution.y;
    
 	float mask =0.;
    
    float x = uv.x;
    float y =uv.y;
    
    

    
    
    
    
    vec3 col = vec3(1.);
    col*= Rect(vec2(x,y), -.4, .2, -.3, .3, .05*abs(cos(u_time)));

    gl_FragColor = vec4(vec3(col), 1.);
}
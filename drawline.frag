// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
    float b= 0.03;
    return smoothstep(pct - b, pct, st.y) - smoothstep(pct, pct+ b,st.y);
    
}



void main() {
	
    vec2 st = gl_FragCoord.xy / u_resolution;
    float x = st.x;
    float y= st.y;
    
    float t = u_time;

   vec3 color = vec3(y);
    //x+= t/2.;
    //float var = cos(8.*x)*tan(x)*sin(x*x/100.);
    float var = x;
    //var *=.4;
	//var+=.5;
    
    
    float pct = plot(st, var);
    
    
    //y = step(.5, x);
    
    
    
    gl_FragColor = vec4(pct);
}
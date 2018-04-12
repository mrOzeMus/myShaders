// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    uv -= vec2(.5);
    uv *=2.0;
    uv*=.1;
    
    //uv*= .7;
    float distance = length(uv);
    
    distance=smoothstep(.2,-0.256,distance);
    
    float angle =atan(uv.y ,uv.x);
    
    float var =10.*5.424;
    var *= sin(u_time* -0.836);
    float color = sin(distance *var*distance+ angle);
    color*= .8;
    
    gl_FragColor= vec4(1.-color*2.528*cos(20.+u_time), color*0.328 ,color*-0.420*cos(u_time)*1. , 1.);

}
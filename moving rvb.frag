// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot( vec2 st, float pct){

    float var = cos(u_time) / 10.;
    return( smoothstep(pct - var,pct, st.y) - smoothstep(pct, pct +var, st.y));
    
}


float Circle(vec2 uv, vec2 center){
    float l = distance(uv, center);
    l *= 3.;
    l = smoothstep(.2, .8, l);
    return 1.-l;
    
}

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    float tx = cos(u_time)+1.;
    float ty = sin(u_time)+1.;
    
    float c1 = Circle(uv, vec2(.5*tx*ty,.5*.2*ty));    
    float c2 = Circle(uv, vec2(.35*tx,.4*ty));
    float c3= Circle(uv, vec2(.2*ty,.84*tan(tx)));
    
    
    float t = u_time;
    
    
    
    
    
    float r=distance(uv,vec2(0));
    uv *= r;
        
    
    float c= c1 + c2 + c3;
   
    gl_FragColor= vec4(c1, c2, c3, 1.);

}
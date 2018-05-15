// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
    
    vec2 pixels = gl_FragCoord.xy / u_resolution;
    vec2 q = pixels - vec2(0.260,0.740);
    
	//creation background
    vec3 color = mix(vec3(0.935,0.292,0.382), vec3(0.150,0.279,0.880), pow((pixels.y),.9));
    
    //creation haut du palmier
	float r= 0.20 + 0.128*cos(atan(q.y, q.x)*10. + 32.880*q.x + 0.216);    
    color *= smoothstep(r, r+0.01, length(q));
    
    //creéation tronc
    r=0.015 ;
    r += 0.003*cos(120.0*q.y);
    r += exp(-60.032 * pixels.y); //pour agrandir tronc du palmier
    color *= 1.0 - (1.0 - smoothstep(r, r+0.001, abs((q.x)-0.1*sin(4.0*q.y))))* (1.0 - smoothstep(-0.396,0.134, sin(q.y)));
    
    gl_FragColor = vec4(color, 1.0);
}
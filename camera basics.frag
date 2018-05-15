// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 mouse = u_mouse;
    mouse -= .5;
	vec2 uv = gl_FragCoord.xy / u_resolution;
    uv -=.5;
    uv.x *= u_resolution.x/ u_resolution.y;
    
    mouse /= u_resolution;
    float d =0.;
    
    //ray origin
    vec3 ro = vec3(0.263,-0.209,-0.323);
	
    //ray direction 
    vec3 rd = vec3(uv.x , uv.y, 0.)-ro;
    //poinst dont on veut calculer la projection
    vec3 p= vec3(0.,0.,.5);
    //calcul de la distance par rapport au rayon sur la projection
    float distLine = length(cross( p-ro, rd ))/length(rd);
    //visualization avec smmothstep
    float proj1 = 1.- smoothstep(0., .1, distLine);
    
    d+= proj1;
    
    
    vec3 p2=vec3(.0, .0 ,1.);
    distLine= length(cross(p2-ro, rd)) /length(rd);
    float proj2 = 1.0 - smoothstep(0., .1, distLine);
    d+= proj2;
    
        
    vec3 p3=vec3(.0,.5,0.2);
    distLine= length(cross(p3-ro, rd)) /length(rd);
    float proj3 = 1.0 - smoothstep(0., .1, distLine);
    d+= proj3;
    
        vec3 p4=vec3(.0,.8,1.);
    distLine= length(cross(p4-ro, rd)) /length(rd);
    float proj4 = 1.0 - smoothstep(0., .1, distLine);
    d+= proj4;
    
    gl_FragColor = vec4(d);
    

  
}
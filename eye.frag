// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hash( float n ) { 
    return fract(sin(n)*43758.5453123);
} 

float noise( in vec2 x ) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0;
    return mix(mix( hash(n+ 0.0), hash(n+ 1.0),f.x), mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y); 
}

mat2 m = mat2( .8, .6, -.6, .8);

float fbm(vec2 p){
    //flou brownien
    float f = 0.0;
    f += 0.500 * noise(p); p*= m*2.02;
    f += 0.250 * noise(p); p*= m*2.03;
    f += 0.125 * noise(p); p*= m*2.01;
    f += 0.0625 * noise(p); p*= m*2.04;
	f/= 0.9375;
    return f;

}


void main(){
    
    vec2 q= gl_FragCoord.xy / u_resolution;
    vec2 p = -1.0 + 2.0*q;
    p.x *= u_resolution.x/u_resolution.y;
    
    float background = smoothstep( -.10, .25, p.x);
    float f = fbm(32.0*p);
	float r= pow(dot(p,p),.52);
    float a = atan(p.y,p.x);
    
    vec3 color = vec3(1.);    
    
    if( r< 0.8){
        
     //   a-= .85*fbm(.2*p*cos(u_time+1.1));
        color = vec3(.2, .3, .4);
    	float f = fbm(5.0*p);
        color = mix(color, vec3(.2,.5,.4), f);
        
        f=1.0 - smoothstep(.2, .5, r);
        color = mix(color, vec3(0.900,0.421,0.102), 0.936*f);
         
        a += .5* fbm(.2*p*cos(u_time));
        
        f= fbm(vec2(5.0*r,20.0*a));
        f=smoothstep(.2,.9, f);
        color=mix(color, vec3(0.885,0.838,0.821)
                  , f);
        
        f=smoothstep(.3,.9, fbm(vec2(8.0*r, 10.0*a)));
        color *= 1.0 -f;
        
        f=smoothstep( .6 , .8, r);
        color *= 1.0 - .5*f;
        
        f=smoothstep(.12, .25, r );
        color *= f;
        
        f= 1.-smoothstep( .0, .2, length(p - vec2(0.3,0.3)));
        color += vec3(1., .8,.9)*f;
        
        f=smoothstep(.65, .8, r);
        color = mix(color, vec3(1.0), f);
            
    }
    
    
   // color *= background;
	gl_FragColor= vec4(color, 1.0);
}
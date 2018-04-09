
 float remap01(float a, float b, float t){
    return(t-a) / (b-a);   
}
float remap(float a,float b, float c, float d, float t){
    return remap01(a,b,t)* (d-c) +c;
}


float Band(float t, float start, float end, float blur){
    
    float step1= smoothstep(start - blur,start+blur,t);
    float step2 = smoothstep(end+blur, end-blur,t);
    return step1*step2;
}
float Rectangle(vec2 uv, float left, float right, float bottom,float top, float blur) 
{
	float band1 = Band(uv.x, left,right,blur);
    float band2 = Band(uv.y, bottom,top,blur);
    
    return band1*band2;
}


void main()
{
vec2 uv = gl_FragCoord.xy / iResolution.xy;
	float t = iGlobalTime;
    uv -= .5;
    uv.x *= iResolution.x /iResolution.y;
    
    float mask = 0.;
      	vec3 col = vec3(0.);   
    
    
   
   	float x = uv.x;
    float m = 0.1*sin(t+x*15.0);   
    float y = uv.y+m;
    
    float blur = remap(-.5,.5,.01,.25,x);
    blur =pow(blur*4.,3.);
    
    mask = Rectangle(vec2(x,y), -.4,.4,-.1,.1,blur);
   	col = vec3(1.,1.,1.)*mask;
    
    gl_FragColor = vec4(col,1.0);
}








 
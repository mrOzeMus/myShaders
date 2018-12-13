float mycircle(vec2 st, vec2 cent, float rad){
  return (1. -smoothstep(rad, rad+.8*rad,length(st-cent)));
}

void main(){

  vec2 uv = gl_FragCoord.xy / iResolution.xy;


// float col = circle(uv, vec2(.5), 34);
// float col =step(.3, uv.x);
float col = .0;


for(int i = 0;i<900;i++){
// vec2 posM = vec2(iMouse.xy/iResolution.xy);
float mouseY = iMouse.y/iResolution.y;
mouseY*=.2;
mouseY+=fract(cos(pow(iTime*2.,.3) *.2)*.2);
float myRad =mouseY/10.;
// myRad=clamp(myRad, .001, .2);

myRad = myRad/200.;
vec2 posM = vec2(0.5);
float fact = float(i);
// float myTime = iTime * iMouse.x/iResolution.x* 30.;
float myTime = iTime / 30.;
// myTime = mod(myTime, .01);
myTime = fract(uv.x * fract(uv.y))*5.;
myTime=myTime/25.; 
float myTime2 = iTime/5.;
myTime2 = myTime2/10.;
posM += .2 * vec2(cos(myTime * fact)+ cos(myTime2*.4*float(i)) , sin(myTime * fact));
float col1 = mycircle(uv, posM, myRad* .3*float(i));
col += col1;
}


vec3 color=vec3(smoothstep(.8,.4,col*uv.x/3.)*iMouse.x/iResolution.x, .3*smoothstep(.0,.8,col*uv.y), .5);
  gl_FragColor = vec4(color, .2);
}
float rect(vec2 uv, float left, float right, float bottom, float up){
  return(step(left, uv.x) - step(right, uv.x))*(step(bottom, uv.y)-step(up, uv.y));
}
void main(){
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec3 col = vec3(.0);

  // uv.x = cos(uv.y);

  float rect1 = rect(uv, .2,.5, .2, .6);
  col += rect1;

  // uv.x *= iMouse.x/ iResolution.x;
  // uv.y /= iMouse.y/iResolution.y;

  col = vec3(.0);
  float cir1 = smoothstep(.3, .5,length(uv- vec2(.5+ sin(iTime/20.))));;
  // cir1 = fract(cir1); 
  // cir1 = fract(cir1*10.);
  float cir2 = length(uv-vec2(.3*cos(iTime*uv.y/3. * cir1)));
  float cir = cir1+cir2; 


  cir = fract(cir *23.*iTime/10.* iMouse.x/iResolution.x);

  col = vec3(cir);
  
  gl_FragColor = vec4(clamp(.2,.5,col.x)/0.4, .0, smoothstep(.0,.9,abs(cos(iTime/12.)/2.)), 1.);
  // vec3 mouse = vec3(iMouse.x/iResolution.x);
  // gl_FragColor = vec4(mouse, 1.0);
}
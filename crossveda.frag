
precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;



float box( vec2 uv, vec2 pos, float l, float h){
  float temp = 1. - step(uv.x , pos.x - l/2.);
  temp *=  step(uv.x, pos.x + l/2.);
  temp *=  1. - step(uv.y, pos.y - h/2.);
  temp *=  step(uv.y, pos.y + h/2.);

  return temp;
}


mat2 rotate2d(float angle){
return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(void){

  vec2 uv = vec2(gl_FragCoord.xy / resolution.xy);

  uv -= vec2(.5, .5);
  uv *= rotate2d(sin(time));
  uv += vec2(.5,.5);

  float b1 = box(uv, vec2(.5,.5), .1, .06);
  float b2 = box(uv, vec2(.5,.5), .04, .2);

float b = b1 + b2;
  gl_FragColor = vec4(vec3(b) ,1.);

}

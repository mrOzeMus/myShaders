precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define S(a,b,t) smoothstep(a, b, t);

vec2 random(vec2 p){
  return
  fract(sin(vec2(dot(p, vec2(125.1, 341.4)), dot(p,vec2(234.4, 342.43))))*343.34);
}
vec3 palette(in float t, in vec3 a, in vec3 b , in vec3 c , in vec3 d){
  return a + b*cos( 6.238318* (c*t+d));
}

void main(void) {
  vec2 uv = gl_FragCoord.xy /resolution.xy;
  vec3 color;
  // color += palette(time, vec3(.3,.2, .234), vec3(.3,.3,.2), vec3(.3, .53, .53), vec3(.234, .534 ,.234));
  float limit = .3;
  limit = .3 + .03 * sin(time * 2.) * sin(40. * uv.y + time*14.) ;
  if(uv.x < 2.*limit) color = vec3(.9);
  if( uv.x < limit) color = vec3( .0, .0, .5);
  if( uv.x > .3 + 2. * limit * .9*abs(.5 + cos(time + 1325.21))) color = vec3(.5, .0, .0);
    gl_FragColor = vec4(color,  .5);
}

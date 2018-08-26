precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define S(a,b,t) smoothstep(a, b, t);

float angle = 0.;
float DistLine(vec2 p , vec2 a, vec2 b){
  vec2 pa = p-a;
  vec2 ba = b-a;
  float t = clamp(dot(pa,ba)/ dot(ba, ba), .0, .2);
  return length(pa - ba*t);
}

 float circle(vec2 position, vec2 center, float radius){
  float val =  length(position - center );
  val = smoothstep(radius, radius+ 0.04, val);
  return val;
 }
// c#
float map(float s, float a1, float a2, float b1, float b2)
{
    return b1 + (s-a1)*(b2-b1)/(a2-a1);
}
void main(void) {
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  vec2 center = vec2( .5, .5);
  float c1 = circle(position, vec2(.5,.5), .5);

  float c2= .0;
  c2 = 1. - circle(position, vec2(.5,.5), .3);
  c2 *= sin(time);

  angle += .2;
  // val *= .1;
  vec3 col = vec3(c1) + vec3(.0, c2, .0);


  float x = abs(cos(angle)) * position.x ;
  float thickness = .01;
  float y = smoothstep(position.y, 2. * x , .0);
  float y2 = smoothstep(position.y + thickness, 2. * x ,.2);
  y = y2 - y;

  col = vec3(.0);

  for(float i = 0.0 ; i< 30. ; i++){
  float pt;
float ptx = cos(time + i)/2. + .5;
float pty = sin(time + i)/2. + .5;
float factor = .4;
// float factor = sin(time);
// factor = fract(time);
ptx = map(ptx, 0. , 1., (1. - factor) /2., 1. - (1. - factor)/2.);
pty = map(pty, 0. , 1., .3, .7);
  pt = circle(position , vec2(ptx, pty), .02);
  pt = 1. - pt;
  col += vec3(pt);

  }
gl_FragColor = vec4(col, 1.);
}

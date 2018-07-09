precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define S(a,b,t) smoothstep(a, b, t);

float DistLine(vec2 p , vec2 a, vec2 b){
  vec2 pa = p-a;
  vec2 ba = b-a;
  float t = clamp(dot(pa,ba)/ dot(ba, ba), .0, .2);
  return length(pa - ba*t);
}
void main(void) {
  vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 4.0;
  position = position * 2. -1.;
  float d = DistLine(position , vec2(0.), vec2(1.));
  float m = S(.1, .5, d);
  float color = position.y*position.x;
  vec3 col = vec3(m);
gl_FragColor = vec4(col, 1.);
}

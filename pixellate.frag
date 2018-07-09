precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

  float param_a = .2, param_b = .5;
float circle(vec2 uv, vec2 center, float radius){
  float result = distance(uv, center);
  result =step(radius, result);
  return result;
}

float random(vec2 uv){
  return fract(sin(dot(uv, vec2(12.432,123.34)))* 483990.);
}
void main(void) {
  vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 4.0;
  position *= 10.;
  position = - abs(position);
  position = floor(position);
float color = random( position + .000001 *time);

gl_FragColor = vec4(vec3(color, position.x, color*color),1.);
}

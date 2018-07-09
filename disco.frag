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
vec2 truchet(vec2 _st, float _index){
  _index = fract(((_index-0.5) * 2.));
  if(_index > fract(time/2.)){
  _st = vec2(1.) - _st;
  }
  else{
    _st = vec2(.5,.9);
  }
  return _st;
}

void main(void) {
  vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 4.0;
  // vec2 screen = position*cos(time);
  vec2 screen = position * 20.;

  // screen += .4;
  // screen *= 10.;
  vec2 ipos = floor(screen);
  vec2 fpos = fract(screen);
  vec2 tile = truchet(fpos, random(ipos));

  // float color = tile.x * tile.y;
  float color = smoothstep(tile.x- .3, tile.x, tile.y)-
                smoothstep(tile.x, tile.x + .3, tile.y);
gl_FragColor = vec4(vec3(color), 1.);
}

precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define S(a,b,t) smoothstep(a, b, t);

float plot(vec2 position, float pct){
  return smoothstep(pct - 0.02, pct, position.y) -
          smoothstep(pct, pct + 0.02, position.y);
}

float y(float x){
  float amplitude = .2;
  float frequency = 14.;

  float t = time ;
  float function = sin(frequency * x + t);
  function += .3 * sin(x * frequency /2. * mouse.x);
  function += .6 * sin(x*2.948  * frequency * .34  + time * 3.3 );
  function += .245 * sin(x * frequency * 1.62);
  function *= amplitude;
  function += .5;
  return function;
}

void main(void) {
  vec2 uv = gl_FragCoord.xy /resolution.xy;


vec3 color;

  float line = plot(uv,y(uv.x));
  color = vec3(line);
  gl_FragColor = vec4(color,  1.);
}

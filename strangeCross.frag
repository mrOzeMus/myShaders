
precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float rayon(vec2 uv, float limit, float thickness, float blur ){
  return smoothstep(limit, limit + blur, uv.x / uv.y) - smoothstep(limit + thickness, limit + thickness + blur, uv.x / uv.y);
}

mat2 rotate2d(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(void){
  vec2 uv = vec2(gl_FragCoord.xy);
  uv = uv / resolution.xy;

  // uv= fract(uv * 5.);

  vec2 center= vec2(.5, .5);

  uv -= center;
  uv *= rotate2d(time);
  uv += center;

  vec2 newPos = uv - center;
  // uv = uv + center;
  float l = .0;
  for(float i = 0.; i < 15.; i++){

  float l1 = rayon(newPos, fract(uv.x) * i * sin(time/ 2.), .1 , .1 *i );

  l += l1;
  // float l = mix(l1, l2 , .3);
  }




  gl_FragColor = vec4( vec3(l) , 1.);
}

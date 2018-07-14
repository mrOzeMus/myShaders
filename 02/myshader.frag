/*
{
server:3000
}
*/

precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D camera;
uniform vec2 mouse;

float DrawRect(vec2 uv, vec2 bottom_left, vec2 top_right){
  vec2 a = step(bottom_left, uv);
  // vec2 b = step(top_right, vec2(1.) - uv);
  vec2 b = step(top_right,  uv);
  b = vec2(1.0) - b;
  return  a.x * a.y * b.x * b.y;
}

float Pavage(vec2 uv, vec2 separation){
    float rec1 = DrawRect(uv, vec2(-1.), separation);
    float rec2 = DrawRect(uv, separation, vec2(1.0));
    return rec1 + rec2;
}

float PavageCircle(vec2 uv, vec2 separation, float radius){
     float a = distance(uv, vec2(.0));
     vec2 b = step(vec2(a), uv);
     a= b.x * b.y;
    return a;
}
void main() {
  vec2 uv = gl_FragCoord.xy / resolution;

  // float rect1 = Pavage(uv, mouse);
  vec2 movi = vec2(
    .5 + .5*cos(time/2.14)
    );
  float rect1 = Pavage(uv, movi);
  float rect2 = Pavage(uv, vec2(movi)+ vec2(.1, .4*cos(mouse.x)));


  uv = uv * 2.0 - 1.;

  float rectangles = rect1 + rect2 ;
  for(float i = -1. ; i< 1.; i+= .2){
    float rect = Pavage(uv, vec2(i));
    rectangles+= rect;
  }

  for(float i = -2.; i <2.; i += .4){
  vec2 myVect = vec2(i* mix(.7 , .9, cos(time)));
  float moving = Pavage(uv, myVect);
  rectangles += moving;

  }


  float circle1 = PavageCircle(uv, vec2(.0), 2. );
  rectangles+= circle1;

  // float rect2 = Pavage(uv, vec2(.1));
  // float rect3 = Pavage(uv, vec2(cos(time)));
  // float rect4 = Pavage(uv, vec2(cos(time+ 0.3)));
  // rectangles += rect3 + rect4;
  // rectangles += rect5 + rect6;
  vec3 col = vec3(mod(rectangles, 2.));
  gl_FragColor = vec4(col, 1.0);
}

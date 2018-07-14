/*
{
"camera": true,
"server": 3000 }
*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D camera;
uniform vec2 mouse;


float DistLine(vec3 ro, vec3 rd, vec3 p){
  return length( (cross(p-ro, rd) / length(rd)));
}
float DrawPoint(vec3 ro, vec3 rd, vec3 p){
    float d = DistLine(ro, rd, p);
    d= smoothstep( .07, .03, d);
    return d;

}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv =  uv -.5;
    uv = uv + mouse / 4.;


    vec3 rayOrigin = vec3(0. , sin(time)/ 3.0, -2.0+ cos(time/2.5));
    vec3 rayDirection = vec3(uv, cos(time)) - rayOrigin;

    vec3 p = vec3(cos(time), 0. ,5. + 4. *sin(time));

    float point1 = DrawPoint(rayOrigin, rayDirection, p);
    float point2 = DrawPoint(rayOrigin, rayDirection, vec3(p.x /2., .2* sin(time/100.), p.z*cos(time)));
    float scene = point1 + point2;
    int test  = 40;
    for(int i = 0 ; i< 400; i++){
      float newPoint = DrawPoint(rayOrigin, rayDirection, vec3(p.x + sin(float(i)), cos(float(i)+ time), p.z));
      scene += newPoint;
    }
    gl_FragColor = vec4(scene);


}

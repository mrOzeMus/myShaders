
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif


varying vec4 vertColor;
varying vec4 vertTexCoord;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 myPosition;
uniform vec2 u_mouse;

float circle(vec2 uv){
    uv.x -= myPosition.x;
    uv.y -= myPosition.y;
    uv.y -= u_mouse.y / u_resolution.y;
    uv.x -= u_mouse.x / u_resolution.x;
    uv += 0.5;
    // uv.x = myPosition.x;
    // uv.y = myPosition.y;
    float d = length(uv);
    d*=20*(sin(u_time)*2 + 2.0);
    d= smoothstep(0.4, 0.5, d);
    return d;
}


void main() {
    vec2 uv = vertTexCoord.xy;
    // uv.x = 4* fract(uv.x);

    vec3 color = vec3(1.);
    color *= circle(uv);
    color = vec3(1.) - color;
    gl_FragColor = vec4(color, color.x);
    


    // gl_FragColor.x *= sin(u_time)* 2 + 1;
}
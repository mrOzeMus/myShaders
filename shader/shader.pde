PShader shader;


float myPositionX = 0.5;
float myPositionY= 0.5;


void setup() {
  size(1080,720, P2D);
  noStroke();
  smooth();
  background(255);
}

void draw() {
  //background(255, 0, 0);
  // myPositionX += noise(myPositionX + 0.0001)/width;
  //myPositionX += random(-1.0, 1.0) / 100;

  //println(noise(0.00001));
  //myPositionY += noise(myPositionY + 0.0001)/height;

  shader = loadShader("shaderFrag.glsl", "shaderVert.glsl");
  shader.set("myPosition", myPositionX, myPositionY);
  float r=random(1);
  float g=random(1);
  float b=random(1);

  float rectLength=200;
  shader.set("fraction", sin(frameCount/100));
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);

  //box(rectLength);

  pushMatrix();


  shader(shader);
  rect(0, 0, width, height); 

  popMatrix();
}

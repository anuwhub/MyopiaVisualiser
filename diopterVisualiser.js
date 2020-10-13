let far = 0.25;
let dRange = 5;
let near = dRange+far;
let useMouse = false;

let dInp;
let cmInp;

function setup() {
  createCanvas(800, 400);

  checkbox = createCheckbox('use mouse', false);
  checkbox.position(20, 80);
  checkbox.changed(useMouseCheck);

  dInp = createInput(-0.25, 'number');
  dInp.position(20, 20);
  dInp.input(updateD);
  dInp.attribute('step', '0.25');

  cmInp = createInput(400, 'number', 3);
  cmInp.position(20, 50);
  cmInp.input(updateCm);
  
  textAlign(LEFT, BOTTOM);
}

function mousePressed(){
  console.log(mouseX, mouseY);
  return false;
}

function draw() {
  background(19, 200, 153);
  
  noStroke();
  fill(255);
  textSize(15);
  text('equivalent dioptres', 200, 42);
  text('centimetres until blur', 200, 72);
  textSize(10);
  text('-0.00 -->', 758,387);
  text('(infinity)', 758,398);
  text('-0.25', 430,310);
  text('-0.50', 235,267);
  text('-0.75', 170,253);
  text('-1.00', 135,245);

  fill(255);
  ellipse(40, 200, 20, 20);
  fill(0);
  arc(50,200,10,10,HALF_PI+0.3,PI+HALF_PI-0.3);
  arc(45,200,10,15,-0.9, 0.9);

  noFill();
  //stroke(200,255,200);
  stroke(0, 150, 50);
  for(let i=5; i>0; i-=0.25){
    let x = (1/i*100)+50;
    arc(4, 200, x*2, x*2, TAU-0.212, TAU+0.212);
  }

  for (let i=near; i>far; i-=0.25) {
    let x = (1/i*100)+50;
    stroke(255, (near-i)/dRange*255, (near-i)/dRange*255);
    arc(4, 200, x*2, x*2, TAU-0.212, TAU+0.212);
  }
  stroke(255);
  let x = (1/far*100)+50;
  arc(4, 200, x*2, x*2, TAU-0.212, TAU+0.212);
  
  line(50, 190, 830, 22);
  line(50, 210, 830, 378);

  fill(19, 200, 153);
}

function useMouseCheck() {
  useMouse = !useMouse;
}

function updateD() {
  if (isFinite(dInp.value()) && dInp.value()<=0) {
    far = -1*dInp.value();
    near = far + dRange;
    cmInp.value(-1/dInp.value()*100);
  } else {
    dInp.value(0.00);
  }
}

function updateCm() {
  if (isFinite(cmInp.value()) && cmInp.value()>0) {
    far = 1/cmInp.value()*100;
    near = far + dRange;
    dInp.value(-far);
  } else {
    cmInp.value(1);
  }
}

function mouseDragged() {
  if (useMouse) {
    let diopter = cmToD(mouseX-54);
    if (diopter>0 && isFinite(diopter)) {
      console.log("diopter equal to -"+diopter);
      far = diopter;
      near = far+dRange;
      
      dInp.value(-diopter);
      cmInp.value(dToCm(-diopter));
    }
  }
}

function cmToD(cm){
  return 1/(cm/100);
}

function dToCm(d){
  return -1/d*100;
}

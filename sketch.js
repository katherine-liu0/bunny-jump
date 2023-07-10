let b = 50

function setup() {
  // create our canvas and give it an id of 'p5canvas'
  let cnv = createCanvas(1000,1000);
  cnv.id('p5canvas');

  // important! update the inline CSS
  cnv.style('width', '');
  cnv.style('height', '');

  noStroke();
  colorMode(HSB)
  background(220,60,b);
}

function draw() {
  colorMode(HSB)
  background(220,60,b,0.1);

  if(b<=50){
  colorMode(RGB)
  fill(107,125,180);
  ellipse(random(3,width-3),random(3,height-3),6,6)
  }

  if(b>50){
  colorMode(RGB)
  fill(34,66,128);
  ellipse(random(3,width-3),random(3,height-5),6,6)
  }

  fill(255);
  ellipse(random(2,width-2),random(2,height-2),4,4)
}

function changeBrightness(el) {
  // update the variable with the current value of this slider
  b = int( el.value );
}


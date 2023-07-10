//images
let bg1, bg2, bg3
let bunnyGraphic,bunnyL,bunnyR
let fireGraphic
let sticker1, sticker2,scoreSticker
let welcomeCaption, pausedCaption, winCaption, loseCaption, bunnies, bgPure, bigBunny
let welcome, paused, lose, win

//log
let theBricks = []
let theFire = []
let theStairs=[]
let theStickers=[]
let pathCovered = 0
let score = 0 
let highest
let hs

//sounds 
let bgSound, overSound, stickerSound

// keep track of bg imageslocation
let bg1X = 0;
let bg2X = 1000;
let bg3X = 2000;
let bgResetX = 3000;
let bigBunnyY = 0
let bigBunnyYmove = 0.3


//parameter
let floorY=495
let fireY=490
let stairY=350
let stairYmove = 0.2
let bunnyX=70
let speedX=10
let speedXoriginal 

//fire
let f1,f2,f3,f4,f5,f6,f7

//brick
let b1,b2,b3,b4,b5,b6,b7,b8,b9

//stair
let s1,s2,s3,s4,s5,s6,s7


//jump & gravity
let jumpMode = false;
let thereisFloor = true
let thereisStair = true
let onStair = false
let jumpPower = 0;
let gravity = 1;
let bunnyY = 395 
let fallPower = 0

// 0 = game start
// 1 = game playing
// 2 = game paused
// 3 = lose
// 4 = win
let state = 0;

function preload(){
	bg1 = loadImage('media/bg1.png');
	bg2 = loadImage('media/bg2.png');
	bg3 = loadImage('media/bg3.png');
	sticker1 = loadImage('media/sticker1.png');
	sticker2 = loadImage('media/sticker2.png');
	bunnyL = loadImage('media/bunnyL.png')
	bunnyR = loadImage('media/bunnyR.png')
	fireGraphic = loadImage('media/fire.png')
	welcomeCaption = loadImage('media/welcome.png');
	pausedCaption = loadImage('media/paused.png');
	loseCaption = loadImage('media/lose.png');
	winCaption = loadImage('media/win.png');
	bgPure = loadImage('media/bg_pure.png');
	bunnies = loadImage('media/bunnies.jpeg');
	bigBunny =loadImage('media/destination.png')
	scoreSticker = loadImage('media/scoreSticker.png')

	
	bgSound = loadSound('media/bg.mp3')
  stickerSound = loadSound('media/sticker.mp3')
  overSound = loadSound('media/game_over.wav')
}


function mousePressed() {
  if (state == 0) {
  	if (mouseX>100 && mouseX<467 && mouseY>414 && mouseY<460){
  		speedX=5
  		speedXoriginal=5
  		state = 1;
  	}

  	else if (mouseX>555 && mouseX<895 && mouseY>414 && mouseY<460){
  		speedX=10
  		speedXoriginal=10
  		state = 1;
  	}
  }
  else if (state == 1) {
    state = 2; 
  }
  else if (state == 2) {
    state = 1;
  }
  //game ends (lose / win)
  else {
    state = 0;
  }
}


function setup(){
	bunnyGraphic = bunnyR

	//	let bgCanvas = createCanvas(1000,1000)
	//	bgCanvas.id('bg');
	// 	bgCanvas.style('width', '');
	// 	bgCanvas.style('height', '');

	let mainCanvas = createCanvas(1000,562)
	mainCanvas.style('display', 'block');
	mainCanvas.style('margin', 'auto');
	mainCanvas.parent("#center")
	background(0)

	let hs = window.localStorage.getItem('highestScore');
	if (hs) {
    highest=hs
   }
   else{
   	highest=0
   }

	//brick
	b1 = new bricks(0,1)
	b2 = new bricks(222,1)
	b3 = new bricks(666,1)
	b4 = new bricks(1110,1)
	b5 = new bricks(1554,1)
	b6 = new bricks(1998,1)
	b7 = new bricks(2442,1)
	b8 = new bricks(2664,1)
	b9 = new bricks(3330,1)
	b10 = new bricks(3552,1)
	theBricks.push(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10)


	//fire
	f1 = new fire(444,1)
	f2 = new fire(888,1)
	f3 = new fire(1332,1)
	f4 = new fire(1776,1)
	f5 = new fire(2220,1)
	f6 = new fire(2886,1)
	f7 = new fire(3108,1)
	theFire.push(f1,f2,f3,f4,f5,f6,f7)

	//stair
	s1 = new stairs(454,1)
	s2 = new stairs(918,1)
	s3 = new stairs(1352,1)
	s4 = new stairs(1786,1)
	s5 = new stairs(2260,1)
	s6 = new stairs(2906,1)
	s7 = new stairs(3148,1)
	theStairs.push(s1,s2,s3,s4,s5,s6,s7)

	//captions
	welcome = new captions(welcomeCaption)
	paused = new captions(pausedCaption)
	win = new captions(winCaption)
	lose = new captions(loseCaption)

	//stickers
	for (let i = 0; i < 20; i++) {
		theStickers.push(new stickers(400+i*random(140,160)))
	}	
}


function draw(){
	noStroke()

	//game state
  if (state == 0) {
    gameStart();
  }
  else if (state == 1) {
    gamePlaying();
  }
  else if (state == 2){
    gamePaused();
  }

  else if (state == 3){
    gameLose();
  }

  else {
    gameWin();
  }

}



function gameStart() {
	image(bunnies, 0,0)
	welcome.displayNmove()
}

function gamePlaying() {

	if (!(bgSound.isPlaying())){
		bgSound.loop()
	}

  background(128);
  // repeating background
  bgRolling()

	//floor 
	 for (let i = 0; i < theBricks.length; i++) {
	    theBricks[i].move();
	    theBricks[i].display();
	  }

	 //fire 
	 for (let i = 0; i < theFire.length; i++) {
	    theFire[i].move();
	    theFire[i].display();
	  }

	//stickers 
	  for (let i = 0; i < theStickers.length; i++) {
	    theStickers[i].moveAndDisplay();
	   }
		
	//stair 
	  for (let i = 0; i < theStairs.length; i++) {
	    theStairs[i].move();
	    theStairs[i].display();
	  }


//bunny
	//change graphic direction
	if (keyIsDown(68)) {
		bunnyGraphic=bunnyR
	}

	if (keyIsDown(65)) {
		bunnyGraphic=bunnyL
	}
	image(bunnyGraphic,bunnyX,bunnyY)

	//gravity jump
	jumpAndFall()

//end
	bigBunnyY += bigBunnyYmove
	if (bigBunnyY -5 >= 0){
		bigBunnyYmove = -0.3
	}

	if (bigBunnyY +5 <= 0){
		bigBunnyYmove = 0.3
	}

	if (pathCovered>2500){
		image(bigBunny, 3500-pathCovered,bigBunnyY)
	}

//score
	if (score>=highest){
		highest=score
	}
	window.localStorage.setItem('highestScore', highest);

	image(scoreSticker,0,0)
	textSize(20)
	text("Points: "+score, 56,34)
	text("Highest: "+highest, 56,54)

//lose
	if (bunnyY >height){
		overSound.play()
		state = 3
		thereisFloor=true
		//reset
		for (let i = 0; i < theBricks.length; i++) {
	    theBricks[i].reset();
	  }

	  for (let i = 0; i < theFire.length; i++) {
	    theFire[i].reset();
	  }

	  for (let i = 0; i < theStairs.length; i++) {
	    theStairs[i].reset();
	  }
	  
	  bunnyY=395
	  pathCovered=0
	  speedX=speedXoriginal
	  bgSound.stop()

//clean up all the stickers	
	score=0
		for (let i = 0; i < theStickers.length; i++) {
	    	theStickers.splice(i, 1);
	    	i = i - 1;
	 	}
//re-construct the stickers
	for (let i = 0; i < 20; i++) {
		theStickers.push(new stickers(400+i*random(140,160)))
	}	
	}


//win
	if (pathCovered>=3552){
		state = 4
		thereisFloor=true
		//reset
		for (let i = 0; i < theBricks.length; i++) {
	    theBricks[i].reset();
	  }

	 for (let i = 0; i < theFire.length; i++) {
	    theFire[i].reset();
	  }

	  for (let i = 0; i < theStairs.length; i++) {
	    theStairs[i].reset();
	  }

	  pathCovered=0
	  speedX=speedXoriginal

//clean up all the stickers
	score=0	
		for (let i = 0; i < theStickers.length; i++) {
	    	theStickers.splice(i, 1);
	    	i = i - 1;
	 	}
//re-construct the stickers
	for (let i = 0; i < 20; i++) {
		theStickers.push(new stickers(400+i*random(140,160)))
	}	
	}


}

function gamePaused() {
	image(bgPure, 0,0)
	paused.displayNmove()
}

function gameLose() {
	image(bgPure, 0,0)
	lose.displayNmove()
}

function gameWin() {
	image(bgPure, 0,0)
	win.displayNmove()
}


function bgRolling(){
	image(bg1, bg1X, 0);
	image(bg2, bg2X, 0);
	image(bg3, bg3X, 0);

	if (keyIsDown(68)) {
		pathCovered+=speedX
		if (pathCovered>3552){
			pathCovered=3553
		}
		if (pathCovered <= 3552){
		bg1X -= speedX;
		bg2X -= speedX;
		bg3X -= speedX;
	}
	}

	if (bg1X <= -1000) {
	  bg1X = bg3X + 1000;
	}

	if (bg2X <= -1000) {
	  bg2X = bg1X + 1000;
	}

	if (bg3X <= -1000) {
	  bg3X = bg2X + 1000;
	}

	if (keyIsDown(65)) {
		pathCovered-=speedX
		if (pathCovered<0){
			pathCovered=-1
		}
		if (pathCovered>=0){
		bg1X += speedX;
		bg2X += speedX;
		bg3X += speedX;
		}
	}



	if (bg1X >= 1000) {
	  bg1X = bg2X - 1000;
	}

	if (bg2X >= 1000) {
	  bg2X = bg3X - 1000;
	}

	if (bg3X >= 1000) {
	  bg3X = bg1X - 1000;
	}
}

function jumpAndFall(){
	if (keyIsDown(87) && jumpMode == false) {
	  gravity=1
    jumpMode = true
    jumpPower = -18
  }

	//is there a brick on the y dimension?
  for (let i = 0; i < theBricks.length; i++) {
		if ((theBricks[i].brickX -45)<= bunnyX && (theBricks[i].brickX+197)>=bunnyX){
		  thereisFloor = true
		  break
		}

		else {
			thereisFloor=false
		}
	}

	//is there a stair on the y dimension?
  for (let i = 0; i < theStairs.length; i++) {
		if ((theStairs[i].stairX -45)<= bunnyX && (theStairs[i].stairX+80)>=bunnyX){
		  thereisStair = true
		  break
		}

		else {
			thereisStair = false
		}
	}


  if (jumpMode) {
    bunnyY += jumpPower;
    jumpPower += gravity;
  }

  if (jumpMode && (bunnyY+100)>=stairY && (bunnyY+90)<=stairY && thereisStair && jumpPower>0){
		   	gravity=0
				bunnyY = stairY - 100
				onStair = true 
				jumpMode = false
				jumpPower = 0
	}


  if (jumpMode && (bunnyY+100)>=floorY && (bunnyY+90)>=floorY && thereisFloor){
		   	gravity=0
				bunnyY = floorY - 100
				onStair = false
				jumpMode = false
				jumpPower = 0
	}

	if ( onStair && !(jumpMode) && !(thereisStair) && (bunnyY+100) >= stairY){
		fallPower=10
		gravity=1
		bunnyY+=fallPower
		fallPower+=gravity
		jumpMode = true
	}

	if ( !(jumpMode) && !(thereisFloor) && (bunnyY+100) >= floorY){
		fallPower=10
		gravity=1
		bunnyY+=fallPower
		fallPower+=gravity
	}

}




//objects
//bricks
class bricks {
	//difficulty: 1= rookie, 2= mastera
	constructor(x,d){
		this.brickX = x
		this.originalX = x
		this.difficulty = d
	}

	display(){
		fill(0,0,255)
		rect(this.brickX,floorY,222,97)
	}

	move(){
		if (keyIsDown(68)&& (pathCovered < 3552)) {
			this.brickX -= speedX;
		}

		if (keyIsDown(65)) {
			if (pathCovered>=0){
			this.brickX += speedX;
			}
		}
	}

	reset(){
		this.brickX = this.originalX
	}
}

//stairs
class stairs {
	//difficulty: 1= rookie, 2= master
	constructor(x,d){
		this.stairX = x
		this.originalX = x
		this.difficulty = d
	}

	display(){
		fill(0,0,255)
		rect(this.stairX,stairY,100,30)
	}

	move(){
		if (keyIsDown(68)&& (pathCovered < 3552)) {
			this.stairX -= speedX;
		}

		if (keyIsDown(65)) {
			if (pathCovered>=0){
			this.stairX += speedX;
			}
		}

	// stairY+=stairYmove
	// if (stairY -50 >= 350){
	// 	stairYmove = -0.2
	// }

	// if (stairY +50 <= 350){
	// 	stairYmove = 0.2
	// }

	}

	reset(){
		this.stairX = this.originalX
	}
}


//fire object
class fire{
	//difficulty: 1= rookie, 2= master
	constructor(x,d){
		this.fireX = x
		this.originalX = x
		this.difficulty = d
	}

	display(){
		image(fireGraphic, this.fireX,fireY)
	}

	move(){
		if (keyIsDown(68) && (pathCovered < 3552)) {
			this.fireX -= speedX;
		}

		if (keyIsDown(65)) {
			if (pathCovered>=0){
			this.fireX += speedX;
			}
		}
	}
	reset(){
		this.fireX = this.originalX
	}
}

//jumping captions
class captions{
	constructor (captionImage){
		this.c=captionImage
		this.yPos=height/2
		this.yMove=0.3
	}

	displayNmove(){
		this.yPos += this.yMove
		if (this.yPos -5 >= height/2){
			this.yMove = -0.3
		}

		if (this.yPos +5 <= height/2){
			this.yMove = 0.3
		}
		imageMode(CENTER)
		image(this.c, width/2, this.yPos)
		imageMode(CORNER)
	}
}

//stickers
class stickers {

  constructor(stickerX) {
    this.x = stickerX;
    this.y = random(120,250);
    this.size = 40;
    this.stickerImage=random(0,1)
  }

  moveAndDisplay() {
		
		if (keyIsDown(68) && (pathCovered < 3552)) {
			this.x -= speedX;
		}

		if (keyIsDown(65)) {
			if (pathCovered>=0){
			this.x += speedX;
			}
		}

    // randomly draw one of the two stickers
    if (this.stickerImage <0.7){
			image(sticker1,this.x, this.y, this.size)
		}
		else {
			image(sticker2,this.x, this.y, this.size)
		}

    // move if the bunny gets close
    if (dist(this.x+20,this.y+45,bunnyX+38,bunnyY+53) <50){
   		this.y =-100
   		if (this.stickerImage <0.7){
   			score+=1
   		}
   		else {
   		  score+=2
   		}  
   		stickerSound.play()
    }


  }
}

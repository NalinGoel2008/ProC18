var GameState = "PLAY";
var knife, fruits_group, bombs_group;
var knifeImage, fruitImg1, fruitImg2, fruitImg3, fruitImg4, bombImg,bomb2Img;
var gameOverSpr, gameOverSprImg,restartSpr,restartSprImg;
var score = 0;
var fruit,bomb;
var cuttingSound, gameOverSound;

function preload(){

  knifeImage = loadImage("sword.png");
  fruitImg1 = loadImage("fruit1.png");
  fruitImg2 = loadImage("fruit2.png");
  fruitImg3 = loadImage("fruit3.png");
  fruitImg4 = loadImage("fruit4.png");
  bombImg = loadImage("alien1.png");
  bomb2Img = loadImage("alien2.png");
  gameOverSprImg = loadImage("gameover.png");
  restartSprImg = loadImage("Picture1.png")
  
  cuttingSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
  knife = createSprite(windowWidth/2,windowHeight/2,10,10);
  knife.addImage(knifeImage);
  
  gameOverSpr = createSprite(windowWidth/2,(windowHeight/2-100),10,10);
  gameOverSpr.addImage(gameOverSprImg);
  
 restartSpr = createSprite(windowWidth/2,windowHeight/2,10,10);
  restartSpr.addImage(restartSprImg);
  
  gameOverSpr.visible = false;
 restartSpr.visible = false;
  restartSpr.scale = 0.4;
  gameOverSpr.scale = 1.3;

knife.setCollider("rectangle",0,0,50,100);
  
  fruits_group = new Group();
bombs_group = new Group();

}

function draw(){
  
  background(rgb(0,255,255));
  
  if(GameState === "PLAY"){
    
  knife.x = World.mouseX 
  knife.y = World.mouseY;
    
    if(touches.length>0){
      
      knife.x = touches[0];
  knife.y = touches[1];
      
    }
   
    
    if(fruits_group.isTouching(knife)){
      fruits_group.destroyEach();
      score = score + 1;
      cuttingSound.play();
    }
    if(bombs_group.isTouching(knife)){
      fruits_group.destroyEach();
    bombs_group.destroyEach();
      gameOverSound.play();
      GameState = "END";
    }
    
    fruits();
    bombs();
    
    textSize(25);
  text("Score: "+ score,(windowWidth/2-50),50);
    
  }
  
  if(GameState === "END"){
    
    knife.visible = false;
    gameOverSpr.visible = true;
    restartSpr.visible = true;
    textSize(25);
  text("Score: "+ score,(windowWidth/2-50),(windowHeight/2+100));
    if(mousePressedOver(restartSpr)){
      
      reset();
      
    }
    
  }
  
  drawSprites();

}

function fruits(){
  if(frameCount % 200 === 0){
  fruit = createSprite(Math.round(random(windowWidth+100),windowWidth-100),600,10,10)
  fruit.velocityY = random(-10,-6);
    fruit.scale = 0.2;
    if(score > 4){
    fruit.velocityY = fruit.velocityY - (frameCount/180);
    }
    fruit.setCollider("rectangle",0,0,10,10);
    fruits_group.add(fruit);
    fruits_group.setLifetimeEach = 200;
  
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruitImg1);
              break;
      case 2: fruit.addImage(fruitImg2);
              break;
      case 3: fruit.addImage(fruitImg3);
              break;
      case 4: fruit.addImage(fruitImg4);
              break;
      default: break;
    }
    }
}
function bombs(){
  if(frameCount % 300 === 0){
  bomb = createSprite(Math.round(random(windowWidth+100),windowWidth-100),600,10,10)
  bomb.velocityY = random(-4,-6);
    bomb.velocityY = bomb.velocityY - (frameCount/300);
    bomb.scale = 0.6;
    bomb.setCollider("rectangle",0,0,20,20);
    bombs_group.add(bomb);
    bombs_group.setLifetimeEach = 300;
  
  var rand1 = Math.round(random(1,2));
    switch(rand1) {
      case 1: bomb.addImage(bombImg);
              break;
      case 2: bomb.addImage(bomb2Img);
              break;
      default: break;
    }
    }
}

function reset(){
  
  score = 0;
  gameOverSpr.visible = false;
  restartSpr.visible = false;
  knife.visible = true;
  GameState = "PLAY";
  
}

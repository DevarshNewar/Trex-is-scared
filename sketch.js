var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimage,cactus,cactusimage1,cactusimage2,cactusimage3,cactusimage4,cactusimage5,cactusimage6;

var cactusgroup,cloudsgroup;

//var gamestate,PLAY,END;
var PLAY = 1;
var gamestate = PLAY;
var END = 0;

var reset,resetimage,gameover,gameoverimage;

var score;

function preload(){
  
  trex_running =                                           loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudimage = loadImage("cloud.png");
  
  cactusimage1 = loadImage("obstacle1.png");  
  cactusimage2 = loadImage("obstacle2.png");  
  cactusimage3 = loadImage("obstacle3.png");  
  cactusimage4 = loadImage("obstacle4.png");  
  cactusimage5 = loadImage("obstacle5.png");  
  cactusimage6 = loadImage("obstacle6.png");
  
  resetimage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cactusgroup = new Group();
  cloudsgroup = new Group();
  
  reset = createSprite(300,125,20,50);
  reset.addImage("reseting",resetimage);
  reset.visible = false;
  
  gameover = createSprite(300,50,20,50);
  gameover.addImage("gameover",gameoverimage);
  gameover.visible = false;
    
  score = 0;
}

function draw() {
  background(200);
  
  if (gamestate === PLAY) {
    if(keyDown("space") && trex.y>=161.5) {
      trex.velocityY = -12  ;
    }
  
    trex.velocityY = trex.velocityY + 0.8

       ground.velocityX = -8;

    //console.log(trex.y);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    score = score + Math.round(getFrameRate()/60);
    
    //creating clouds
    spawnClouds();

    //creating cactus
    spawnObstacles();
    
 
 }else if(gamestate === END) {
           gameover.visible = true;
           reset.visible = true;
  }

    trex.collide(invisibleGround);

    text("score :" + score, 500,50);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = random(50,150);
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding it to the clouds group
    cloudsgroup.add(cloud);
    
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600, 165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    rand = Math.round(random(1,6));
    
    switch(rand) {
      case 1:
        obstacle.addImage(cactusimage1);
      break;
      
      case 2:
        obstacle.addImage(cactusimage2);
      break;

      case 3:
        obstacle.addImage(cactusimage3);
      break;

      case 4:
        obstacle.addImage(cactusimage4);
      break;

      case 5:
        obstacle.addImage(cactusimage5);
      break;

      case 6:
        obstacle.addImage(cactusimage6);
      break;
      
      default:        
      break;
           }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 75;
  }
}

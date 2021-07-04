var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, obstacle;
var Food_Group, Obstacle_Group;
var score = 0;
var s, power;
var gameover, gameover_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana = loadImage("banana.png");
  obstacle = loadImage("stone.png");
  gameover_img = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.075;
  power = "DEACTIVATED";
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameover = createSprite(400,200,10,10);
  gameover.addImage(gameover_img);
  gameover.visible = false;
  
  Food_Group = new Group();
  Obstacle_Group = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y > 318 && power === "DEACTIVATED") {
      player.velocityY = -20;
    }
    else if(keyDown("space") && player.y > 298 && power === "ACTIVATED") {
      player.velocityY = -20;
    }

    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    console.log(player.y);

    spawn_bananas();
    spawn_obstacle();

    if(player.isTouching(Food_Group)){
      score++;
      Food_Group.destroyEach();
      player.scale = 0.15;
      s = second();
    }

    if(second() > s+5){
      player.scale = 0.075;
      power = "DEACTIVATED"
    }
    else if(second() < s+5){
      power = "ACTIVATED"
    }

    if(player.isTouching(Obstacle_Group)){
      if(power === "ACTIVATED"){
        Obstacle_Group.destroyEach();
      }
      else if(power === "DEACTIVATED"){
        gameState = "over";
      }
    }

    drawSprites();

    textSize(30);
    noFill();
    stroke('white');

    text("Power:"+power,500,25)
    text('Score:'+score,5,25);

  }
  else if(gameState === "over"){
    backgr.velocityX = 0;
    Food_Group.destroyEach();
    Obstacle_Group.destroyEach();

    player.velocityX = 0;
    player.velocityY = 0;
    player.visible = false;

    gameover.visible = true;

    drawSprites();

    textSize(30);
    noFill();
    stroke('white');
    text('Score:'+score,5,25);
  }

}

function spawn_bananas(){
  if(frameCount % 80 === 0){
    var banana_sprite = createSprite(810, random(50,250), 10, 10);
    banana_sprite.scale = 0.05;
    banana_sprite.addImage(banana);
    banana_sprite.velocityX = -4;
    
    banana_sprite.lifetime = 250;
    player.depth = banana_sprite.depth+1;
    Food_Group.add(banana_sprite);
  }
}

function spawn_obstacle(){
  if(frameCount % 60 === 0){
    var obstacle_sprite = createSprite(810, 305, 10, 10);
    obstacle_sprite.scale = 0.2;
    obstacle_sprite.addImage(obstacle);
    obstacle_sprite.velocityX = -5;
    
    obstacle_sprite.lifetime = 200;
    player.depth = obstacle_sprite.depth+1;
    Obstacle_Group.add(obstacle_sprite);
  }
}

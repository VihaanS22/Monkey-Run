var gameState = "play"

var replay, restart
var start, startText
var monkey, monkey_running
var jungle, back
var jungle1, back1
var line1
var line2
var line3
var fruits, fruit1, fruit2, fruit3
var obstacleGroup, obstacleGroup2, obstacle1, obstacle2
var score = 0;


function preload(){
 monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
 
restart = loadImage("replay.png")
  startText = loadImage("instruct.png")
 fruit1 = loadImage("apple1.png")
 fruit2 = loadImage("banana1.png")
 fruit3 = loadImage("banana.png")
  
  obstacle2 = loadImage("well-1.png")
 obstacle1 = loadImage("stone-2.png") 
 
  back = loadImage("jungle1.png") 
 back1 = loadImage("jungle1.png") 
}



function setup() {
  createCanvas(400, 400);
 
  fruits = new Group();
 fruits1 = new Group();
  fruits2 = new Group();
  obstacleGroup = new Group();
  obstacleGroup2 = new Group();
  

  
  line1 = createSprite(200,380,400,3);
 
  line2 = createSprite(200,160,400,3);


jungle = createSprite(200, 290, 400, 400)
jungle.addAnimation("background", back); 
 jungle.x = jungle.width /2;
jungle.velocityX = -(3+3*score/10) 
  
  jungle1 = createSprite(200, 162, 400, 400)
jungle1.addAnimation("background", back); 
jungle1.x = jungle1.width /2;
jungle1.velocityX = -(3+3*score/20)   
 

  
monkey = createSprite(50, 300, 10, 10)
 monkey.addAnimation("running", monkey_running); 
monkey.scale = 0.14;

  start = createSprite(200, 200, 400, 400)
start.addAnimation("background", startText); 
start.scale = 0.8

 replay = createSprite(200, 290, 400, 400)
replay.addAnimation("retry", restart)
 replay.visible = false; 
   
  
}



function draw() {
  background(180);
  
  

 if(gameState === "play"){  
  
  if(mousePressedOver(start)){
     start.visible = false;

      gameState = "play"
       } 
   
   obstaclesGroup();  
obstaclesGroup2();
   spawnFruit();
 fruit1Group();
 fruit2Group();  
   
   
   
  if (jungle.x<110) {
     jungle.x = jungle.width/2;
   }
  
  if (jungle1.x<110) {
     jungle1.x = jungle1.width/2;

  }

  if(keyDown("space")){
  
 monkey.velocityY = -10;
monkey.velocityY = monkey.velocityY + 0.01   
} 
  
  if(keyDown("down")){
  monkey.y = monkey.y+7 
    
    } 

   if(fruits.isTouching(monkey)){
      fruits.destroyEach();
   score = score+2 
   }
  
   if(fruits1.isTouching(monkey)){
      fruits1.destroyEach();
   score = score+3
   }
  
   if(fruits2.isTouching(monkey)){
      fruits2.destroyEach();
   monkey.scale = monkey.scale+0.04
     obstacleGroup2.scale =  obstacleGroup2.scale+0.02
 score = score+5
   }
   
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
   monkey.scale = monkey.scale-0.03
    obstacleGroup2.scale = obstacleGroup2.scale-0.02
    }
   
    if(obstacleGroup2.isTouching(monkey)){
      obstacleGroup2.destroyEach();
   monkey.visible = false;
      gameState = "end"
  
  
    }
    }
     
   if(gameState === "end"){
      
    fruits.destroyEach();
    fruits1.destroyEach();
      fruits2.destroyEach();
      obstacleGroup.destroyEach();
  obstacleGroup2.destroyEach();
   jungle.velocityX = 0
       jungle1.velocityX = 0
   replay.visible = true;
 
  if(mousePressedOver(replay)){
     gameState = "play"
replay.visible = false;
    monkey.visible = true;
 monkey.scale = 0.14;
 jungle.x = jungle.width /2;
jungle.velocityX = -(3+3*score/10) 
jungle1.x = jungle1.width /2;
jungle1.velocityX = -(3+3*score/10) 
score = 0;
    
  }   
   }
  
     monkey.collide(line1)
  
  monkey.collide(line2)

  monkey.velocityY = monkey.velocityY + 0.1 
   
 
   drawSprites();

  if(gameState === "end"){
    fill("red")
 textSize(20)
    text("YOU LOST!!", 150, 250)
}  
   fill("white")
 textSize(20)
   text("SCORE:" + score, 170, 40)
 }

function spawnFruit(){
 
  if (frameCount % 150 === 0) {
    var fruit = createSprite(420,120,40,10);
    fruit.y = random(230,250);
  
    
 fruit.addImage(fruit1);

   fruit.scale = 0.2;
    fruit.velocityX = -(2+3*score/10)
   
  fruit1.depth = monkey.depth;
    monkey.depth = fruit1.depth + 1;

     fruit.setLifetime = 100;
  fruits.add(fruit);
    
  }
}

function fruit1Group(){
 
  if (frameCount % 200 === 0) {
    var fruit20 = createSprite(460,120,40,10);
  fruit20.y = random(280,300);
fruit20.addImage(fruit3);

    fruit20.scale = 0.06;
    fruit20.velocityX =  -(2+3*score/10)
  fruits1.add(fruit20)
  fruit3.depth = monkey.depth;
    monkey.depth = fruit3.depth + 1;
 
  }
}

function fruit2Group(){
 
  if (frameCount % 400 === 0) {
    var fruit30 = createSprite(460,120,40,10);
  fruit30.y = random(210,220);
fruit30.addImage(fruit2);

    fruit30.scale = 0.1;
    fruit30.velocityX =  -(5+3*score/10)
  fruits2.add(fruit30)
  fruit2.depth = monkey.depth;
    monkey.depth = fruit2.depth + 1;
 
  }
}

function obstaclesGroup(){
 
  if (frameCount % 300 === 0) {
    var stone = createSprite(460,120,40,10);
  stone.y = random(215,250);
stone.addImage(obstacle1);

    stone.scale = 0.15;
   stone.velocityX =  -(5+3*score/10)
  obstacleGroup.add(stone)
 
  }
}

function obstaclesGroup2(){
 
  if (frameCount % 500 === 0) {
    var well = createSprite(460,120,40,10);
  well.y = random(240,250);
well.addImage(obstacle2);

    well.scale = 0.4;
   well.velocityX =  -(5+3*score/10)
  obstacleGroup2.add(well)
 
  }
}

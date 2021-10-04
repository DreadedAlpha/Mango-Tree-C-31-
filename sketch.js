
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;


var boy;
var treeobj, stoneobj, groundobj, launcherobj;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8, mango9, mango10
var launcherForce = 100
function preload()
{
	boy = loadImage("Images/boy.png");

}

function setup() {
	createCanvas(1300, 600);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	stoneobj = new stone(235,420,30);
	mango1 = new mango(1100,100,30);
	mango2 = new mango(1170,140,30);
	mango3 = new mango(1000,70,30);
	mango4 = new mango(1010,140,30);
	mango5 = new mango(1100,70,30);
	mango6 = new mango(950,230,30);

	treeobj = new tree(1050,580);
	groundobj = new Ground(width/2,600,width,10)
	launcherobj = new launcher(stoneobj.body,{x:235, y:420})
	var render = Matter.Render.create({
		element: document.body, 
		engine:engine,
		options:{
			width: 1300,
			height: 600 ,
			wireFrames: false
		}
	})
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(255);
  text(mouseX+" "+mouseY,mouseX,mouseY)
  textSize(25);
  text("Press Space to get a 2nd Chance!",50,50);

  image(boy,200,340,200,300)
  groundobj.display()
	stoneobj.display()
	treeobj.display()
	launcherobj.display()

	mango1.display()
	mango2.display()
	mango3.display()
	mango4.display()
	mango5.display()
	mango6.display()
	
	detectCollision(stoneobj,mango1)
	detectCollision(stoneobj,mango2)
	detectCollision(stoneobj,mango3)
	detectCollision(stoneobj,mango4)
	detectCollision(stoneobj,mango5)
  drawSprites();
 
}

function mouseDragged(){
	Matter.Body.setPosition(stoneobj.body,{x:mouseX,y:mouseY})
}
function mouseReleased(){
	launcherobj.fly()
}
function keyReleased(){
	if(keyCode == 32){
		Matter.Body.setPosition(stoneobj.body,{x:235,y:420})
		launcherobj.attach(stoneobj.body)
	}
}
function detectCollision(lstone,lmango){
	mangoBodyPosition = lmango.body.position
	stoneBodyPosition = lstone.body.position

	var distance = dist(stoneBodyPosition.x,stoneBodyPosition.y,mangoBodyPosition.x,mangoBodyPosition.y)
	console.log(distance)

	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body,false)
	}
}

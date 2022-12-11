document.addEventListener("DOMContentLoaded", function(){
    ChangeDotsAmmount()
});

const canvas = document.querySelector('#agarCanvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let buttonIsDisplayingStart = true;


document.querySelector('#AmmountSlider').addEventListener('input', ChangeDotsAmmount)
document.querySelector('#startAndStopButton').addEventListener('click', StartStop)

let currentLoop;

function ChangeDotsAmmount(){
    document.querySelector('#rangeAmmount').innerHTML = GetAmountOfDots()
}

function GetAmountOfDots(){
    return document.querySelector('#AmmountSlider').value;
}
function StartStop(){
    if (buttonIsDisplayingStart == true) {
        buttonIsDisplayingStart = false
        Start()
        document.querySelector('#startAndStopButton').innerHTML = "Stop"
    }
    else{
        buttonIsDisplayingStart = true
        Stop()
        document.querySelector('#startAndStopButton').innerHTML = "Start"
    }
}
function Start(){
    balls.length = 0
    CreateRandomBalls()
    loop()
}
function Stop(){
    balls.length = 0
    window.cancelAnimationFrame(currentLoop)
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Ball {

   constructor(x, y, velX, velY, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.size = size;
   }

   draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      context.lineWidth = 2;
      context.strokeStyle = '#282829';
      context.stroke();

   }

    update() {
        if ((this.x + this.size) >= width) {
        this.velX = -this.velX;
        }

        if ((this.x - this.size) <= 0) {
        this.velX = -this.velX;
        }

        if ((this.y + this.size) >= height) {
        this.velY = -this.velY;
        }

        if ((this.y - this.size) <= 0) {
        this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

}

const balls = [];

function CreateRandomBalls(){
    for (let index = 0; index < GetAmountOfDots(); index++) {
        const size = random(10,15);
        let velX = random(-3,3)
        let velY  = random(-3,3)
        while (velX ==0 && velY ==0 ) {
            velX = random(-3,3)
            velY  = random(-3,3)
        }
        const ball = new Ball(
            random(size,width - size),
            random(size,height - size),
            velX,
            velY,
            size
        );
        balls.push(ball);
    }
}

function loop() {

    context.clearRect(0, 0, canvas.width, canvas.height)
    for (const ball of balls) {
        ball.draw();
        ball.update();
    }

   currentLoop = requestAnimationFrame(loop);
}
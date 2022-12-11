document.addEventListener("DOMContentLoaded", function(){
    ChangeDotsAmmount()
});

const canvas = document.querySelector('#agarCanvas');
const context = canvas.getContext('2d');


document.querySelector('#AmmountSlider').addEventListener('input', ChangeDotsAmmount)
document.querySelector('#startButton').addEventListener('click', Start)


function ChangeDotsAmmount(){
    document.querySelector('#rangeAmmount').innerHTML = GetAmountOfDots()
}
function GetAmountOfDots(){
    return document.querySelector('#AmmountSlider').value;
}

function Start(){
    CreateRandomDots()
}

function CreateRandomDots(){
    for (let index = 0; index < GetAmountOfDots(); index++) {
        const radius = GetRandomInteger(10, 20)
        const lineWidth = 2;
        const position = GetRandomPosition(radius + lineWidth)
        context.beginPath();
        context.arc(position[0], position[1], radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#7f838a';
        context.fill();
        context.lineWidth = lineWidth;
        context.strokeStyle = '#282829';
        context.stroke();
    }
}

function GetRandomPosition(radiusWithLineWidth){
    const posX = GetRandomInteger(radiusWithLineWidth, canvas.width - radiusWithLineWidth);
    const posY = GetRandomInteger(radiusWithLineWidth, canvas.height - radiusWithLineWidth);
    return [posX, posY]
}

function GetRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
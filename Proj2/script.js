document.querySelector("#left-slider-button").addEventListener('click', moveLeft);
document.querySelector("#right-slider-button").addEventListener("click", moveRight);
const sliderNavButtonsContainer = document.querySelector('.slider-nav-buttons-container');
const sliderSlide = document.querySelector('.slider-slide');

const widthPx = 600;
const slidesCount = 5;
let counter = 0;

let moveRightInterval = window.setInterval(moveRight, 5000);

setup();
function setup(){
  setupRandomSlides();
  setupSliderNavButtons();
}

function setupRandomSlides(){
  for (let index = 0; index < slidesCount; index++) {  
    const el = document.createElement('img');
    el.setAttribute('class', 'slide');
    el.setAttribute('src', `https://picsum.photos/600/400?random=${index}`);
    sliderSlide.appendChild(el);
  }
}

function setupSliderNavButtons(){
  for (let index = 0; index < slidesCount; index++) {  
    const el = document.createElement('button');
    el.setAttribute('class', 'slide-nav-buutton');
    el.setAttribute('id', `slideNavBuutton${index}`);
    sliderNavButtonsContainer.appendChild(el);
    el.addEventListener("click", (function(){
      moveToSpecificSlide(index);
    }));
  }
}

function moveToSpecificSlide( buttonIndex ){
  resetMoveRightInterval();
  counter = buttonIndex;
  transformImages();
}

function moveRight(){
  resetMoveRightInterval();
  if (counter <= slidesCount-2){
    counter++;
    transformImages();
  }
  else {
    counter=0;
    transformImages();
  }
};

function moveLeft(){
  resetMoveRightInterval();
  if (counter > 0){
    counter--;
    transformImages();
  }
  else {
    counter=slidesCount-1;
    transformImages();
  }
}

function resetMoveRightInterval(){
  clearInterval(moveRightInterval);
  moveRightInterval = window.setInterval(moveRight, 5000);
}

function transformImages(){
  sliderSlide.style.transition = "transform 0.6s ease-in-out";
  sliderSlide.style.transform = `translateX(${ -widthPx * counter }px)`;
}

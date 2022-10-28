document.querySelector("#left-slider-button").addEventListener('click', moveLeft);
document.querySelector("#right-slider-button").addEventListener("click", rightClick);
const sliderNavButtonsContainer = document.querySelector('.slider-nav-buttons-container');
const sliderSlide = document.querySelector('.slider-slide');
const slides = document.querySelectorAll(".slide");

const widthPx = 600;
const slidesCount = 5;
let counter = 0;

const interval = window.setInterval(moveRight, 5000);

setupSliderNavButtons();

function setupSliderNavButtons(){
  for (let index = 0; index < slidesCount; index++) {  
    const el = document.createElement('button');
    el.setAttribute('class', 'slide-nav-buutton');
    el.setAttribute('id', `slideNavBuutton${index}`);
    sliderNavButtonsContainer.appendChild(el);
    el.addEventListener("click", moveToSpecificSlide(index));
  }
}

function moveToSpecificSlide( index ){
  console.log(index);
}

function rightClick(){
  moveRight();
  clearInterval(interval);
  const interval = window.setInterval(moveRight, 5000);
}

function moveRight(){
  sliderSlide.style.transition = "transform 0.6s ease-in-out";
  if (counter <= slidesCount-2){
    counter++;
    sliderSlide.style.transform = `translateX(${ -widthPx * counter }px)`;
  }
  else {
    counter=0;
    sliderSlide.style.transform = `translateX(${ -widthPx * counter }px)`;
  }
};

function moveLeft(){
  sliderSlide.style.transition = "transform 0.6s ease-in-out";
  if (counter > 0){
    counter--;
    sliderSlide.style.transform = `translateX(${ -widthPx * counter }px)`;
  }
  else {
    counter=slidesCount-1;
    sliderSlide.style.transform = `translateX(${ -widthPx * counter }px)`;
  }
}

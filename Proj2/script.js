document.querySelector("#left-slider-button").addEventListener('click', moveLeft);
document.querySelector("#right-slider-button").addEventListener("click", moveRight);

const sliderSlide = document.querySelector('.slider-slide');
const slides = document.querySelectorAll(".slide");

const widthPx = 600;
const slidesCount = 5;
let counter = 0;

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

// const timeoutRef = setTimeout( 
//   () => {
//       main.innerHTML='From setTimeout'
//   },
//   2000
// )
// let licznik = 0 
// const intervalRef = setInterval( 
//   () => {
//       moveRight
//   },
//   2000
// )

const intervalId = window.setInterval(moveRight, 5000);


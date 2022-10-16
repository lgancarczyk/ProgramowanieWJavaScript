document.querySelector("#left-slider-button").addEventListener("click", moveRight);
document.querySelector("#right-slider-button").addEventListener("click", moveRight);

const maxPX = 3000;

// const newspaperSpinning = [
//     { transform: maxPX + 600 },
//     { transform: 'rotate(360deg) scale(0)' }
//   ];

//   function moveRight() {
//        document.querySelectorAll(".slide").forEach(slide => console.log("www"))
       
//       }

function moveRight() {
   document.querySelectorAll(".slide").forEach(slide => {
        slide.animate([
            // keyframes
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-600px)' }
          ], {
            // timing options
            duration: 1000
          });
    });
   
  }
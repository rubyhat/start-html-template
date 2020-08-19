//Smooth scroll
// console.log('start position = ' + window.pageYOffset);
const smoothScroll = (target, duration) => {
  var target = document.querySelector(target);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let startTime = null;

  // console.log('target position = ' + targetPosition);

  const animation = currentTime => {
    if (startTime === null) startTime = currentTime;
    // console.log(startTime);
    let timeElapsed = currentTime - startTime;
    // console.log('elapsed ' + timeElapsed);
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  // Больше плавных функций здесь ---> http://www.gizma.com/easing/
  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

let btn1 = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');

btn1.addEventListener('click', () => {
  smoothScroll('.btn2', 2350);
});

btn2.addEventListener('click', () => {
  smoothScroll('.btn1', 2350);
});

// Scroll with jQuery
// $(document).ready(function () {
//   $('.scroll-anch').click(function () {
//     var scroll_el = $(this).data('target');
//     if ($(scroll_el).length != 0) {
//       $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 750);
//     }
//     return false;
//   });

//   $('.scroll-anch').click(function () {
//     $('html body').animate({
//       scrollTop: $(this).offset().top
//     }, 750)
//   });
// });
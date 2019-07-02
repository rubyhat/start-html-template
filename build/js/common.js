//Good scroll Up
window.addEventListener('scroll', function checkPosition () {
  scrolled = window.pageYOffset;
  console.log(scrolled);
  if (scrolled > 630) {
    scrollTop.classList.add('show-goUp');
  } else {
    scrollTop.classList.remove('show-goUp')
  }
})

function smoothScroll(target, duration) {
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

var goUp = document.querySelector('.taste-title__arrow');
goUp.addEventListener('click', function () {
  smoothScroll('.head', 1000);
});

//Bad scroll up
// var scrolled;
// var timer;

// window.addEventListener('scroll', function checkPosition () {
//   scrolled = window.pageYOffset;
//   console.log(scrolled);
//   if (scrolled > 630) {
//     scrollTop.classList.add('show-goUp');
//   } else {
//     scrollTop.classList.remove('show-goUp')
//   }
// })

// document.getElementById('scrollTop').addEventListener('click', function goUp() {
//   if (scrolled > 0) {
//     window.scrollTo(0, scrolled);
//     scrolled -= 50;
//     timer = setTimeout(goUp, 14)
//   } else {
//     clearTimeout(timer);
//     window.scrollTo(0, 0);
//   }
// })


//Slider
var i = 0
j = 0;
document.getElementById('right').addEventListener('click', function sliderRight() {
  var content__items = document.getElementById('slider_content');
  i += - 301;
  if (i < -1169) {
    i = 0;
  }
  content__items.style.left = i + 'px';
})
document.getElementById('left').addEventListener('click', function sliderLeft() {
  var content__items = document.getElementById('slider_content');
  i += 301;
  if (i > 0) {
    i = 0;
  }
  content__items.style.left = i + 'px';
})

//Footer select-currency
const currency__links = document.querySelectorAll('.currency');
const currency__select = document.querySelector('.currency');

currency__links.forEach(el => {
  el.addEventListener('click', function () {
    currency__select.textContent = this.textContent;
  });
});

document.getElementById('currency-select').addEventListener('click', function currencySelect() {
  console.log('Clicked');
  if (document.getElementById('currency-list').classList.contains('click')) {
    document.getElementById('currency-list').classList.remove('click');
  } else {
    var currencyList = document.getElementById('currency-list');
    currencyList.classList.add('click');
    currencyList.style.pointerEvents = 'auto';
  }
})

//Footer select-lang
const links = document.querySelectorAll('.language');
const select = document.querySelector('.language');

links.forEach(el => {
  el.addEventListener('click', function () {
    select.textContent = this.textContent;
  });
});

document.getElementById('lang-select').addEventListener('click', function langSelect() {
  console.log('Clicked');
  if (document.getElementById('select-list').classList.contains('click')) {
    document.getElementById('select-list').classList.remove('click');
  } else {
    var selectList = document.getElementById('select-list');
    selectList.classList.add('click');
    selectList.style.pointerEvents = 'auto';
  }
})


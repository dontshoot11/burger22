let buttonBurger = document.querySelector('.button-burger');
let wallpaperFullscreen = document.querySelector('.wallpaper--fullscreen')
buttonBurger.addEventListener('click', function() { wallpaperFullscreen.style.right = '0' })
let fullscreenExit = document.querySelector('.fullscreen__exit');
fullscreenExit.addEventListener('click', function() { wallpaperFullscreen.style.right = '-100%' });


let menuAccordeonCard = document.querySelectorAll('.menu-accordeon__card');
for (let i = 0; i < menuAccordeonCard.length; i++) { menuAccordeonCard[i].addEventListener('click', function() { menuAccordeonCard[i].classList.toggle('menu-accordeon__card--active') }) };


let accordeonCard = document.querySelectorAll('.accordeon__card');
for (let i = 0; i < accordeonCard.length; i++) { accordeonCard[i].addEventListener('click', function() { accordeonCard[i].classList.toggle('accordeon__card--active') }) }
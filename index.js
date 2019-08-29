let buttonBurger = document.querySelector('.button-burger');
let wallpaperFullscreen = document.querySelector('.wallpaper--fullscreen')
buttonBurger.addEventListener('click', function() { wallpaperFullscreen.style.right = '0' })
let fullscreenExit = document.querySelector('.fullscreen__exit');
fullscreenExit.addEventListener('click', function() { wallpaperFullscreen.style.right = '-100%' });
let a = document.querySelectorAll('a');
for (let i = 0; i < a.length; i++) { a[i].addEventListener('click', function() { wallpaperFullscreen.style.right = '-100%' }) }



let menuAccordeonCard = document.querySelectorAll('.menu-accordeon__card');
for (let i = 0; i < menuAccordeonCard.length; i++) { menuAccordeonCard[i].addEventListener('click', function() { menuAccordeonCard[i].classList.toggle('menu-accordeon__card--active') }) };


let accordeonCard = document.querySelectorAll('.accordeon__card');
for (let i = 0; i < accordeonCard.length; i++) {
    accordeonCard[i].addEventListener('click', function() {
        accordeonCard[i].classList.toggle('accordeon__card--active')
    })
};

let sideMenuLink = document.querySelectorAll('.sidemenu__link');
for (let i = 0; i < sideMenuLink.length; i++) { sideMenuLink[i].addEventListener('focus', function() { sideMenuLink[i].classList.toggle('sidemenu__link--active') }) };
/* позже допилю
let popupExit = document.querySelector('.popup__exit');
let popup = document.querySelector('.popup');
let dishComposition = document.querySelector('.dish-composition')
dishComposition.addEventListener('click', function() {
    popup.style.opacity = '1';
    dishComposition.style.backgroundColor = '#e35028'
});
popupExit.addEventListener('click', function() {
    popup.style.opacity = '0';
    dishComposition.style.backgroundColor = '#f08c33'
});
*/
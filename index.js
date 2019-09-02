let buttonBurger = document.querySelector('.button-burger');
let wallpaperFullscreen = document.querySelector('.wallpaper--fullscreen')
buttonBurger.addEventListener('click', function() { wallpaperFullscreen.style.right = '0' })
let fullscreenExit = document.querySelector('.fullscreen__exit');
fullscreenExit.addEventListener('click', function() { wallpaperFullscreen.style.right = '-100%' });
let a = document.querySelectorAll('a');
for (let i = 0; i < a.length; i++) { a[i].addEventListener('click', function() { wallpaperFullscreen.style.right = '-100%' }) }



let menuAccordeonCard = document.querySelectorAll('.menu-accordeon__card');

for (let i = 0; i < menuAccordeonCard.length; i++) {



    menuAccordeonCard[i].addEventListener('click', function() {
        let activeCard = document.querySelector('.menu-accordeon__card--active');
        if (activeCard) { activeCard.classList.remove('menu-accordeon__card--active', menuAccordeonCard[i].classList.add('menu-accordeon__card--active')) } else { menuAccordeonCard[i].classList.add('menu-accordeon__card--active') };
    })
};

//это меню с бургерами






let accordeonCard = document.querySelectorAll('.accordeon__card');

console.log(accordeonCard[0].childNodes[3].firstElementChild.contentHeight);

for (let i = 0; i < accordeonCard.length; i++) {



    accordeonCard[i].addEventListener('click', function() {
        let activeCard = document.querySelector('.accordeon__card--active');
        let contentHeight = accordeonCard[i].childNodes[3].firstElementChild.contentHeight + "rem";

        if (activeCard) {

            activeCard.childNodes[3].style.height = 0;
            console.log(accordeonCard[0].childNodes[3].firstElementChild.contentHeight);

            activeCard.classList.remove('accordeon__card--active');
            //accordeonCard[i].classList.add('accordeon__card--active');
            // accordeonCard[i].childNodes[3].style.height = aboutHeight;

        } else {
            accordeonCard[i].classList.add('accordeon__card--active');

            accordeonCard[i].childNodes[3].style.height = contentHeight;
        };
    })
};


//это меню с командой

let sideMenuLink = document.querySelectorAll('.sidemenu__link');
for (let i = 0; i < sideMenuLink.length; i++) { sideMenuLink[i].addEventListener('focus', function() { sideMenuLink[i].classList.toggle('sidemenu__link--active') }) };
/*
let popupExit = document.querySelector('.popup__exit');
let popup = document.querySelector('.popup');
let dishComposition = document.querySelector('.dish-composition')
dishComposition.addEventListener('click', function() {
    popup.style.opacity = '1',
        dishComposition.style.backgroundColor = '#e35028'
});
popupExit.addEventListener('click', function() {
    popup.style.opacity = '0',
        dishComposition.style.backgroundColor = '#f08c33'
});*/

let arrowRight = document.querySelector('.slider-button__arrow--right');
let slidersList = document.querySelector('.sliders-list');
let arrowLeft = document.querySelector('.slider-button__arrow--left');

arrowRight.addEventListener('click', function(e) { e.preventDefault, slidersList.appendChild(slidersList.firstElementChild) })
arrowLeft.addEventListener('click', function(e) { e.preventDefault, slidersList.insertBefore(slidersList.lastElementChild, slidersList.firstElementChild) })
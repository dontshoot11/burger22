/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) {
    $.fn.touchwipe = function(settings) {
        var config = { min_move_x: 20, min_move_y: 20, wipeLeft: function() {}, wipeRight: function() {}, wipeUp: function() {}, wipeDown: function() {}, preventDefaultEvents: true };
        if (settings) $.extend(config, settings);
        this.each(function() {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false
            }

            function onTouchMove(e) { if (config.preventDefaultEvents) { e.preventDefault() } if (isMoving) { var x = e.touches[0].pageX; var y = e.touches[0].pageY; var dx = startX - x; var dy = startY - y; if (Math.abs(dx) >= config.min_move_x) { cancelTouch(); if (dx > 0) { config.wipeLeft() } else { config.wipeRight() } } else if (Math.abs(dy) >= config.min_move_y) { cancelTouch(); if (dy > 0) { config.wipeDown() } else { config.wipeUp() } } } }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false)
                }
            }
            if ('ontouchstart' in document.documentElement) { this.addEventListener('touchstart', onTouchStart, false) }
        });
        return this
    }
})(jQuery);


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
        let menuAside = document.querySelector('.menu-aside');

        let asideWidth = menuAside.clientWidth;
        console.log(asideWidth);
        let menuAccordeonButton = document.querySelectorAll('.menu-accordeon__button');
        let contentWidth = menuAccordeonCard[i].childNodes[3].firstElementChild.scrollWidth + "px";

        if (activeCard) {

            activeCard.childNodes[3].style.width = 0;
            console.log(menuAccordeonCard[0].childNodes[3].firstElementChild.offsetWidth);
            console.log(menuAccordeonCard[0].childNodes[3].firstElementChild);
            console.log(menuAccordeonCard[0].childNodes[3]);
            console.log(asideWidth + ' меню асайд');
            console.log(contentWidth);

            activeCard.classList.remove('menu-accordeon__card--active');
            if (activeCard !== menuAccordeonCard[i]) {
                menuAccordeonCard[i].classList.add('menu-accordeon__card--active'), menuAccordeonCard[i].childNodes[3].style.width = contentWidth;
            };



        } else {
            menuAccordeonCard[i].classList.add('menu-accordeon__card--active'),


                menuAccordeonCard[i].childNodes[3].style.width = contentWidth;



            console.log(menuAccordeonCard[i].childNodes[3])


        };
    })
};

//это меню с бургерами

let accordeonCard = document.querySelectorAll('.accordeon__card');


for (let i = 0; i < accordeonCard.length; i++) {



    accordeonCard[i].addEventListener('click', function() {
        let activeCard = document.querySelector('.accordeon__card--active');
        let contentHeight = accordeonCard[i].childNodes[3].firstElementChild.clientHeight + "px";

        if (activeCard) {

            activeCard.childNodes[3].style.height = 0;
            console.log(accordeonCard[0].childNodes[3].firstElementChild.clientHeight);
            console.log(accordeonCard[0].childNodes[3].firstElementChild);

            activeCard.classList.remove('accordeon__card--active');
            if (activeCard !== accordeonCard[i]) {
                accordeonCard[i].classList.add('accordeon__card--active'), accordeonCard[i].childNodes[3].style.height = contentHeight;
            };



        } else {
            accordeonCard[i].classList.add('accordeon__card--active');

            accordeonCard[i].childNodes[3].style.height = contentHeight;
        };
    })
};


//это меню с командой

//let sideMenuLink = document.querySelectorAll('.sidemenu__link');
//for (let i = 0; i < sideMenuLink.length; i++) { sideMenuLink[i].addEventListener('focus', function() { sideMenuLink[i].classList.toggle('sidemenu__link--active') }) };
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
let arrowLeft = $('.slider-button__arrow--left');
let arrowRight = $('.slider-button__arrow--right');
let slidersList = $('.sliders-list');
let slides = $('.slider-card');

console.log(slides.length);





arrowLeft.on('click', function() {
    let activeSlide = $('.slider-card--active');
    let reqItem = activeSlide.prev();
    let reqIndex = reqItem.index();

    if (reqItem.length) {

        slidersList.animate({ "left": -reqIndex * 100 + '%' }, 300, function() { activeSlide.removeClass('slider-card--active'), reqItem.addClass('slider-card--active') })
    }
});

arrowRight.on('click', function() {
    let activeSlide = $('.slider-card--active');
    let reqItem = activeSlide.next();
    let reqIndex = reqItem.index();

    if (reqItem.length) {

        slidersList.animate({ "left": -reqIndex * 100 + '%' }, 300, function() { activeSlide.removeClass('slider-card--active'), reqItem.addClass('slider-card--active') })
    }
});



//{ e.preventDefault(), slidersList.appendChild(slidersList.firstElementChild) });




let form = document.querySelector('.form__elem');
let formButton = document.querySelector('.button--form');
let fields = document.querySelectorAll('.form__input');
let modal = document.querySelector('.modal');
let modalText = document.querySelector('.modal-window--text');
let modalButton = document.querySelector('.modal-window--button');
let body = document.querySelector('body');
modalButton.addEventListener('click', function() {
    modal.style.display = 'none';
    // if ($(window).width() < 768) { body.style.overflow = 'auto' }

})










formButton.addEventListener('click', function(e) {
    e.preventDefault();
    const data = { name: form.elements.name.value, phone: form.elements.phone.value, comment: form.elements.comment.value };
    const formData = new FormData(form);
    formData.append("name", form.elements.name.value);
    formData.append("phone", form.elements.phone.value);
    formData.append("comment", form.elements.comment.value);
    formData.append("to", "my@gmail.com");
    console.log(formData);
    console.log(data);

    var xhr = new XMLHttpRequest();

    function validation() {
        if (form.elements.name.checkValidity() &&
            form.elements.phone.checkValidity() &&
            form.elements.comment.checkValidity()) { return true } else {
            return false //form.elements.name.validationMessage
        }
    };


    console.log(validation());

    if (validation()) {

        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.responseType = "json";


        xhr.addEventListener('load',
            function() {
                if (xhr.response.status) {
                    modal.style.display = 'flex';
                    modalText.textContent = 'Сообщение отправлено';
                    //  if ($(window).width() < 768) { body.style.overflow = 'hidden' };

                    form.reset();
                } else {
                    modal.style.display = 'flex';
                    modalText.textContent = 'что-то пошло не так, попробуйте еще раз';
                    // if ($(window).width() < 768) { body.style.overflow = 'hidden' };

                }
            })
    } else {
        modal.style.display = 'flex';
        modalText.textContent = 'Поля "Имя","Телефон" и "Комментарий" нужно заполнить, без них доставку не оформить';
        //  if ($(window).width() < 768) { body.style.overflow = 'hidden' };

    }








})

let feedbackExit = document.querySelector(
    '.popup__exit--feedback');
let popupFeedback = document.querySelector('.feedback-popup');
let feedbackButtons = document.querySelectorAll('.button--reviews');
let reviews = document.querySelectorAll('.reviews__article');


feedbackExit.addEventListener('click', function() { popupFeedback.style.display = 'none' });
for (let i = 0; i < feedbackButtons.length; i++) {
    feedbackButtons[i].addEventListener('click',
        function() {
            popupFeedback.style.display = 'flex';
            let feedbackPopupName = document.querySelector('.feedback-popup__name');
            let feedbackCardName = document.querySelectorAll('.reviews__name');
            let feedbackPopupReview = document.querySelector('.feedback-popup__text');
            let cardReview = document.querySelectorAll('.reviews__text');
            feedbackPopupName.textContent = feedbackCardName[i].textContent;
            feedbackPopupReview.textContent = cardReview[i].textContent;

        })
}
let wrapper = $('.wrapper');
$(document).ready(function() {
    if ($(window).width() > 768) {
        $('.wrapper').css("top", "0vh");
        let windowHeight = $(window).height();
        let sideMenuButton = $('.sidemenuButton');




        $('body').on('wheel', function(e) {
            //e.preventDefault();
            // e.stopPropagation();

            let activeSection = $('.section-active');

            if (e.originalEvent.deltaY < 0) {
                let reqSection = activeSection.next();
                let reqSlideIndex = reqSection.index();
                let sideMenuButtonActive = $('.sidemenu__button--active');
                let reqButton = sideMenuButtonActive.next();
                let activeButtonIndex = sideMenuButtonActive.index();




                console.log('идем вниз');
                console.log($(document).scrollTop());
                if (reqSection.length) {

                    wrapper.animate({ 'top': -reqSlideIndex * 100 + 'vh' }, 400, function() {
                        activeSection.removeClass('section-active'), reqSection.addClass('section-active'),
                            sideMenuButtonActive.removeClass('sidemenu__button--active'), reqButton.addClass('sidemenu__button--active'), console.log(activeButtonIndex + '  индекс кнопки')
                    });
                }




            } else {
                let reqSection = activeSection.prev();
                let reqSlideIndex = reqSection.index();
                let sideMenuButtonActive = $('.sidemenu__button--active');
                let reqButton = sideMenuButtonActive.prev();


                if (reqSection.length) {
                    console.log('идем вверх');
                    console.log($(document).scrollTop());

                    wrapper.animate({ 'top': -reqSlideIndex * 100 + 'vh' }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active'), sideMenuButtonActive.removeClass('sidemenu__button--active'), reqButton.addClass('sidemenu__button--active') });
                } else { wrapper.animate({ 'top': 0 }, 400, function() { activeSection.removeClass('section-active'), $('section').first().addClass('section-active') }) }
            }



        })
    }

})
let sideMenuButton = $('.sidemenu__button');




sideMenuButton.on('click', function(e) {
    let sideMenuButtonActive = $('.sidemenu__button--active');
    let activeButtonIndex = sideMenuButtonActive.index();

    let windowHeight = $(window).height();
    let activeSection = $('.section-active');




    e.preventDefault, sideMenuButtonActive.removeClass('sidemenu__button--active'),
        $(this).addClass('sidemenu__button--active');


    wrapper.animate({ 'top': -$(this).index() * 100 + 'vh' }, 400, function() {
        let sideMenuButtonActive = $('.sidemenu__button--active');
        let activeButtonIndex = sideMenuButtonActive.index();
        let newSection = $('section:eq(' + (parseInt(activeButtonIndex)) + ')');
        activeSection.removeClass('section-active'), newSection.addClass('section-active'), console.log(activeButtonIndex + ' индекс кнопки')
    })


})




$('body').touchwipe({
    wipeUp: function() {
        let wrapper = $('.wrapper');
        let activeSection = $('.section-active');
        let reqSection = activeSection.prev();
        let reqSlideIndex = reqSection.index();
        let windowHeight = $(window).innerHeight();
        console.log(windowHeight);


        console.log('идем вниз');

        if (reqSection.length) {

            wrapper.animate({ 'top': -reqSlideIndex * 110 + 'vh' /*windowHeight + 'px'*/ }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active') });
        }
    },
    wipeDown: function() {
        let wrapper = $('.wrapper');
        let activeSection = $('.section-active');
        let reqSection = activeSection.next();
        let reqSlideIndex = reqSection.index();
        let windowHeight = $(window).innerHeight();


        console.log('идем вверх');
        console.log($(document).scrollTop());
        if (reqSection.length) {

            wrapper.animate({ 'top': -reqSlideIndex * 110 + 'vh' /*windowHeight + 'px'*/ }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active') });
        }
    }
});
//патч для мобильных устройств
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', '${vh}px');

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', '${vh}px');
});
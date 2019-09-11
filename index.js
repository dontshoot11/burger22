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



$(document).ready(function() {
    var defaultSectionHeight = $('section').innerHeight();
    console.log(defaultSectionHeight + ' дефолтная высота секции');
    wheelScroll();
    swipeScroll();
})



let buttonBurger = document.querySelector('.button-burger');
let wallpaperFullscreen = document.querySelector('.wallpaper--fullscreen')
buttonBurger.addEventListener('click', function() { wallpaperFullscreen.style.right = '0' });
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







let form = document.querySelector('.form__elem');
let formButton = document.querySelector('.button--form');
let fields = document.querySelectorAll('.form__input');
let modal = document.querySelector('.modal');
let modalText = document.querySelector('.modal-window--text');
let modalButton = document.querySelector('.modal-window--button');
let body = document.querySelector('body');










//$('.form__input').each(function(){})
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
            return false
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
                    // if ($(window).width() < 768) { body.style.overflow = 'hidden' };

                    form.reset();
                } else {
                    modal.style.display = 'flex';
                    modalText.textContent = 'что-то пошло не так, попробуйте еще раз';
                    //  if ($(window).width() < 768) { body.style.overflow = 'hidden' };

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
let activeSectionPosition = $('.section-active').index() * 100 + 'vh';
console.log(activeSectionPosition);



//if ($(window).width() > 768) {


$('.wrapper').css("top", "0vh");
let windowHeight = $(window).height();
window.scrollTo(0, 1);







function wheelScroll() {
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

                wrapper.stop(true, false).animate({ 'top': -reqSlideIndex * 100 + 'vh' }, 300, function() {
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

                wrapper.stop(true, false).animate({ 'top': -reqSlideIndex * 100 + 'vh' }, 300, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active'), sideMenuButtonActive.removeClass('sidemenu__button--active'), reqButton.addClass('sidemenu__button--active') });
            } else { wrapper.stop(true, false).animate({ 'top': 0 }, 300, function() { activeSection.removeClass('section-active'), $('section').first().addClass('section-active') }) }
        }



    });
}


function swipeScroll() {
    $('body').touchwipe({
        wipeUp: function() {
            let wrapper = $('.wrapper');
            let activeSection = $('.section-active');
            let reqSection = activeSection.prev();
            let reqSlideIndex = reqSection.index();
            const sectionHeight = $('section').innerHeight();
            console.log(sectionHeight + ' высота секции', window.innerHeight + ' высота окна');


            console.log('идем вниз');

            if (reqSection.length) {

                wrapper.stop(true, false).animate({
                    'top': -reqSlideIndex * sectionHeight + 'px'
                }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active') });
            }
        },
        wipeDown: function() {
            let wrapper = $('.wrapper');
            let activeSection = $('.section-active');
            let reqSection = activeSection.next();
            let reqSlideIndex = reqSection.index();
            const sectionHeight = $('section').innerHeight();



            console.log('идем вверх');

            if (reqSection.length) {

                wrapper.stop(true, false).animate({
                    'top': -reqSlideIndex * sectionHeight + 'px'
                }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active') });
            }
        }
    });
}








let verticalItem = $('.vertical-menu-list__element')
verticalItem.on('click', function(e) {
    const sectionHeight = $('section').innerHeight();
    let thisIndex = $(this).index() + 1;
    console.log(thisIndex + ' thisIndex')

    e.preventDefault();
    wrapper.stop(true, false).animate({ 'top': -thisIndex * sectionHeight + 'px' }, 300)






})

let logo = $('.logo')

logo.on('click', function(e) { wrapper.stop(true, false).animate({ 'top': 0 }, 300) })






let sideMenuButton = $('.sidemenu__button');




sideMenuButton.on('click', function(e) {

    e.preventDefault;
    let sideMenuButtonActive = $('.sidemenu__button--active');
    let activeButtonIndex = sideMenuButtonActive.index();

    let windowHeight = $(window).height();
    let activeSection = $('.section-active');




    sideMenuButtonActive.removeClass('sidemenu__button--active');
    $(this).addClass('sidemenu__button--active');




    wrapper.stop(true, false).animate({ 'top': -$(this).index() * 100 + 'vh' }, 300,
        function() {
            let sideMenuButtonActive = $('.sidemenu__button--active');
            let activeButtonIndex = sideMenuButtonActive.index();
            let newSection = $('section:eq(' + (parseInt(activeButtonIndex)) + ')');
            activeSection.removeClass('section-active'), newSection.addClass('section-active'), console.log(activeButtonIndex + ' индекс кнопки')
        })


})

$('.button--order').on('click',
        function(e) {
            const sectionHeight = $('section').innerHeight();
            e.preventDefault();
            wrapper.stop(true, false).animate({

                    'top': -$('.order').index() * sectionHeight + 'px'
                }, 300,
                function() {
                    let orderIndex = $('.order').index();

                    $('.order').siblings().removeClass('section-active');
                    $('.order').addClass('section-active');
                    $('.sidemenu__button:eq(' + orderIndex + ')').addClass('sidemenu__button--active');
                    $('.sidemenu__button:eq(' + orderIndex + ')').siblings().removeClass('sidemenu__button--active');

                }


            )
        })
    //}



$('.form__input').focus(function() {
    let sectionHeight = $('section').innerHeight();
    let orderIndex = $('.order').index();
    let orderPosition = orderIndex * -sectionHeight;


    //'top': -$('.order').index() * sectionHeight + 'px'

    console.log(orderPosition);
    console.log('куку');
    $('.order').css({ "position": "fixed", "top": "0px", "z-index": "2" });



});

$('.form__input').blur(function() {
    let sectionHeight = $('section').innerHeight();
    let orderIndex = $('.order').index();
    let orderPosition = orderIndex * -sectionHeight;
    console.log('куку');
    $('.order').css({ "position": "relative" });
    $('.order').addClass('section-active');
    $('.order').siblings().removeClass('section-active');
    wrapper.css("top", orderPosition + "px")
});




//})







ymaps.ready(init);

function init() {
    // Создание карты.    
    var myMap = new ymaps.Map("yandexmap", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [59.93511328687912, 30.307292324790485],
        controls: ["zoomControl"],
        behaviors: ["drag"],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 10
    });

    var placemarkA = new ymaps.Placemark([59.953198673530146, 30.393466336020953], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    myMap.geoObjects.add(placemarkA);


    var placemarkB = new ymaps.Placemark([60.06179348690544, 30.315511972036752], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    myMap.geoObjects.add(placemarkB);


    var placemarkC = new ymaps.Placemark([59.90158991123217, 30.501454044039573], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    myMap.geoObjects.add(placemarkC);


    var placemarkD = new ymaps.Placemark([59.83427718228793, 30.321805167353265], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    myMap.geoObjects.add(placemarkD);
};


/*$(body).ready(function() {
    wrapper.stop(true, false).animate({ 'top': 1000 }, 1, function() {
        { wrapper.stop(true, false).animate({ 'top': 0 }, 1) }
    })
}); */
const defaultSectionHeight = $('section').innerHeight(); //измеряем высоту секции после загрузки экрана (чтобы зафиксировать ее до того,
//как мобильные браузеры начнут менять)

$(document).ready(function() { //запускаем прокрутку по колесу, свайпу, стрелочкам

    console.log(defaultSectionHeight + ' дефолтная высота секции');

    wheelScroll();
    swipeScroll();

    keyScroll();


})


function goingUp() { //функция, которая крутит content наверх
    console.log('идем вверх');
    let content = $('.content');
    let activeSection = $('.section-active');
    let reqSection = activeSection.prev();
    let reqSlideIndex = reqSection.index();
    const sectionHeight = $('section').innerHeight();
    let sideMenuButtonActive = $('.sidemenu__button--active');
    let reqButton = sideMenuButtonActive.prev();
    let activeButtonIndex = sideMenuButtonActive.prev();

    if (reqSection.length) {

        content.stop(true, false).animate({
            'top': -reqSlideIndex * sectionHeight + 'px'
        }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active'), sideMenuButtonActive.removeClass('sidemenu__button--active'), reqButton.addClass('sidemenu__button--active') });
    }
}

function goingDown() { //функция, которая крутит вниз

    console.log('идем вниз');
    let content = $('.content');
    let activeSection = $('.section-active');
    let reqSection = activeSection.next();
    let reqSlideIndex = reqSection.index();
    const sectionHeight = $('section').innerHeight();
    let sideMenuButtonActive = $('.sidemenu__button--active');
    let reqButton = sideMenuButtonActive.next();
    let activeButtonIndex = sideMenuButtonActive.index();




    if (reqSection.length) {

        content.stop(true, false).animate({
            'top': -reqSlideIndex * sectionHeight + 'px'
        }, 400, function() { activeSection.removeClass('section-active'), reqSection.addClass('section-active'), sideMenuButtonActive.removeClass('sidemenu__button--active'), reqButton.addClass('sidemenu__button--active') });
    }


}

//прокрутка по колесу
function wheelScroll() {
    $('body').on('wheel', function(e) {
        if (e.originalEvent.deltaY < 0) {
            goingDown()
        } else { goingUp() }
    })
}


//прокрутка по свайпам
function swipeScroll() {

    let ts;
    $(document).bind('touchstart', function(e) {
        ts = e.originalEvent.touches[0].clientY;
    });

    $(document).bind('touchend', function(e) {
        var te = e.originalEvent.changedTouches[0].clientY;
        if (ts > te + 5) {

            goingDown();
        } else if (ts < te - 5) {
            goingUp();
        }
    });




}



//по стрелочкам
function keyScroll() {
    $('body').keydown(function(e) {
        console.log('нажал ' + e.which);
        if (e.which === 38) { goingUp() };
        if (e.which === 40) { goingDown() }



    })
}

let verticalItem = $('.vertical-menu-list__element') //вертикальное меню (бутерброд мобильной версии)
verticalItem.on('click', function(e) {
    const sectionHeight = $('section').innerHeight();
    let thisIndex = $(this).index() + 1;
    console.log(thisIndex + ' thisIndex')

    e.preventDefault();
    content.stop(true, false).animate({ 'top': -$('section:not(.order):eq(' + thisIndex + ')').index() * sectionHeight + 'px' }, 300, function() {
        $('section:not(.order):eq(' + thisIndex + ')').addClass('section-active');
        $('section:not(.order):eq(' + thisIndex + ')').siblings().removeClass('section-active');


    })








})

let horizontalItem = $('.navigation__element') //горизотальное меню 
horizontalItem.on('click', function(e) {
    let sections = $('section:not(.order)');

    const sectionHeight = $('section').innerHeight();
    let thisIndex = $(this).index() + 1;

    console.log($('section:not(.order):eq(' + thisIndex + ')').index())


    e.preventDefault();
    content.stop(true, false).animate({ 'top': -$('section:not(.order):eq(' + thisIndex + ')').index() * sectionHeight + 'px' }, 300, function() {
        $('section:not(.order):eq(' + thisIndex + ')').addClass('section-active');
        $('section:not(.order):eq(' + thisIndex + ')').siblings().removeClass('section-active');
        let activeIndex = $('.section-active').index()
        $('.sidemenu__button:eq(' + activeIndex + ')').addClass('sidemenu__button--active');
        $('.sidemenu__button:eq(' + activeIndex + ')').siblings().removeClass('sidemenu__button--active');


    })

})

let sideMenuButton = $('.sidemenu__button'); //боковое меню (кружочки справа в дексктопной версии)




sideMenuButton.on('click', function(e) {

    e.preventDefault;
    let sideMenuButtonActive = $('.sidemenu__button--active');
    let activeButtonIndex = sideMenuButtonActive.index();

    let windowHeight = $(window).height();
    let activeSection = $('.section-active');




    sideMenuButtonActive.removeClass('sidemenu__button--active');
    $(this).addClass('sidemenu__button--active');




    content.stop(true, false).animate({ 'top': -$(this).index() * 100 + 'vh' }, 300,
        function() {
            let sideMenuButtonActive = $('.sidemenu__button--active');
            let activeButtonIndex = sideMenuButtonActive.index();
            let newSection = $('section:eq(' + (parseInt(activeButtonIndex)) + ')');
            activeSection.removeClass('section-active'), newSection.addClass('section-active'), console.log(activeButtonIndex + ' индекс кнопки')
        })


})


//РАБОТА ФОРМЫ С ЗАКАЗОМ

$('.form__input').focus(function() { //фиксируем секцию с импутом во время ввода (чтобы ее не толкала виртуальная клавиатура)
    let sectionHeight = $('section').innerHeight();
    let orderIndex = $('.order').index();
    let orderPosition = orderIndex * -sectionHeight;




    console.log(orderPosition);
    console.log('куку');
    $('.order').css({ "position": "fixed", "left": "0", "top": "0", "bottom": "0", "right": "0" });
    $('.lock').css({ "display": "block" });



});


$('.form__input').blur(function() { //отпускаем секцию с формой заказа
    let sectionHeight = $('section').innerHeight();
    let orderIndex = $('.order').index();
    let orderPosition = orderIndex * -defaultSectionHeight;
    console.log('куку');
    $('.order').css({ "position": "relative" });
    $('.order').addClass('section-active');
    $('.order').siblings().removeClass('section-active');
    content.css("top", orderPosition + "px");
    $('.lock').css({ "display": "none" });
});

let form = document.querySelector('.form__elem');
let formButton = document.querySelector('.button--form');
let fields = document.querySelectorAll('.form__input');
let modal = document.querySelector('.modal');
let modalText = document.querySelector('.modal-window--text');
let modalButton = document.querySelector('.modal-window--button');
let body = document.querySelector('body');

formButton.addEventListener('click', function(e) { //после нажатия кнопки отправить секция с формой возвращается на свое место
    e.preventDefault();
    content.stop(true, false).animate({

            'top': -$('.order').index() * defaultSectionHeight + 'px'
        }, 300,
        function() {
            let orderIndex = $('.order').index();

            $('.order').siblings().removeClass('section-active');
            $('.order').addClass('section-active');
            $('.sidemenu__button:eq(' + orderIndex + ')').addClass('sidemenu__button--active');
            $('.sidemenu__button:eq(' + orderIndex + ')').siblings().removeClass('sidemenu__button--active');

        }


    )

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

$('.modal-window--button').on('click', function() { //работа кнопки модального окна формы
    let sectionHeight = $('section').innerHeight();
    let orderIndex = $('.order').index();
    let orderPosition = orderIndex * -sectionHeight;


    $('.modal').css("display", "none");
    $('.content').css("top", orderPosition + "px")

})

$('.button--order').on('click', //кнопка заказать вверху страницы перематывает ее до секции с заказом
    function(e) {
        const sectionHeight = $('section').innerHeight();
        e.preventDefault();
        content.stop(true, false).animate({

                'top': -$('.order').index() * defaultSectionHeight + 'px'
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



//РАБОТА АККОРДЕОНОВ
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


//СЛАЙДЕР 

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










//СЕКЦИЯ С ОТЗЫВАМ
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
let content = $('.content');
let activeSectionPosition = $('.section-active').index() * 100 + 'vh';
console.log(activeSectionPosition);



//if ($(window).width() > 768) {





let logo = $('.logo')

logo.on('click', function(e) { content.stop(true, false).animate({ 'top': 0 }, 300) })





















//я скопировал код, но честно разобрался в нем сначала

let video;
let durationControl;
let soundControl;
let intervalId;

document.addEventListener('DOMContentLoaded', e => {
    video = document.getElementById('video');

    // вешаем обработчик события на на тег video
    video.addEventListener('click', playStop);

    // находим все кнопки play и навешиваем через цикл на каждую обработчик
    let playButtons = document.querySelectorAll('.play');
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    // обработчик событий на кнопку динамик
    let micControl = document.getElementById('micLevel');
    micControl.addEventListener('click', soundOf);

    // обработчики события для ползунка продолжительности видео
    durationControl = document.getElementById('durationLevel');
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.addEventListener('click', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;

    // обработчики события для ползунка громоксти
    soundControl = document.getElementById('volumeLevel');
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume);

    // задаем максимальное и минимальное значение volume
    soundControl.min = 0;
    soundControl.max = 10;

    soundControl.value = soundControl.max;

})

function playStop() {
    // нахожу мою кнопку с картинкой PLAY и показываю или скрываю ее
    let playImg = document.querySelector('.video__play');
    playImg.classList.toggle('video__play--active');

    // присваиваем ползунку проолжительности видео максимальное значение 
    // равное продолжительности нашего видео
    durationControl.max = video.duration;

    // проверяем стоит ли видео на паузе, если да то продолжаем воспроизведение
    if (video.paused) {
        // запускаем видео
        video.play();
        // обновляем ползунок каждые 15 мили секунд функцией updateDuration
        intervalId = setInterval(updateDuration, 1000 / 66);
    } else {
        // понимаем что видео не стоит на паузе,и ставим его на паузу
        video.pause();
        clearInterval(intervalId);
    }
}

// обновляет позицию ползунка продолжительности видео
function updateDuration() {
    durationControl.value = video.currentTime;
}

function stopInterval() {
    video.pause();
    clearInterval(intervalId);
}

// Реализует возможность перемотки видео
function setVideoDuration() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    video.currentTime = durationControl.value;
    // обновляем ползунок каждые 15 мили секунд функцией updateDuration
    intervalId = setInterval(updateDuration, 1000 / 66);
}

// управление звуком видео
function changeSoundVolume() {
    // свойстов video.volume может иметь значени от 0 до 1 
    // поэтому делим все на 10 , что бы более четко контролировать значение

    video.volume = soundControl.value / 10;
}

function soundOf() {
    // делаем проверку уровня громкости 
    // если у нашего видео есть звук , то мы его выключаем 
    // предварительно запомнив текущую позицию громкости в переменную soundLevel

    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

//яндекс карты

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0U2VjdGlvbkhlaWdodCA9ICQoJ3NlY3Rpb24nKS5pbm5lckhlaWdodCgpOyAvL9C40LfQvNC10YDRj9C10Lwg0LLRi9GB0L7RgtGDINGB0LXQutGG0LjQuCDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0Y3QutGA0LDQvdCwICjRh9GC0L7QsdGLINC30LDRhNC40LrRgdC40YDQvtCy0LDRgtGMINC10LUg0LTQviDRgtC+0LPQvixcclxuLy/QutCw0Log0LzQvtCx0LjQu9GM0L3Ri9C1INCx0YDQsNGD0LfQtdGA0Ysg0L3QsNGH0L3Rg9GCINC80LXQvdGP0YLRjClcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkgeyAvL9C30LDQv9GD0YHQutCw0LXQvCDQv9GA0L7QutGA0YPRgtC60YMg0L/QviDQutC+0LvQtdGB0YMsINGB0LLQsNC50L/Rgywg0YHRgtGA0LXQu9C+0YfQutCw0LxcclxuXHJcbiAgICBjb25zb2xlLmxvZyhkZWZhdWx0U2VjdGlvbkhlaWdodCArICcg0LTQtdGE0L7Qu9GC0L3QsNGPINCy0YvRgdC+0YLQsCDRgdC10LrRhtC40LgnKTtcclxuXHJcbiAgICB3aGVlbFNjcm9sbCgpO1xyXG4gICAgc3dpcGVTY3JvbGwoKTtcclxuXHJcbiAgICBrZXlTY3JvbGwoKTtcclxuXHJcblxyXG59KVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdvaW5nVXAoKSB7IC8v0YTRg9C90LrRhtC40Y8sINC60L7RgtC+0YDQsNGPINC60YDRg9GC0LjRgiBjb250ZW50INC90LDQstC10YDRhVxyXG4gICAgY29uc29sZS5sb2coJ9C40LTQtdC8INCy0LLQtdGA0YUnKTtcclxuICAgIGxldCBjb250ZW50ID0gJCgnLmNvbnRlbnQnKTtcclxuICAgIGxldCBhY3RpdmVTZWN0aW9uID0gJCgnLnNlY3Rpb24tYWN0aXZlJyk7XHJcbiAgICBsZXQgcmVxU2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ucHJldigpO1xyXG4gICAgbGV0IHJlcVNsaWRlSW5kZXggPSByZXFTZWN0aW9uLmluZGV4KCk7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gJCgnc2VjdGlvbicpLmlubmVySGVpZ2h0KCk7XHJcbiAgICBsZXQgc2lkZU1lbnVCdXR0b25BY3RpdmUgPSAkKCcuc2lkZW1lbnVfX2J1dHRvbi0tYWN0aXZlJyk7XHJcbiAgICBsZXQgcmVxQnV0dG9uID0gc2lkZU1lbnVCdXR0b25BY3RpdmUucHJldigpO1xyXG4gICAgbGV0IGFjdGl2ZUJ1dHRvbkluZGV4ID0gc2lkZU1lbnVCdXR0b25BY3RpdmUucHJldigpO1xyXG5cclxuICAgIGlmIChyZXFTZWN0aW9uLmxlbmd0aCkge1xyXG5cclxuICAgICAgICBjb250ZW50LnN0b3AodHJ1ZSwgZmFsc2UpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogLXJlcVNsaWRlSW5kZXggKiBzZWN0aW9uSGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH0sIDQwMCwgZnVuY3Rpb24oKSB7IGFjdGl2ZVNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyksIHJlcVNlY3Rpb24uYWRkQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyksIHNpZGVNZW51QnV0dG9uQWN0aXZlLnJlbW92ZUNsYXNzKCdzaWRlbWVudV9fYnV0dG9uLS1hY3RpdmUnKSwgcmVxQnV0dG9uLmFkZENsYXNzKCdzaWRlbWVudV9fYnV0dG9uLS1hY3RpdmUnKSB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ29pbmdEb3duKCkgeyAvL9GE0YPQvdC60YbQuNGPLCDQutC+0YLQvtGA0LDRjyDQutGA0YPRgtC40YIg0LLQvdC40LdcclxuXHJcbiAgICBjb25zb2xlLmxvZygn0LjQtNC10Lwg0LLQvdC40LcnKTtcclxuICAgIGxldCBjb250ZW50ID0gJCgnLmNvbnRlbnQnKTtcclxuICAgIGxldCBhY3RpdmVTZWN0aW9uID0gJCgnLnNlY3Rpb24tYWN0aXZlJyk7XHJcbiAgICBsZXQgcmVxU2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ubmV4dCgpO1xyXG4gICAgbGV0IHJlcVNsaWRlSW5kZXggPSByZXFTZWN0aW9uLmluZGV4KCk7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gJCgnc2VjdGlvbicpLmlubmVySGVpZ2h0KCk7XHJcbiAgICBsZXQgc2lkZU1lbnVCdXR0b25BY3RpdmUgPSAkKCcuc2lkZW1lbnVfX2J1dHRvbi0tYWN0aXZlJyk7XHJcbiAgICBsZXQgcmVxQnV0dG9uID0gc2lkZU1lbnVCdXR0b25BY3RpdmUubmV4dCgpO1xyXG4gICAgbGV0IGFjdGl2ZUJ1dHRvbkluZGV4ID0gc2lkZU1lbnVCdXR0b25BY3RpdmUuaW5kZXgoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBpZiAocmVxU2VjdGlvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgY29udGVudC5zdG9wKHRydWUsIGZhbHNlKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IC1yZXFTbGlkZUluZGV4ICogc2VjdGlvbkhlaWdodCArICdweCdcclxuICAgICAgICB9LCA0MDAsIGZ1bmN0aW9uKCkgeyBhY3RpdmVTZWN0aW9uLnJlbW92ZUNsYXNzKCdzZWN0aW9uLWFjdGl2ZScpLCByZXFTZWN0aW9uLmFkZENsYXNzKCdzZWN0aW9uLWFjdGl2ZScpLCBzaWRlTWVudUJ1dHRvbkFjdGl2ZS5yZW1vdmVDbGFzcygnc2lkZW1lbnVfX2J1dHRvbi0tYWN0aXZlJyksIHJlcUJ1dHRvbi5hZGRDbGFzcygnc2lkZW1lbnVfX2J1dHRvbi0tYWN0aXZlJykgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuLy/Qv9GA0L7QutGA0YPRgtC60LAg0L/QviDQutC+0LvQtdGB0YNcclxuZnVuY3Rpb24gd2hlZWxTY3JvbGwoKSB7XHJcbiAgICAkKCdib2R5Jykub24oJ3doZWVsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQuZGVsdGFZIDwgMCkge1xyXG4gICAgICAgICAgICBnb2luZ0Rvd24oKVxyXG4gICAgICAgIH0gZWxzZSB7IGdvaW5nVXAoKSB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuLy/Qv9GA0L7QutGA0YPRgtC60LAg0L/QviDRgdCy0LDQudC/0LDQvFxyXG5mdW5jdGlvbiBzd2lwZVNjcm9sbCgpIHtcclxuXHJcbiAgICBsZXQgdHM7XHJcbiAgICAkKGRvY3VtZW50KS5iaW5kKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHRzID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciB0ZSA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIGlmICh0cyA+IHRlICsgNSkge1xyXG5cclxuICAgICAgICAgICAgZ29pbmdEb3duKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cyA8IHRlIC0gNSkge1xyXG4gICAgICAgICAgICBnb2luZ1VwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8v0L/QviDRgdGC0YDQtdC70L7Rh9C60LDQvFxyXG5mdW5jdGlvbiBrZXlTY3JvbGwoKSB7XHJcbiAgICAkKCdib2R5Jykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ9C90LDQttCw0LsgJyArIGUud2hpY2gpO1xyXG4gICAgICAgIGlmIChlLndoaWNoID09PSAzOCkgeyBnb2luZ1VwKCkgfTtcclxuICAgICAgICBpZiAoZS53aGljaCA9PT0gNDApIHsgZ29pbmdEb3duKCkgfVxyXG5cclxuXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxubGV0IHZlcnRpY2FsSXRlbSA9ICQoJy52ZXJ0aWNhbC1tZW51LWxpc3RfX2VsZW1lbnQnKSAvL9Cy0LXRgNGC0LjQutCw0LvRjNC90L7QtSDQvNC10L3RjiAo0LHRg9GC0LXRgNCx0YDQvtC0INC80L7QsdC40LvRjNC90L7QuSDQstC10YDRgdC40LgpXHJcbnZlcnRpY2FsSXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gJCgnc2VjdGlvbicpLmlubmVySGVpZ2h0KCk7XHJcbiAgICBsZXQgdGhpc0luZGV4ID0gJCh0aGlzKS5pbmRleCgpICsgMTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXNJbmRleCArICcgdGhpc0luZGV4JylcclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb250ZW50LnN0b3AodHJ1ZSwgZmFsc2UpLmFuaW1hdGUoeyAndG9wJzogLSQoJ3NlY3Rpb246bm90KC5vcmRlcik6ZXEoJyArIHRoaXNJbmRleCArICcpJykuaW5kZXgoKSAqIHNlY3Rpb25IZWlnaHQgKyAncHgnIH0sIDMwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnc2VjdGlvbjpub3QoLm9yZGVyKTplcSgnICsgdGhpc0luZGV4ICsgJyknKS5hZGRDbGFzcygnc2VjdGlvbi1hY3RpdmUnKTtcclxuICAgICAgICAkKCdzZWN0aW9uOm5vdCgub3JkZXIpOmVxKCcgKyB0aGlzSW5kZXggKyAnKScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyk7XHJcblxyXG5cclxuICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSlcclxuXHJcbmxldCBob3Jpem9udGFsSXRlbSA9ICQoJy5uYXZpZ2F0aW9uX19lbGVtZW50JykgLy/Qs9C+0YDQuNC30L7RgtCw0LvRjNC90L7QtSDQvNC10L3RjiBcclxuaG9yaXpvbnRhbEl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IHNlY3Rpb25zID0gJCgnc2VjdGlvbjpub3QoLm9yZGVyKScpO1xyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSAkKCdzZWN0aW9uJykuaW5uZXJIZWlnaHQoKTtcclxuICAgIGxldCB0aGlzSW5kZXggPSAkKHRoaXMpLmluZGV4KCkgKyAxO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCQoJ3NlY3Rpb246bm90KC5vcmRlcik6ZXEoJyArIHRoaXNJbmRleCArICcpJykuaW5kZXgoKSlcclxuXHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29udGVudC5zdG9wKHRydWUsIGZhbHNlKS5hbmltYXRlKHsgJ3RvcCc6IC0kKCdzZWN0aW9uOm5vdCgub3JkZXIpOmVxKCcgKyB0aGlzSW5kZXggKyAnKScpLmluZGV4KCkgKiBzZWN0aW9uSGVpZ2h0ICsgJ3B4JyB9LCAzMDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJ3NlY3Rpb246bm90KC5vcmRlcik6ZXEoJyArIHRoaXNJbmRleCArICcpJykuYWRkQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnc2VjdGlvbjpub3QoLm9yZGVyKTplcSgnICsgdGhpc0luZGV4ICsgJyknKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWN0aW9uLWFjdGl2ZScpO1xyXG4gICAgICAgIGxldCBhY3RpdmVJbmRleCA9ICQoJy5zZWN0aW9uLWFjdGl2ZScpLmluZGV4KClcclxuICAgICAgICAkKCcuc2lkZW1lbnVfX2J1dHRvbjplcSgnICsgYWN0aXZlSW5kZXggKyAnKScpLmFkZENsYXNzKCdzaWRlbWVudV9fYnV0dG9uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKCcuc2lkZW1lbnVfX2J1dHRvbjplcSgnICsgYWN0aXZlSW5kZXggKyAnKScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3NpZGVtZW51X19idXR0b24tLWFjdGl2ZScpO1xyXG5cclxuXHJcbiAgICB9KVxyXG5cclxufSlcclxuXHJcbmxldCBzaWRlTWVudUJ1dHRvbiA9ICQoJy5zaWRlbWVudV9fYnV0dG9uJyk7IC8v0LHQvtC60L7QstC+0LUg0LzQtdC90Y4gKNC60YDRg9C20L7Rh9C60Lgg0YHQv9GA0LDQstCwINCyINC00LXQutGB0LrRgtC+0L/QvdC+0Lkg0LLQtdGA0YHQuNC4KVxyXG5cclxuXHJcblxyXG5cclxuc2lkZU1lbnVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQ7XHJcbiAgICBsZXQgc2lkZU1lbnVCdXR0b25BY3RpdmUgPSAkKCcuc2lkZW1lbnVfX2J1dHRvbi0tYWN0aXZlJyk7XHJcbiAgICBsZXQgYWN0aXZlQnV0dG9uSW5kZXggPSBzaWRlTWVudUJ1dHRvbkFjdGl2ZS5pbmRleCgpO1xyXG5cclxuICAgIGxldCB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICBsZXQgYWN0aXZlU2VjdGlvbiA9ICQoJy5zZWN0aW9uLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG5cclxuICAgIHNpZGVNZW51QnV0dG9uQWN0aXZlLnJlbW92ZUNsYXNzKCdzaWRlbWVudV9fYnV0dG9uLS1hY3RpdmUnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ3NpZGVtZW51X19idXR0b24tLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG5cclxuICAgIGNvbnRlbnQuc3RvcCh0cnVlLCBmYWxzZSkuYW5pbWF0ZSh7ICd0b3AnOiAtJCh0aGlzKS5pbmRleCgpICogMTAwICsgJ3ZoJyB9LCAzMDAsXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWRlTWVudUJ1dHRvbkFjdGl2ZSA9ICQoJy5zaWRlbWVudV9fYnV0dG9uLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZUJ1dHRvbkluZGV4ID0gc2lkZU1lbnVCdXR0b25BY3RpdmUuaW5kZXgoKTtcclxuICAgICAgICAgICAgbGV0IG5ld1NlY3Rpb24gPSAkKCdzZWN0aW9uOmVxKCcgKyAocGFyc2VJbnQoYWN0aXZlQnV0dG9uSW5kZXgpKSArICcpJyk7XHJcbiAgICAgICAgICAgIGFjdGl2ZVNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyksIG5ld1NlY3Rpb24uYWRkQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyksIGNvbnNvbGUubG9nKGFjdGl2ZUJ1dHRvbkluZGV4ICsgJyDQuNC90LTQtdC60YEg0LrQvdC+0L/QutC4JylcclxuICAgICAgICB9KVxyXG5cclxuXHJcbn0pXHJcblxyXG5cclxuLy/QoNCQ0JHQntCi0JAg0KTQntCg0JzQqyDQoSDQl9CQ0JrQkNCX0J7QnFxyXG5cclxuJCgnLmZvcm1fX2lucHV0JykuZm9jdXMoZnVuY3Rpb24oKSB7IC8v0YTQuNC60YHQuNGA0YPQtdC8INGB0LXQutGG0LjRjiDRgSDQuNC80L/Rg9GC0L7QvCDQstC+INCy0YDQtdC80Y8g0LLQstC+0LTQsCAo0YfRgtC+0LHRiyDQtdC1INC90LUg0YLQvtC70LrQsNC70LAg0LLQuNGA0YLRg9Cw0LvRjNC90LDRjyDQutC70LDQstC40LDRgtGD0YDQsClcclxuICAgIGxldCBzZWN0aW9uSGVpZ2h0ID0gJCgnc2VjdGlvbicpLmlubmVySGVpZ2h0KCk7XHJcbiAgICBsZXQgb3JkZXJJbmRleCA9ICQoJy5vcmRlcicpLmluZGV4KCk7XHJcbiAgICBsZXQgb3JkZXJQb3NpdGlvbiA9IG9yZGVySW5kZXggKiAtc2VjdGlvbkhlaWdodDtcclxuXHJcblxyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZyhvcmRlclBvc2l0aW9uKTtcclxuICAgIGNvbnNvbGUubG9nKCfQutGD0LrRgycpO1xyXG4gICAgJCgnLm9yZGVyJykuY3NzKHsgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsIFwibGVmdFwiOiBcIjBcIiwgXCJ0b3BcIjogXCIwXCIsIFwiYm90dG9tXCI6IFwiMFwiLCBcInJpZ2h0XCI6IFwiMFwiIH0pO1xyXG4gICAgJCgnLmxvY2snKS5jc3MoeyBcImRpc3BsYXlcIjogXCJibG9ja1wiIH0pO1xyXG5cclxuXHJcblxyXG59KTtcclxuXHJcblxyXG4kKCcuZm9ybV9faW5wdXQnKS5ibHVyKGZ1bmN0aW9uKCkgeyAvL9C+0YLQv9GD0YHQutCw0LXQvCDRgdC10LrRhtC40Y4g0YEg0YTQvtGA0LzQvtC5INC30LDQutCw0LfQsFxyXG4gICAgbGV0IHNlY3Rpb25IZWlnaHQgPSAkKCdzZWN0aW9uJykuaW5uZXJIZWlnaHQoKTtcclxuICAgIGxldCBvcmRlckluZGV4ID0gJCgnLm9yZGVyJykuaW5kZXgoKTtcclxuICAgIGxldCBvcmRlclBvc2l0aW9uID0gb3JkZXJJbmRleCAqIC1kZWZhdWx0U2VjdGlvbkhlaWdodDtcclxuICAgIGNvbnNvbGUubG9nKCfQutGD0LrRgycpO1xyXG4gICAgJCgnLm9yZGVyJykuY3NzKHsgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIgfSk7XHJcbiAgICAkKCcub3JkZXInKS5hZGRDbGFzcygnc2VjdGlvbi1hY3RpdmUnKTtcclxuICAgICQoJy5vcmRlcicpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyk7XHJcbiAgICBjb250ZW50LmNzcyhcInRvcFwiLCBvcmRlclBvc2l0aW9uICsgXCJweFwiKTtcclxuICAgICQoJy5sb2NrJykuY3NzKHsgXCJkaXNwbGF5XCI6IFwibm9uZVwiIH0pO1xyXG59KTtcclxuXHJcbmxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2VsZW0nKTtcclxubGV0IGZvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1mb3JtJyk7XHJcbmxldCBmaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9faW5wdXQnKTtcclxubGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XHJcbmxldCBtb2RhbFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtd2luZG93LS10ZXh0Jyk7XHJcbmxldCBtb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC13aW5kb3ctLWJ1dHRvbicpO1xyXG5sZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbmZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7IC8v0L/QvtGB0LvQtSDQvdCw0LbQsNGC0LjRjyDQutC90L7Qv9C60Lgg0L7RgtC/0YDQsNCy0LjRgtGMINGB0LXQutGG0LjRjyDRgSDRhNC+0YDQvNC+0Lkg0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINC90LAg0YHQstC+0LUg0LzQtdGB0YLQvlxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29udGVudC5zdG9wKHRydWUsIGZhbHNlKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICd0b3AnOiAtJCgnLm9yZGVyJykuaW5kZXgoKSAqIGRlZmF1bHRTZWN0aW9uSGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH0sIDMwMCxcclxuICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IG9yZGVySW5kZXggPSAkKCcub3JkZXInKS5pbmRleCgpO1xyXG5cclxuICAgICAgICAgICAgJCgnLm9yZGVyJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnc2VjdGlvbi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLm9yZGVyJykuYWRkQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5zaWRlbWVudV9fYnV0dG9uOmVxKCcgKyBvcmRlckluZGV4ICsgJyknKS5hZGRDbGFzcygnc2lkZW1lbnVfX2J1dHRvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5zaWRlbWVudV9fYnV0dG9uOmVxKCcgKyBvcmRlckluZGV4ICsgJyknKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzaWRlbWVudV9fYnV0dG9uLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICApXHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHsgbmFtZTogZm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLCBwaG9uZTogZm9ybS5lbGVtZW50cy5waG9uZS52YWx1ZSwgY29tbWVudDogZm9ybS5lbGVtZW50cy5jb21tZW50LnZhbHVlIH07XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcIm5hbWVcIiwgZm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcInBob25lXCIsIGZvcm0uZWxlbWVudHMucGhvbmUudmFsdWUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKFwiY29tbWVudFwiLCBmb3JtLmVsZW1lbnRzLmNvbW1lbnQudmFsdWUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKFwidG9cIiwgXCJteUBnbWFpbC5jb21cIik7XHJcbiAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGlvbigpIHtcclxuICAgICAgICBpZiAoZm9ybS5lbGVtZW50cy5uYW1lLmNoZWNrVmFsaWRpdHkoKSAmJlxyXG4gICAgICAgICAgICBmb3JtLmVsZW1lbnRzLnBob25lLmNoZWNrVmFsaWRpdHkoKSAmJlxyXG4gICAgICAgICAgICBmb3JtLmVsZW1lbnRzLmNvbW1lbnQuY2hlY2tWYWxpZGl0eSgpKSB7IHJldHVybiB0cnVlIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKHZhbGlkYXRpb24oKSk7XHJcblxyXG4gICAgaWYgKHZhbGlkYXRpb24oKSkge1xyXG5cclxuICAgICAgICB4aHIub3BlbignUE9TVCcsICdodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWwnKTtcclxuICAgICAgICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xyXG5cclxuXHJcbiAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2Uuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSAn0KHQvtC+0LHRidC10L3QuNC1INC+0YLQv9GA0LDQstC70LXQvdC+JztcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpIHsgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSAn0YfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0L/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1INGA0LDQtyc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkgeyBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbicgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgbW9kYWxUZXh0LnRleHRDb250ZW50ID0gJ9Cf0L7Qu9GPIFwi0JjQvNGPXCIsXCLQotC10LvQtdGE0L7QvVwiINC4IFwi0JrQvtC80LzQtdC90YLQsNGA0LjQuVwiINC90YPQttC90L4g0LfQsNC/0L7Qu9C90LjRgtGMLCDQsdC10Lcg0L3QuNGFINC00L7RgdGC0LDQstC60YMg0L3QtSDQvtGE0L7RgNC80LjRgtGMJztcclxuICAgICAgICAvLyAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7IGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJyB9O1xyXG5cclxuICAgIH1cclxuXHJcbn0pXHJcblxyXG4kKCcubW9kYWwtd2luZG93LS1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgLy/RgNCw0LHQvtGC0LAg0LrQvdC+0L/QutC4INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGE0L7RgNC80YtcclxuICAgIGxldCBzZWN0aW9uSGVpZ2h0ID0gJCgnc2VjdGlvbicpLmlubmVySGVpZ2h0KCk7XHJcbiAgICBsZXQgb3JkZXJJbmRleCA9ICQoJy5vcmRlcicpLmluZGV4KCk7XHJcbiAgICBsZXQgb3JkZXJQb3NpdGlvbiA9IG9yZGVySW5kZXggKiAtc2VjdGlvbkhlaWdodDtcclxuXHJcblxyXG4gICAgJCgnLm1vZGFsJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAkKCcuY29udGVudCcpLmNzcyhcInRvcFwiLCBvcmRlclBvc2l0aW9uICsgXCJweFwiKVxyXG5cclxufSlcclxuXHJcbiQoJy5idXR0b24tLW9yZGVyJykub24oJ2NsaWNrJywgLy/QutC90L7Qv9C60LAg0LfQsNC60LDQt9Cw0YLRjCDQstCy0LXRgNGF0YMg0YHRgtGA0LDQvdC40YbRiyDQv9C10YDQtdC80LDRgtGL0LLQsNC10YIg0LXQtSDQtNC+INGB0LXQutGG0LjQuCDRgSDQt9Cw0LrQsNC30L7QvFxyXG4gICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSAkKCdzZWN0aW9uJykuaW5uZXJIZWlnaHQoKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29udGVudC5zdG9wKHRydWUsIGZhbHNlKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAndG9wJzogLSQoJy5vcmRlcicpLmluZGV4KCkgKiBkZWZhdWx0U2VjdGlvbkhlaWdodCArICdweCdcclxuICAgICAgICAgICAgfSwgMzAwLFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmRlckluZGV4ID0gJCgnLm9yZGVyJykuaW5kZXgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcub3JkZXInKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWN0aW9uLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLm9yZGVyJykuYWRkQ2xhc3MoJ3NlY3Rpb24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2lkZW1lbnVfX2J1dHRvbjplcSgnICsgb3JkZXJJbmRleCArICcpJykuYWRkQ2xhc3MoJ3NpZGVtZW51X19idXR0b24tLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnNpZGVtZW51X19idXR0b246ZXEoJyArIG9yZGVySW5kZXggKyAnKScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3NpZGVtZW51X19idXR0b24tLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgKVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxuLy/QoNCQ0JHQntCi0JAg0JDQmtCa0J7QoNCU0JXQntCd0J7QklxyXG5sZXQgYnV0dG9uQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1idXJnZXInKTtcclxubGV0IHdhbGxwYXBlckZ1bGxzY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2FsbHBhcGVyLS1mdWxsc2NyZWVuJylcclxuYnV0dG9uQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IHdhbGxwYXBlckZ1bGxzY3JlZW4uc3R5bGUucmlnaHQgPSAnMCcgfSk7XHJcbmxldCBmdWxsc2NyZWVuRXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mdWxsc2NyZWVuX19leGl0Jyk7XHJcbmZ1bGxzY3JlZW5FeGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IHdhbGxwYXBlckZ1bGxzY3JlZW4uc3R5bGUucmlnaHQgPSAnLTEwMCUnIH0pO1xyXG5sZXQgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7IGFbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHsgd2FsbHBhcGVyRnVsbHNjcmVlbi5zdHlsZS5yaWdodCA9ICctMTAwJScgfSkgfVxyXG5cclxuXHJcblxyXG5sZXQgbWVudUFjY29yZGVvbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1hY2NvcmRlb25fX2NhcmQnKTtcclxuXHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IG1lbnVBY2NvcmRlb25DYXJkLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cclxuXHJcbiAgICBtZW51QWNjb3JkZW9uQ2FyZFtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgYWN0aXZlQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFjY29yZGVvbl9fY2FyZC0tYWN0aXZlJyk7XHJcbiAgICAgICAgbGV0IG1lbnVBc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWFzaWRlJyk7XHJcblxyXG4gICAgICAgIGxldCBhc2lkZVdpZHRoID0gbWVudUFzaWRlLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFzaWRlV2lkdGgpO1xyXG4gICAgICAgIGxldCBtZW51QWNjb3JkZW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtYWNjb3JkZW9uX19idXR0b24nKTtcclxuICAgICAgICBsZXQgY29udGVudFdpZHRoID0gbWVudUFjY29yZGVvbkNhcmRbaV0uY2hpbGROb2Rlc1szXS5maXJzdEVsZW1lbnRDaGlsZC5zY3JvbGxXaWR0aCArIFwicHhcIjtcclxuXHJcbiAgICAgICAgaWYgKGFjdGl2ZUNhcmQpIHtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZUNhcmQuY2hpbGROb2Rlc1szXS5zdHlsZS53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lbnVBY2NvcmRlb25DYXJkWzBdLmNoaWxkTm9kZXNbM10uZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0V2lkdGgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZW51QWNjb3JkZW9uQ2FyZFswXS5jaGlsZE5vZGVzWzNdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVudUFjY29yZGVvbkNhcmRbMF0uY2hpbGROb2Rlc1szXSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFzaWRlV2lkdGggKyAnINC80LXQvdGOINCw0YHQsNC50LQnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY29udGVudFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZUNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1hY2NvcmRlb25fX2NhcmQtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQ2FyZCAhPT0gbWVudUFjY29yZGVvbkNhcmRbaV0pIHtcclxuICAgICAgICAgICAgICAgIG1lbnVBY2NvcmRlb25DYXJkW2ldLmNsYXNzTGlzdC5hZGQoJ21lbnUtYWNjb3JkZW9uX19jYXJkLS1hY3RpdmUnKSwgbWVudUFjY29yZGVvbkNhcmRbaV0uY2hpbGROb2Rlc1szXS5zdHlsZS53aWR0aCA9IGNvbnRlbnRXaWR0aDtcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZW51QWNjb3JkZW9uQ2FyZFtpXS5jbGFzc0xpc3QuYWRkKCdtZW51LWFjY29yZGVvbl9fY2FyZC0tYWN0aXZlJyksXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG1lbnVBY2NvcmRlb25DYXJkW2ldLmNoaWxkTm9kZXNbM10uc3R5bGUud2lkdGggPSBjb250ZW50V2lkdGg7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lbnVBY2NvcmRlb25DYXJkW2ldLmNoaWxkTm9kZXNbM10pXHJcblxyXG5cclxuICAgICAgICB9O1xyXG4gICAgfSlcclxufTtcclxuXHJcbi8v0Y3RgtC+INC80LXQvdGOINGBINCx0YPRgNCz0LXRgNCw0LzQuFxyXG5cclxubGV0IGFjY29yZGVvbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkZW9uX19jYXJkJyk7XHJcblxyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBhY2NvcmRlb25DYXJkLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cclxuXHJcbiAgICBhY2NvcmRlb25DYXJkW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkZW9uX19jYXJkLS1hY3RpdmUnKTtcclxuICAgICAgICBsZXQgY29udGVudEhlaWdodCA9IGFjY29yZGVvbkNhcmRbaV0uY2hpbGROb2Rlc1szXS5maXJzdEVsZW1lbnRDaGlsZC5jbGllbnRIZWlnaHQgKyBcInB4XCI7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVDYXJkKSB7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVDYXJkLmNoaWxkTm9kZXNbM10uc3R5bGUuaGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWNjb3JkZW9uQ2FyZFswXS5jaGlsZE5vZGVzWzNdLmZpcnN0RWxlbWVudENoaWxkLmNsaWVudEhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjY29yZGVvbkNhcmRbMF0uY2hpbGROb2Rlc1szXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVDYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2FjY29yZGVvbl9fY2FyZC0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVDYXJkICE9PSBhY2NvcmRlb25DYXJkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhY2NvcmRlb25DYXJkW2ldLmNsYXNzTGlzdC5hZGQoJ2FjY29yZGVvbl9fY2FyZC0tYWN0aXZlJyksIGFjY29yZGVvbkNhcmRbaV0uY2hpbGROb2Rlc1szXS5zdHlsZS5oZWlnaHQgPSBjb250ZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjY29yZGVvbkNhcmRbaV0uY2xhc3NMaXN0LmFkZCgnYWNjb3JkZW9uX19jYXJkLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjY29yZGVvbkNhcmRbaV0uY2hpbGROb2Rlc1szXS5zdHlsZS5oZWlnaHQgPSBjb250ZW50SGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICB9KVxyXG59O1xyXG5cclxuXHJcbi8v0KHQm9CQ0JnQlNCV0KAgXHJcblxyXG5sZXQgYXJyb3dMZWZ0ID0gJCgnLnNsaWRlci1idXR0b25fX2Fycm93LS1sZWZ0Jyk7XHJcbmxldCBhcnJvd1JpZ2h0ID0gJCgnLnNsaWRlci1idXR0b25fX2Fycm93LS1yaWdodCcpO1xyXG5sZXQgc2xpZGVyc0xpc3QgPSAkKCcuc2xpZGVycy1saXN0Jyk7XHJcbmxldCBzbGlkZXMgPSAkKCcuc2xpZGVyLWNhcmQnKTtcclxuXHJcbmNvbnNvbGUubG9nKHNsaWRlcy5sZW5ndGgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmFycm93TGVmdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBhY3RpdmVTbGlkZSA9ICQoJy5zbGlkZXItY2FyZC0tYWN0aXZlJyk7XHJcbiAgICBsZXQgcmVxSXRlbSA9IGFjdGl2ZVNsaWRlLnByZXYoKTtcclxuICAgIGxldCByZXFJbmRleCA9IHJlcUl0ZW0uaW5kZXgoKTtcclxuXHJcbiAgICBpZiAocmVxSXRlbS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgc2xpZGVyc0xpc3QuYW5pbWF0ZSh7IFwibGVmdFwiOiAtcmVxSW5kZXggKiAxMDAgKyAnJScgfSwgMzAwLCBmdW5jdGlvbigpIHsgYWN0aXZlU2xpZGUucmVtb3ZlQ2xhc3MoJ3NsaWRlci1jYXJkLS1hY3RpdmUnKSwgcmVxSXRlbS5hZGRDbGFzcygnc2xpZGVyLWNhcmQtLWFjdGl2ZScpIH0pXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuYXJyb3dSaWdodC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBhY3RpdmVTbGlkZSA9ICQoJy5zbGlkZXItY2FyZC0tYWN0aXZlJyk7XHJcbiAgICBsZXQgcmVxSXRlbSA9IGFjdGl2ZVNsaWRlLm5leHQoKTtcclxuICAgIGxldCByZXFJbmRleCA9IHJlcUl0ZW0uaW5kZXgoKTtcclxuXHJcbiAgICBpZiAocmVxSXRlbS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgc2xpZGVyc0xpc3QuYW5pbWF0ZSh7IFwibGVmdFwiOiAtcmVxSW5kZXggKiAxMDAgKyAnJScgfSwgMzAwLCBmdW5jdGlvbigpIHsgYWN0aXZlU2xpZGUucmVtb3ZlQ2xhc3MoJ3NsaWRlci1jYXJkLS1hY3RpdmUnKSwgcmVxSXRlbS5hZGRDbGFzcygnc2xpZGVyLWNhcmQtLWFjdGl2ZScpIH0pXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy/QodCV0JrQptCY0K8g0KEg0J7QotCX0KvQktCQ0JxcclxubGV0IGZlZWRiYWNrRXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAnLnBvcHVwX19leGl0LS1mZWVkYmFjaycpO1xyXG5sZXQgcG9wdXBGZWVkYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1wb3B1cCcpO1xyXG5sZXQgZmVlZGJhY2tCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbi0tcmV2aWV3cycpO1xyXG5sZXQgcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXZpZXdzX19hcnRpY2xlJyk7XHJcblxyXG5cclxuZmVlZGJhY2tFeGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IHBvcHVwRmVlZGJhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJyB9KTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkYmFja0J1dHRvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZlZWRiYWNrQnV0dG9uc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRmVlZGJhY2suc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgbGV0IGZlZWRiYWNrUG9wdXBOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLXBvcHVwX19uYW1lJyk7XHJcbiAgICAgICAgICAgIGxldCBmZWVkYmFja0NhcmROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJldmlld3NfX25hbWUnKTtcclxuICAgICAgICAgICAgbGV0IGZlZWRiYWNrUG9wdXBSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stcG9wdXBfX3RleHQnKTtcclxuICAgICAgICAgICAgbGV0IGNhcmRSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2aWV3c19fdGV4dCcpO1xyXG4gICAgICAgICAgICBmZWVkYmFja1BvcHVwTmFtZS50ZXh0Q29udGVudCA9IGZlZWRiYWNrQ2FyZE5hbWVbaV0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGZlZWRiYWNrUG9wdXBSZXZpZXcudGV4dENvbnRlbnQgPSBjYXJkUmV2aWV3W2ldLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICB9KVxyXG59XHJcbmxldCBjb250ZW50ID0gJCgnLmNvbnRlbnQnKTtcclxubGV0IGFjdGl2ZVNlY3Rpb25Qb3NpdGlvbiA9ICQoJy5zZWN0aW9uLWFjdGl2ZScpLmluZGV4KCkgKiAxMDAgKyAndmgnO1xyXG5jb25zb2xlLmxvZyhhY3RpdmVTZWN0aW9uUG9zaXRpb24pO1xyXG5cclxuXHJcblxyXG4vL2lmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBsb2dvID0gJCgnLmxvZ28nKVxyXG5cclxubG9nby5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7IGNvbnRlbnQuc3RvcCh0cnVlLCBmYWxzZSkuYW5pbWF0ZSh7ICd0b3AnOiAwIH0sIDMwMCkgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy/RjyDRgdC60L7Qv9C40YDQvtCy0LDQuyDQutC+0LQsINC90L4g0YfQtdGB0YLQvdC+INGA0LDQt9C+0LHRgNCw0LvRgdGPINCyINC90LXQvCDRgdC90LDRh9Cw0LvQsFxyXG5cclxubGV0IHZpZGVvO1xyXG5sZXQgZHVyYXRpb25Db250cm9sO1xyXG5sZXQgc291bmRDb250cm9sO1xyXG5sZXQgaW50ZXJ2YWxJZDtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHtcclxuICAgIHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvJyk7XHJcblxyXG4gICAgLy8g0LLQtdGI0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0L3QsCDRgtC10LMgdmlkZW9cclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVN0b3ApO1xyXG5cclxuICAgIC8vINC90LDRhdC+0LTQuNC8INCy0YHQtSDQutC90L7Qv9C60LggcGxheSDQuCDQvdCw0LLQtdGI0LjQstCw0LXQvCDRh9C10YDQtdC3INGG0LjQutC7INC90LAg0LrQsNC20LTRg9GOINC+0LHRgNCw0LHQvtGC0YfQuNC6XHJcbiAgICBsZXQgcGxheUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheScpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5QnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBsYXlCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVN0b3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNC5INC90LAg0LrQvdC+0L/QutGDINC00LjQvdCw0LzQuNC6XHJcbiAgICBsZXQgbWljQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaWNMZXZlbCcpO1xyXG4gICAgbWljQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNvdW5kT2YpO1xyXG5cclxuICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40Y8g0LTQu9GPINC/0L7Qu9C30YPQvdC60LAg0L/RgNC+0LTQvtC70LbQuNGC0LXQu9GM0L3QvtGB0YLQuCDQstC40LTQtdC+XHJcbiAgICBkdXJhdGlvbkNvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVyYXRpb25MZXZlbCcpO1xyXG4gICAgZHVyYXRpb25Db250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN0b3BJbnRlcnZhbCk7XHJcbiAgICBkdXJhdGlvbkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRWaWRlb0R1cmF0aW9uKTtcclxuXHJcbiAgICBkdXJhdGlvbkNvbnRyb2wubWluID0gMDtcclxuICAgIGR1cmF0aW9uQ29udHJvbC52YWx1ZSA9IDA7XHJcblxyXG4gICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjRjyDQtNC70Y8g0L/QvtC70LfRg9C90LrQsCDQs9GA0L7QvNC+0LrRgdGC0LhcclxuICAgIHNvdW5kQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2x1bWVMZXZlbCcpO1xyXG4gICAgc291bmRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlU291bmRWb2x1bWUpO1xyXG4gICAgc291bmRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjaGFuZ2VTb3VuZFZvbHVtZSk7XHJcblxyXG4gICAgLy8g0LfQsNC00LDQtdC8INC80LDQutGB0LjQvNCw0LvRjNC90L7QtSDQuCDQvNC40L3QuNC80LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgdm9sdW1lXHJcbiAgICBzb3VuZENvbnRyb2wubWluID0gMDtcclxuICAgIHNvdW5kQ29udHJvbC5tYXggPSAxMDtcclxuXHJcbiAgICBzb3VuZENvbnRyb2wudmFsdWUgPSBzb3VuZENvbnRyb2wubWF4O1xyXG5cclxufSlcclxuXHJcbmZ1bmN0aW9uIHBsYXlTdG9wKCkge1xyXG4gICAgLy8g0L3QsNGF0L7QttGDINC80L7RjiDQutC90L7Qv9C60YMg0YEg0LrQsNGA0YLQuNC90LrQvtC5IFBMQVkg0Lgg0L/QvtC60LDQt9GL0LLQsNGOINC40LvQuCDRgdC60YDRi9Cy0LDRjiDQtdC1XHJcbiAgICBsZXQgcGxheUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fcGxheScpO1xyXG4gICAgcGxheUltZy5jbGFzc0xpc3QudG9nZ2xlKCd2aWRlb19fcGxheS0tYWN0aXZlJyk7XHJcblxyXG4gICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQv9C+0LvQt9GD0L3QutGDINC/0YDQvtC+0LvQttC40YLQtdC70YzQvdC+0YHRgtC4INCy0LjQtNC10L4g0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICAvLyDRgNCw0LLQvdC+0LUg0L/RgNC+0LTQvtC70LbQuNGC0LXQu9GM0L3QvtGB0YLQuCDQvdCw0YjQtdCz0L4g0LLQuNC00LXQvlxyXG4gICAgZHVyYXRpb25Db250cm9sLm1heCA9IHZpZGVvLmR1cmF0aW9uO1xyXG5cclxuICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRgdGC0L7QuNGCINC70Lgg0LLQuNC00LXQviDQvdCwINC/0LDRg9C30LUsINC10YHQu9C4INC00LAg0YLQviDQv9GA0L7QtNC+0LvQttCw0LXQvCDQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LVcclxuICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LLQuNC00LXQvlxyXG4gICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAvLyDQvtCx0L3QvtCy0LvRj9C10Lwg0L/QvtC70LfRg9C90L7QuiDQutCw0LbQtNGL0LUgMTUg0LzQuNC70Lgg0YHQtdC60YPQvdC0INGE0YPQvdC60YbQuNC10LkgdXBkYXRlRHVyYXRpb25cclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodXBkYXRlRHVyYXRpb24sIDEwMDAgLyA2Nik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vINC/0L7QvdC40LzQsNC10Lwg0YfRgtC+INCy0LjQtNC10L4g0L3QtSDRgdGC0L7QuNGCINC90LAg0L/QsNGD0LfQtSzQuCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0L/QsNGD0LfRg1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0L7QsdC90L7QstC70Y/QtdGCINC/0L7Qt9C40YbQuNGOINC/0L7Qu9C30YPQvdC60LAg0L/RgNC+0LTQvtC70LbQuNGC0LXQu9GM0L3QvtGB0YLQuCDQstC40LTQtdC+XHJcbmZ1bmN0aW9uIHVwZGF0ZUR1cmF0aW9uKCkge1xyXG4gICAgZHVyYXRpb25Db250cm9sLnZhbHVlID0gdmlkZW8uY3VycmVudFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG59XHJcblxyXG4vLyDQoNC10LDQu9C40LfRg9C10YIg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQv9C10YDQtdC80L7RgtC60Lgg0LLQuNC00LXQvlxyXG5mdW5jdGlvbiBzZXRWaWRlb0R1cmF0aW9uKCkge1xyXG4gICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uQ29udHJvbC52YWx1ZTtcclxuICAgIC8vINC+0LHQvdC+0LLQu9GP0LXQvCDQv9C+0LvQt9GD0L3QvtC6INC60LDQttC00YvQtSAxNSDQvNC40LvQuCDRgdC10LrRg9C90LQg0YTRg9C90LrRhtC40LXQuSB1cGRhdGVEdXJhdGlvblxyXG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHVwZGF0ZUR1cmF0aW9uLCAxMDAwIC8gNjYpO1xyXG59XHJcblxyXG4vLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQt9Cy0YPQutC+0Lwg0LLQuNC00LXQvlxyXG5mdW5jdGlvbiBjaGFuZ2VTb3VuZFZvbHVtZSgpIHtcclxuICAgIC8vINGB0LLQvtC50YHRgtC+0LIgdmlkZW8udm9sdW1lINC80L7QttC10YIg0LjQvNC10YLRjCDQt9C90LDRh9C10L3QuCDQvtGCIDAg0LTQviAxIFxyXG4gICAgLy8g0L/QvtGN0YLQvtC80YMg0LTQtdC70LjQvCDQstGB0LUg0L3QsCAxMCAsINGH0YLQviDQsdGLINCx0L7Qu9C10LUg0YfQtdGC0LrQviDQutC+0L3RgtGA0L7Qu9C40YDQvtCy0LDRgtGMINC30L3QsNGH0LXQvdC40LVcclxuXHJcbiAgICB2aWRlby52b2x1bWUgPSBzb3VuZENvbnRyb2wudmFsdWUgLyAxMDtcclxufVxyXG5cclxuZnVuY3Rpb24gc291bmRPZigpIHtcclxuICAgIC8vINC00LXQu9Cw0LXQvCDQv9GA0L7QstC10YDQutGDINGD0YDQvtCy0L3RjyDQs9GA0L7QvNC60L7RgdGC0LggXHJcbiAgICAvLyDQtdGB0LvQuCDRgyDQvdCw0YjQtdCz0L4g0LLQuNC00LXQviDQtdGB0YLRjCDQt9Cy0YPQuiAsINGC0L4g0LzRiyDQtdCz0L4g0LLRi9C60LvRjtGH0LDQtdC8IFxyXG4gICAgLy8g0L/RgNC10LTQstCw0YDQuNGC0LXQu9GM0L3QviDQt9Cw0L/QvtC80L3QuNCyINGC0LXQutGD0YnRg9GOINC/0L7Qt9C40YbQuNGOINCz0YDQvtC80LrQvtGB0YLQuCDQsiDQv9C10YDQtdC80LXQvdC90YPRjiBzb3VuZExldmVsXHJcblxyXG4gICAgaWYgKHZpZGVvLnZvbHVtZSA9PT0gMCkge1xyXG4gICAgICAgIHZpZGVvLnZvbHVtZSA9IHNvdW5kTGV2ZWw7XHJcbiAgICAgICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRMZXZlbCAqIDEwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzb3VuZExldmVsID0gdmlkZW8udm9sdW1lO1xyXG4gICAgICAgIHZpZGVvLnZvbHVtZSA9IDA7XHJcbiAgICAgICAgc291bmRDb250cm9sLnZhbHVlID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuLy/Rj9C90LTQtdC60YEg0LrQsNGA0YLRi1xyXG5cclxueW1hcHMucmVhZHkoaW5pdCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQutCw0YDRgtGLLiAgICBcclxuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJ5YW5kZXhtYXBcIiwge1xyXG4gICAgICAgIC8vINCa0L7QvtGA0LTQuNC90LDRgtGLINGG0LXQvdGC0YDQsCDQutCw0YDRgtGLLlxyXG4gICAgICAgIC8vINCf0L7RgNGP0LTQvtC6INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOOiDCq9GI0LjRgNC+0YLQsCwg0LTQvtC70LPQvtGC0LDCuy5cclxuICAgICAgICAvLyDQp9GC0L7QsdGLINC90LUg0L7Qv9GA0LXQtNC10LvRj9GC0Ywg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YbQtdC90YLRgNCwINC60LDRgNGC0Ysg0LLRgNGD0YfQvdGD0Y4sXHJcbiAgICAgICAgLy8g0LLQvtGB0L/QvtC70YzQt9GD0LnRgtC10YHRjCDQuNC90YHRgtGA0YPQvNC10L3RgtC+0Lwg0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDQutC+0L7RgNC00LjQvdCw0YIuXHJcbiAgICAgICAgY2VudGVyOiBbNTkuOTM1MTEzMjg2ODc5MTIsIDMwLjMwNzI5MjMyNDc5MDQ4NV0sXHJcbiAgICAgICAgY29udHJvbHM6IFtcInpvb21Db250cm9sXCJdLFxyXG4gICAgICAgIGJlaGF2aW9yczogW1wiZHJhZ1wiXSxcclxuICAgICAgICAvLyDQo9GA0L7QstC10L3RjCDQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC40Y8uINCU0L7Qv9GD0YHRgtC40LzRi9C1INC30L3QsNGH0LXQvdC40Y86XHJcbiAgICAgICAgLy8g0L7RgiAwICjQstC10YHRjCDQvNC40YApINC00L4gMTkuXHJcbiAgICAgICAgem9vbTogMTBcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBwbGFjZW1hcmtBID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTkuOTUzMTk4NjczNTMwMTQ2LCAzMC4zOTM0NjYzMzYwMjA5NTNdLCB7fSwge1xyXG4gICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL21hcC9tYXAtbWFya2VyLnBuZycsXHJcbiAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTIzLCAtNTddXHJcbiAgICB9KTtcclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKHBsYWNlbWFya0EpO1xyXG5cclxuXHJcbiAgICB2YXIgcGxhY2VtYXJrQiA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzYwLjA2MTc5MzQ4NjkwNTQ0LCAzMC4zMTU1MTE5NzIwMzY3NTJdLCB7fSwge1xyXG4gICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL21hcC9tYXAtbWFya2VyLnBuZycsXHJcbiAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTIzLCAtNTddXHJcbiAgICB9KTtcclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKHBsYWNlbWFya0IpO1xyXG5cclxuXHJcbiAgICB2YXIgcGxhY2VtYXJrQyA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU5LjkwMTU4OTkxMTIzMjE3LCAzMC41MDE0NTQwNDQwMzk1NzNdLCB7fSwge1xyXG4gICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL21hcC9tYXAtbWFya2VyLnBuZycsXHJcbiAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTIzLCAtNTddXHJcbiAgICB9KTtcclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKHBsYWNlbWFya0MpO1xyXG5cclxuXHJcbiAgICB2YXIgcGxhY2VtYXJrRCA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU5LjgzNDI3NzE4MjI4NzkzLCAzMC4zMjE4MDUxNjczNTMyNjVdLCB7fSwge1xyXG4gICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL21hcC9tYXAtbWFya2VyLnBuZycsXHJcbiAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTIzLCAtNTddXHJcbiAgICB9KTtcclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKHBsYWNlbWFya0QpO1xyXG59OyJdLCJmaWxlIjoiaW5kZXguanMifQ==

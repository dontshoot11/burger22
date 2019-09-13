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


    let lastY;
    $(document).bind('touchmove', function(e) {
        let currentY = e.originalEvent.touches[0].clientY;
        if (currentY > lastY) {
            // moved down
            console.log('идём вниз');
            goingUp()

        } else {
            // moved up
            console.log('идём вверх');
            goingDown();
        }
        lastY = currentY;
    })
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
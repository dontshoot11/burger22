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
        let menuAccordeonButton = document.querySelector('.menu-accordeon__button');
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
            menuAccordeonCard[i].classList.add('menu-accordeon__card--active');

            menuAccordeonCard[i].childNodes[3].style.width = (asideWidth - menuAccordeonButton.scrollWidth) + 'px';

            console.log(menuAccordeonButton.scrollWidth)
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

arrowRight.addEventListener('click', function(e) { e.preventDefault(), slidersList.appendChild(slidersList.firstElementChild) });
arrowLeft.addEventListener('click', function(e) { e.preventDefault(), slidersList.insertBefore(slidersList.lastElementChild, slidersList.firstElementChild) })



let form = document.querySelector('.form__elem');
let formButton = document.querySelector('.button--form');
let fields = document.querySelectorAll('.form__input');
let modal = document.querySelector('.modal');
let modalText = document.querySelector('.modal-window--text');
let modalButton = document.querySelector('.modal-window--button');
let body = document.querySelector('body');
modalButton.addEventListener('click', function() {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
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
                    body.style.overflow = 'hidden';
                    form.reset();
                } else {
                    modal.style.display = 'flex';
                    modalText.textContent = 'что-то пошло не так, попробуйте еще раз';
                    body.style.overflow = 'hidden';
                }
            })
    } else {
        modal.style.display = 'flex';
        modalText.textContent = 'Поля "Имя","Телефон" и "Комментарий" нужно заполнить, без них доставку не оформить';
        body.style.overflow = 'hidden';
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

//for (let i=0; i<reviews.length; i++) {}
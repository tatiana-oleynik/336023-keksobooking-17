'use strict';

var AD_COUNT = 8;
var LOCATIONX_X = 0;
var LOCATIONX_Y = 700;
var LOCATIONY_X = 130;
var LOCATIONY_Y = 630;
var MAP_PIN_MAIN_COORDINATE = '570,375';

var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.children;
var mapFilters = document.querySelector('.map__filters');
var mapFiltersElements = mapFilters.children;
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var pin = document.getElementById('pin');
var address = document.getElementById('address');
var title = document.getElementById('title');
var price = document.getElementById('price');
var type = document.getElementById('type');
var timein = document.getElementById('timein');
var timeout = document.getElementById('timeout');

var typeHouse = ['palace', 'flat', 'house', 'bungalo'];

function hideElement(className, element) {
  element.classList.remove(className);
}

function disableElement(elementName) {
  elementName.setAttribute('disabled', 'disabled');
}

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function generateAd(index) {
  var avatarUrl = index > AD_COUNT ? 'img/avatars/user' + (index + 1) + '.png' : 'img/avatars/user0' + (index + 1) + '.png';

  var ad = {
    author: {
      avatar: avatarUrl,
    },

    offer: {
      type: typeHouse[getRandomInteger(0, typeHouse.length - 1)]
    },

    location: {
      x: getRandomInteger(LOCATIONX_X, LOCATIONX_Y),
      y: getRandomInteger(LOCATIONY_X, LOCATIONY_Y)
    }
  };

  return ad;
}

function generateAds(count) {
  var adsData = [];

  for (var i = 0; i < count; i++) {
    adsData.push(generateAd(i));
  }

  return adsData;
}

function renderPoint(ad) {
  var mapPin = pin.content.cloneNode(true);
  var pinButton = mapPin.querySelector('.map__pin');
  var pinImg = mapPin.querySelector('img');

  pinButton.style.left = ad.location.x + 'px';
  pinButton.style.top = ad.location.y + 'px';

  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;

  return mapPin;
}

function renderPoints(ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPoint(ads[i]));
  }

  mapPinMain.addEventListener('click', function () {
    mapPins.appendChild(fragment);
  });
}

renderPoints(generateAds(AD_COUNT));

function activeForm() {
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }

  for (i = 0; i < mapFiltersElements.length; i++) {
    mapFiltersElements[i].removeAttribute('disabled');
  }
}

function disableForm() {
  for (var i = 0; i < adFormElements.length; i++) {
    disableElement(adFormElements[i]);
  }

  for (i = 0; i < mapFiltersElements.length; i++) {
    disableElement(mapFiltersElements[i]);
  }
}

disableForm();

mapPinMain.addEventListener('mouseup', function () {
  hideElement('map--faded', map);
  hideElement('ad-form--disabled', adForm);
  activeForm();
  address.value = MAP_PIN_MAIN_COORDINATE;
});

title.addEventListener('invalid', function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

price.addEventListener('invalid', function () {
  if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

type.addEventListener('change', function (event) {
  if (event.target.value === 'bungalo') {
    price.setAttribute('placeholder', 0);
  } else if (event.target.value === 'flat') {
    price.setAttribute('placeholder', 1000);
  } else if (event.target.value === 'house') {
    price.setAttribute('placeholder', 5000);
  } else if (event.target.value === 'palace') {
    price.setAttribute('placeholder', 10000);
  }
});

timein.addEventListener('change', function (evt) {
  if (evt.target.value === '12:00') {
    timeout.options[0].text = 'Выезд до 12';
    timeout.options[0].selected = true;
  } else if (evt.target.value === '13:00') {
    timeout.options[1].text = 'Выезд до 13';
    timeout.options[1].selected = true;
  } else if (evt.target.value === '14:00') {
    timeout.options[2].text = 'Выезд до 14';
    timeout.options[2].selected = true;
  }
});

timeout.addEventListener('change', function (evt) {
  if (evt.target.value === '12:00') {
    timein.options[0].text = 'После 12';
    timein.options[0].selected = true;
  } else if (evt.target.value === '13:00') {
    timein.options[1].text = 'После 13';
    timein.options[1].selected = true;
  } else if (evt.target.value === '14:00') {
    timein.options[2].text = 'После 14';
    timein.options[2].selected = true;
  }
});

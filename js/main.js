'use strict';

var AD_COUNT = 8;
var LOCATIONX_X = 0;
var LOCATIONX_Y = 700;
var LOCATIONY_X = 130;
var LOCATIONY_Y = 630;
var MAP_PIN_MAIN_COORDINATE = '570,375';

var adForm = showElement('.ad-form');
var adFormElements = adForm.children;
var mapFilters = showElement('.map__filters');
var mapFiltersElements = mapFilters.children;
var map = showElement('.map');
var mapPinMain = showElement('.map__pin--main');
var mapPins = showElement('.map__pins');
var pin = findElement('pin');
var address = findElement('address');

var typeHouse = ['palace', 'flat', 'house', 'bungalo'];

function showElement(className) {
  return document.querySelector(className);
}

function findElement(idElement) {
  return document.getElementById(idElement);
}

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

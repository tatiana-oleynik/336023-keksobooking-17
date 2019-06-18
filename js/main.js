'use strict';

var AD_COUNT = 8;
var LOCATIONX_X = 0;
var LOCATIONX_Y = 700;
var LOCATIONY_X = 130;
var LOCATIONY_Y = 630;
var MAP_PIN_MAIN_COORDINATE = '570,375';

function showElement(className) {
  return document.querySelector(className);
}

function hideElement(className, element) {
  element.classList.remove(className);
}

function findElement(idElement) {
  return document.getElementById(idElement);
}

var description = findElement('description');
var formSubmit = showElement('.ad-form__submit');
var formReset = showElement('.ad-form__reset');
var images = findElement('images');
var features = showElement('.features');
var capacity = findElement('capacity');
var roomNumber = findElement('room_number');
var timein = findElement('timein');
var timeout = findElement('timeout');
var price = findElement('price');
var type = findElement('type');
var address = findElement('address');
var title = findElement('title');
var avatar = findElement('avatar');

var housingType = findElement('housing-type');
var housingPrice = findElement('housing-price');
var housingRooms = findElement('housing-rooms');
var housingGuests = findElement('housing-guests');
var housingFeatures = findElement('housing-features');

function disableElement(elementName) {
  elementName.setAttribute('disabled', 'disabled');
}

function removeAttribute(elementName) {
  elementName.removeAttribute('disabled');
}

var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.children;
var mapFilters =  document.querySelector('.map__filters');
var mapFiltersElements = mapFilters.children;

function disableForm() {
  for (var i = 0; i < adFormElements.length; i++) {
    disableElement(adFormElements[i]);
  }

  for (var i = 0; i < mapFiltersElements.length; i++) {
    disableElement(mapFiltersElements[i]);
  }
};

disableForm();

function activeForm() {
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  };

  for (var i = 0; i < mapFiltersElements.length; i++) {
    mapFiltersElements[i].removeAttribute('disabled');
  };
}

var map = showElement('.map');
var adForm = showElement('.ad-form');

var mapPinMain = showElement('.map__pin--main');

mapPinMain.addEventListener('mouseup', function () {
  hideElement('map--faded', map);
  hideElement('ad-form--disabled', adForm);
  activeForm();
  address.value = MAP_PIN_MAIN_COORDINATE;
});

var mapPins = showElement('.map__pins');

var pin = document.getElementById('pin');

var typeHouse = ['palace', 'flat', 'house', 'bungalo'];

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var generateAd = function (index) {
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
};

var generateAds = function (count) {
  var adsData = [];

  for (var i = 0; i < count; i++) {
    adsData.push(generateAd(i));
  }

  return adsData;
};

var renderPoint = function (ad) {
  var mapPin = pin.content.cloneNode(true);
  var pinButton = mapPin.querySelector('.map__pin');
  var pinImg = mapPin.querySelector('img');

  pinButton.style.left = ad.location.x + 'px';
  pinButton.style.top = ad.location.y + 'px';

  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;

  return mapPin;
};

var renderPoints = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPoint(ads[i]));
  }

  mapPinMain.addEventListener('click', function () {
    mapPins.appendChild(fragment);
  });
};

renderPoints(generateAds(AD_COUNT));

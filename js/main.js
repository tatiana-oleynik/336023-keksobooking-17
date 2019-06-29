'use strict';

var AD_COUNT = 8;
var LOCATIONX_X = 0;
var LOCATIONX_Y = 700;
var LOCATIONY_X = 130;
var LOCATIONY_Y = 630;
var TAIL_HEIGHT = 22;
var MAP_PIN_HEIGHT = 84;
var MAP_PIN_WIDTH = 64;
var WINDOW_WIDTH = 1200;
var PRICE = {
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

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

(function () {

  var X_COORDS = {
    min: 0,
    max: 1135
  };

  var Y_COORDS = {
    min: 46,
    max: 546
  };

  var isOnMap = function (coordsNum, coordsObj) {
    if (coordsNum < coordsObj.min) {
      return coordsObj.min;
    }
    if (coordsNum > coordsObj.max) {
      return coordsObj.max;
    }
    return coordsNum;
  };

  var setAddress = function (weight, heigth) {
    var left = mapPinMain.offsetLeft + Math.round(weight / 2);
    var top = mapPinMain.offsetTop + Math.round(heigth);
    console.log(top);
    address.value = left + ', ' + top;
  };

  var mainPinMousedownHandler = function (evt) {
    hideElement('map--faded', map);
    hideElement('ad-form--disabled', adForm);
    activeForm();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = isOnMap(mapPinMain.offsetTop - shift.y, Y_COORDS) + 'px';
      mapPinMain.style.left = isOnMap(mapPinMain.offsetLeft - shift.x, X_COORDS) + 'px';
      setAddress(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);

    };
    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      setAddress(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', mainPinMousedownHandler);
})();

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

type.addEventListener('change', function (evt) {
  if (evt.target.value === 'bungalo') {
    price.setAttribute('placeholder', 0);
  } else if (evt.target.value === 'flat') {
    price.setAttribute('placeholder', PRICE.FLAT);
  } else if (evt.target.value === 'house') {
    price.setAttribute('placeholder', PRICE.HOUSE);
  } else if (evt.target.value === 'palace') {
    price.setAttribute('placeholder', PRICE.PALACE);
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

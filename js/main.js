'use strict';

var AD_COUNT = 8;
var LOCATIONX_X = 0;
var LOCATIONX_Y = 700;
var LOCATIONY_X = 130;
var LOCATIONY_Y = 630;
var TAIL_HEIGHT = 18;
var MAP_PIN_HEIGHT = 65;
var MAP_PIN_WIDTH = 65;
var COOR_Y_MIN = 130;
var COOR_Y_MAX = 630;
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

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    hideElement('map--faded', map);
    hideElement('ad-form--disabled', adForm);
    activeForm();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinTailCoords = Math.ceil(MAP_PIN_HEIGHT / 2) + TAIL_HEIGHT;
      var y = mapPinMain.offsetTop - shift.y;
      var x = mapPinMain.offsetLeft - shift.x;

      if (y < (COOR_Y_MIN - MAP_PIN_HEIGHT / 2 - TAIL_HEIGHT)) {
        y = COOR_Y_MIN - MAP_PIN_HEIGHT / 2 - TAIL_HEIGHT;
        window.elements.mapPinMain.setAttribute('style', 'cursor: none');
      } else if (y > (COOR_Y_MAX + MAP_PIN_HEIGHT) - MAP_PIN_HEIGHT / 2 - TAIL_HEIGHT) {
        y = (COOR_Y_MAX + MAP_PIN_HEIGHT) - MAP_PIN_HEIGHT / 2 - TAIL_HEIGHT;
        window.elements.mapPinMain.setAttribute('style', 'cursor: none');
      }

      if (x < 0) {
        x = 0;
      } else if (x > WINDOW_WIDTH  - MAP_PIN_WIDTH) {
        x = WINDOW_WIDTH  - MAP_PIN_WIDTH;
      }

      mapPinMain.style.top =  y + 'px';
      mapPinMain.style.left = x + 'px';
      address.value = x + ',' + (y + pinTailCoords);
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault)
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      var pinTailCoords = Math.ceil(MAP_PIN_HEIGHT / 2) + TAIL_HEIGHT;
      var y = mapPinMain.offsetTop - shift.y;
      var x = mapPinMain.offsetLeft - shift.x;
      mapPinMain.style.top =  y + 'px';
      mapPinMain.style.left = x + 'px';
      address.value = x + ',' + (y + pinTailCoords);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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

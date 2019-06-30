'use strict';

(function () {
  var AD_COUNT = 8;
  var LOCATIONX_X = 0;
  var LOCATIONX_Y = 700;
  var LOCATIONY_X = 130;
  var LOCATIONY_Y = 630;

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var pin = document.getElementById('pin');

  var typeHouse = ['palace', 'flat', 'house', 'bungalo'];

  //  Создает объявление
  function generateAd(index) {
    var avatarUrl = index > AD_COUNT ? 'img/avatars/user' + (index + 1) + '.png' : 'img/avatars/user0' + (index + 1) + '.png';

    var ad = {
      author: {
        avatar: avatarUrl,
      },

      offer: {
        type: typeHouse[window.util.getRandomInteger(0, typeHouse.length - 1)]
      },

      location: {
        x: window.util.getRandomInteger(LOCATIONX_X, LOCATIONX_Y),
        y: window.util.getRandomInteger(LOCATIONY_X, LOCATIONY_Y)
      }
    };

    return ad;
  }

  //  Создает объявления
  function generateAds(count) {
    var adsData = [];

    for (var i = 0; i < count; i++) {
      adsData.push(generateAd(i));
    }

    return adsData;
  }

  //  Создает метку на карте
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

  //  Создает метки на карте
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
})();

'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  // Создает метку на карте
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

  // Создает метки на карте
  function renderPoints(ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPoint(ads[i]));
    }

    mapPinMain.addEventListener('click', function () {
      mapPins.appendChild(fragment);
    });
  }

  window.renderPoints = renderPoints;
})();

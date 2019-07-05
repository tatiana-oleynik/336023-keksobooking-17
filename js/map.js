'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var pin = document.getElementById('pin');
  var error = document.getElementById('error');
  var main = document.getElementsByTagName('main');

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

    mapPins.appendChild(fragment);
  }

  // Отрисовывает ошибку сервера
  function renderError() {
    var errorConnection = error.content.cloneNode(true);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorConnection);

    for (var i = 0; i < main.length; i++) {
      main[i].appendChild(fragment);
    }
  }

  window.renderPoints = renderPoints;
  window.renderError = renderError;
})();

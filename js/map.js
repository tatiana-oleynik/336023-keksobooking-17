'use strict';

(function () {
  var PINS_LIMIT = 5;

  var mapPins = document.querySelector('.map__pins');
  var pin = document.getElementById('pin');
  var error = document.getElementById('error');
  var main = document.getElementsByTagName('main');
  var mapPinMain = document.querySelector('.map__pin--main');
  var template = document.querySelector('template');
  var mapCard = template.content.querySelector('.map__card');
  var popupPhoto = template.content.querySelector('.popup__photo');

  var AccomodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

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

  // Удаляет пины
  function removePins() {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinsItems.length; i++) {
      mapPinsItems[i].remove();
    }
  }

  // Отрисовывает удобства(features) в объявлении
  function renderFragmentFeature(data) {
    var fragment = document.createDocumentFragment();
    data.offer.features.forEach(function (it) {
      var itemFeature = document.createElement('li');
      itemFeature.className = 'popup__feature popup__feature--' + it;
      fragment.appendChild(itemFeature);
    });
    return fragment;
  }

  // Отрисовывает фотографии жилья
  function renderFragmentPhotos(data) {
    var fragment = document.createDocumentFragment();
    data.offer.photos.forEach(function (it) {
      var itemPhoto = popupPhoto.cloneNode(true);
      itemPhoto.src = it;
      fragment.appendChild(itemPhoto);
    });
    return fragment;
  }

  // Создает карточку объявления
  function renderAd(data) {
    var ad = mapCard.cloneNode(true);
    ad.querySelector('.popup__title').textContent = data.offer.title;
    ad.querySelector('.popup__text--address').textContent = data.offer.address;
    ad.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    ad.querySelector('.popup__type').textContent = AccomodationType[data.offer.type];
    ad.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(renderFragmentFeature(data));
    ad.querySelector('.popup__description').textContent = data.offer.description;
    ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__photos').appendChild(renderFragmentPhotos(data));
    ad.querySelector('.map__card img').src = data.author.avatar;
    ad.querySelector('.popup__close').textContent = data.offer.popup;

    mapPins.appendChild(ad);

    var popupClose = document.querySelectorAll('.popup__close');

    for (var i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener('click', removeAd);
      popupClose[i].addEventListener('keydown', onAdEscDown);
    }

    return mapCard;
  }

  function activateMap(data) {
    window.data = data;
    renderPoints(data.slice(0, PINS_LIMIT));
    showCard();
  }

  function showCard() {
    var mapPinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPinItems.length; i++) {
      var button = mapPinItems[i];
      button.addEventListener('click', clickPoint);
    }
  }

  mapPinMain.addEventListener('click', function () {
    window.load(activateMap, renderError);
  });

  function clickPoint(event) {
    var ad = 0;
    for (var i = 0; i < window.data.length; i++) {
      if (window.data[i].offer.title === event.target.alt) {
        ad = window.data[i];
      }
    }
    removePopup();
    renderAd(ad);
    event.preventDefault();
  }

  function removePopup() {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  }

  function removeAd(evt) {
    evt.target.parentNode.remove();
  }

  var onAdEscDown = function (evt) {
    window.util.onEscDown(evt, removePopup);
  };

  window.map = {
    renderPoints: renderPoints,
    removePins: removePins,
    removePopup: removePopup,
    showCard: showCard
  };
})();

'use strict';
//  Функция расчета координат главной метки
(function () {
  var MAP_PIN_HEIGHT = 84;
  var MAP_PIN_WIDTH = 64;
  var PINS_LIMIT = 5;
  var Coords = {
    X: {
      MIN: 0,
      MAX: 1135
    },
    Y: {
      MIN: 46,
      MAX: 546
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = document.getElementById('address');
  var error = document.getElementById('error');
  var main = document.getElementsByTagName('main');

  function isOnMap(coordsNum, coordsObj) {
    if (coordsNum < coordsObj.MIN) {
      return coordsObj.MIN;
    }
    if (coordsNum > coordsObj.MAX) {
      return coordsObj.MAX;
    }
    return coordsNum;
  };

  function activateMap(data) {
    window.data = data;
    window.map.renderPoints(data.slice(0, PINS_LIMIT));
    window.map.addPinListeners();
  }

  function renderError() {
    var errorConnection = error.content.cloneNode(true);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorConnection);

    for (var i = 0; i < main.length; i++) {
      main[i].appendChild(fragment);
    }
  }

  function setAddress(weight, heigth) {
    var left = mapPinMain.offsetLeft + Math.round(weight / 2);
    var top = mapPinMain.offsetTop + Math.round(heigth);
    address.value = left + ', ' + top;
  };

  function mainPinMousedownHandler(evt) {
    window.load(activateMap, renderError);
    // mapPinMain.removeEventListener('mousedown', mainPinMousedownHandler);
    if (!window.data) {
      window.load();
    };

    // window.data = null;

    window.util.hideElement('map--faded', map);
    window.util.hideElement('ad-form--disabled', adForm);
    window.activateForm();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = isOnMap(mapPinMain.offsetTop - shift.y, Coords.Y) + 'px';
      mapPinMain.style.left = isOnMap(mapPinMain.offsetLeft - shift.x, Coords.X) + 'px';
      setAddress(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);
    };
    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      setAddress(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', mainPinMousedownHandler);
})();

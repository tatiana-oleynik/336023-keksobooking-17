'use strict';

(function () {
  var LOCATIONX_X = 0;
  var LOCATIONX_Y = 700;
  var LOCATIONY_X = 130;
  var LOCATIONY_Y = 630;
  var MAP_PIN_HEIGHT = 84;
  var MAP_PIN_WIDTH = 64;

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var address = document.getElementById('address');
  //  Функция расчета координат главной метки
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
      address.value = left + ', ' + top;
    };

    var mainPinMousedownHandler = function (evt) {
      window.util.hideElement('map--faded', map);
      window.util.hideElement('ad-form--disabled', adForm);
      window.activeForm();

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
})();

// 'use strict';

// var AD_COUNT = 8;
// var LOCATIONX_X = 0;
// var LOCATIONX_Y = 700;
// var LOCATIONY_X = 130;
// var LOCATIONY_Y = 630;
// var MAP_PIN_HEIGHT = 84;
// var MAP_PIN_WIDTH = 64;
// var PRICE = {
//   FLAT: 1000,
//   HOUSE: 5000,
//   PALACE: 10000
// };

// var adForm = document.querySelector('.ad-form');
// var adFormElements = adForm.children;
// var mapFilters = document.querySelector('.map__filters');
// var mapFiltersElements = mapFilters.children;
// var map = document.querySelector('.map');
// var mapPinMain = document.querySelector('.map__pin--main');
// var mapPins = document.querySelector('.map__pins');
// var pin = document.getElementById('pin');
// var address = document.getElementById('address');
// var title = document.getElementById('title');
// var price = document.getElementById('price');
// var type = document.getElementById('type');
// var timein = document.getElementById('timein');
// var timeout = document.getElementById('timeout');

// var typeHouse = ['palace', 'flat', 'house', 'bungalo'];


//  Функция активации формы
// function activeForm() {
//   for (var i = 0; i < adFormElements.length; i++) {
//     adFormElements[i].removeAttribute('disabled');
//   }
//
//   for (i = 0; i < mapFiltersElements.length; i++) {
//     mapFiltersElements[i].removeAttribute('disabled');
//   }
// }

// //  Функция деактивации формы
// function disableForm() {
//   for (var i = 0; i < adFormElements.length; i++) {
//     window.util.disableElement(adFormElements[i]);
//   }
//
//   for (i = 0; i < mapFiltersElements.length; i++) {
//     window.util.disableElement(mapFiltersElements[i]);
//   }
// }
//
// disableForm();

// //  Функция расчета координат главной метки
// (function () {
//
//   var X_COORDS = {
//     min: 0,
//     max: 1135
//   };
//
//   var Y_COORDS = {
//     min: 46,
//     max: 546
//   };
//
//   var isOnMap = function (coordsNum, coordsObj) {
//     if (coordsNum < coordsObj.min) {
//       return coordsObj.min;
//     }
//     if (coordsNum > coordsObj.max) {
//       return coordsObj.max;
//     }
//     return coordsNum;
//   };
//
//   var setAddress = function (weight, heigth) {
//     var left = mapPinMain.offsetLeft + Math.round(weight / 2);
//     var top = mapPinMain.offsetTop + Math.round(heigth);
//     address.value = left + ', ' + top;
//   };
//
//   var mainPinMousedownHandler = function (evt) {
//     window.util.hideElement('map--faded', map);
//     window.util.hideElement('ad-form--disabled', adForm);
//     activeForm();
//
//     var startCoords = {
//       x: evt.clientX,
//       y: evt.clientY
//     };
//
//     var mouseMoveHandler = function (moveEvt) {
//       moveEvt.preventDefault();
//
//       var shift = {
//         x: startCoords.x - moveEvt.clientX,
//         y: startCoords.y - moveEvt.clientY
//       };
//
//       startCoords = {
//         x: moveEvt.clientX,
//         y: moveEvt.clientY
//       };
//
//       mapPinMain.style.top = isOnMap(mapPinMain.offsetTop - shift.y, Y_COORDS) + 'px';
//       mapPinMain.style.left = isOnMap(mapPinMain.offsetLeft - shift.x, X_COORDS) + 'px';
//       setAddress(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);
//
//     };
//     var mouseUpHandler = function () {
//       document.removeEventListener('mousemove', mouseMoveHandler);
//       document.removeEventListener('mouseup', mouseUpHandler);
//       setAddress(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);
//     };
//
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
//   };
//
//   mapPinMain.addEventListener('mousedown', mainPinMousedownHandler);
// })();

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.children;

  //  Функция активации формы
  function activeForm() {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }

    for (i = 0; i < mapFiltersElements.length; i++) {
      mapFiltersElements[i].removeAttribute('disabled');
    }
  }

  //  Функция деактивации формы
  function disableForm() {
    for (var i = 0; i < adFormElements.length; i++) {
      window.util.disableElement(adFormElements[i]);
    }

    for (i = 0; i < mapFiltersElements.length; i++) {
      window.util.disableElement(mapFiltersElements[i]);
    }
  }

  disableForm();

  window.activeForm = activeForm;
})();

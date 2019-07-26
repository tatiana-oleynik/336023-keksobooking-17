'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.children;
  var success = document.getElementById('success');

  //  Функция активации формы
  function activateForm() {
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

  function showSuccess() {
    var successMessage = success.content.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);

    for (var i = 0; i < window.constants.MAIN.length; i++) {
      window.constants.MAIN[i].appendChild(fragment);
    }

    document.addEventListener('keydown', closeSuccessEscDown);
    document.addEventListener('click', closeSuccess);
  }

  function closeSuccess() {
    var successMessage = document.querySelector('.success');
    console.log(successMessage);
    if (successMessage) {
      successMessage.remove();
    }
    // successMessage.remove();
  }

  function closeSuccessEscDown(evt) {
    window.util.onEscDown(evt, closeSuccess);
  }

  function onSubmitSuccess() {
    showSuccess();
    disableForm();
    window.map.deactivateMap();
  }

  function onAdFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.save(onSubmitSuccess, window.map.renderError, formData);
  }

  function setDefaultValues() {
    window.constants.PRICE.setAttribute('min', 1000);
    window.constants.PRICE.setAttribute('placeholder', 1000);

    window.constants.CAPACITY.value = 1;
  }

  function init() {
    adForm.addEventListener('submit', onAdFormSubmit);
    disableForm();
    setDefaultValues();
  }

  init();

  window.activateForm = activateForm;
})();

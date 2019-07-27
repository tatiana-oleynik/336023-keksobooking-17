'use strict';

(function () {
  var Price = {
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var title = document.getElementById('title');
  var timein = document.getElementById('timein');
  var type = document.getElementById('type');
  var timeout = document.getElementById('timeout');
  var roomNumber = document.getElementById('room_number');

  //  Валидация полей формы
  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  });

  window.constants.PRICE.addEventListener('invalid', function () {
    if (window.constants.PRICE.validity.valueMissing) {
      window.constants.PRICE.setCustomValidity('Обязательное поле');
    } else {
      window.constants.PRICE.setCustomValidity('');
    }
  });

  type.addEventListener('change', function (evt) {
    if (evt.target.value === 'bungalo') {
      window.constants.PRICE.setAttribute('placeholder', 0);
      window.constants.PRICE.setAttribute('min', 0);
    } else if (evt.target.value === 'flat') {
      window.constants.PRICE.setAttribute('placeholder', Price.FLAT);
      window.constants.PRICE.setAttribute('min', Price.FLAT);
    } else if (evt.target.value === 'house') {
      window.constants.PRICE.setAttribute('placeholder', Price.HOUSE);
      window.constants.PRICE.setAttribute('min', Price.HOUSE);
    } else if (evt.target.value === 'palace') {
      window.constants.PRICE.setAttribute('placeholder', Price.PALACE);
      window.constants.PRICE.setAttribute('min', Price.PALACE);
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

  roomNumber.addEventListener('change', function (evt) {
    if (evt.target.value === '1') {
      window.constants.CAPACITY.options[0].disabled = true;
      window.constants.CAPACITY.options[1].disabled = true;
      window.constants.CAPACITY.options[2].disabled = false;
      window.constants.CAPACITY.options[3].disabled = true;
    } else if (evt.target.value === '2') {
      window.constants.CAPACITY.options[0].disabled = true;
      window.constants.CAPACITY.options[1].disabled = false;
      window.constants.CAPACITY.options[2].disabled = false;
      window.constants.CAPACITY.options[3].disabled = true;
    } else if (evt.target.value === '3') {
      window.constants.CAPACITY.options[0].disabled = false;
      window.constants.CAPACITY.options[1].disabled = false;
      window.constants.CAPACITY.options[2].disabled = false;
      window.constants.CAPACITY.options[3].disabled = true;
    } else if (evt.target.value === '100') {
      window.constants.CAPACITY.options[0].disabled = true;
      window.constants.CAPACITY.options[1].disabled = true;
      window.constants.CAPACITY.options[2].disabled = true;
      window.constants.CAPACITY.options[3].disabled = false;
    }
  });
})();

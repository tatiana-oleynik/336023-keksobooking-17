'use strict';

(function () {
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var timein = document.getElementById('timein');
  var type = document.getElementById('type');
  var timeout = document.getElementById('timeout');
  var PRICE = {
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

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

  price.addEventListener('invalid', function () {
    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

  type.addEventListener('change', function (evt) {
    if (evt.target.value === 'bungalo') {
      price.setAttribute('placeholder', 0);
    } else if (evt.target.value === 'flat') {
      price.setAttribute('placeholder', PRICE.FLAT);
    } else if (evt.target.value === 'house') {
      price.setAttribute('placeholder', PRICE.HOUSE);
    } else if (evt.target.value === 'palace') {
      price.setAttribute('placeholder', PRICE.PALACE);
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

})();

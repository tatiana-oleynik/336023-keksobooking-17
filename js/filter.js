'use strict';

(function () {
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.slice(0, 5).filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.type === 'palace' || 'flat' || 'house' || 'bungalo';
      } else if (elementValue === 'palace') {
        return it.offer.type === 'palace';
      } else if (elementValue === 'flat') {
        return it.offer.type === 'flat';
      } else if (elementValue === 'house') {
        return it.offer.type === 'house';
      } else if (elementValue === 'bungalo') {
        return it.offer.type === 'bungalo';
      }
    });

    window.map.renderPoints(filterData);
    window.map.addPinListeners(filterData);
  });

  // Фильтр 'Стоимость жилья'
  housingPrice.addEventListener('change', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.slice(0, 5).filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.price > 0;
      } else if (elementValue === 'middle') {
        return it.offer.price > 10000 && it.offer.price < 50000;
      } else if (elementValue === 'low') {
        return it.offer.price < 10000;
      } else if (elementValue === 'high') {
        return it.offer.price >= 50000;
      }
    });

    window.map.renderPoints(filterData);
    window.map.addPinListeners(filterData);
  });

  // Фильтр 'Количество комнат'
  housingRooms.addEventListener('change', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.slice(0, 5).filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.rooms > 0;
      } else if (elementValue === '1') {
        return it.offer.rooms === 1;
      } else if (elementValue === '2') {
        return it.offer.rooms === 2;
      } else if (elementValue === '3') {
        return it.offer.rooms === 3;
      }
    });

    window.map.renderPoints(filterData);
    window.map.addPinListeners(filterData);
  });

  // Фильтр 'Количество гостей'
  housingGuests.addEventListener('change', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.slice(0, 5).filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.guests > 0;
      } else if (elementValue === '2') {
        return it.offer.guests === 2;
      } else if (elementValue === '1') {
        return it.offer.guests === 1;
      } else if (elementValue === '0') {
        return it.offer.guests === 0;
      }
    });

    window.map.renderPoints(filterData);
    window.map.addPinListeners(filterData);
  });

  // Фильтр 'Удобства'
  housingFeatures.addEventListener('click', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.slice(0, 5).filter(function (it) {
      if (elementValue === 'wifi') {
        return it.offer.features.includes('wifi');
      } else if (elementValue === 'dishwasher') {
        return it.offer.features.includes('dishwasher');
      } else if (elementValue === 'parking') {
        return it.offer.features.includes('parking');
      } else if (elementValue === 'washer') {
        return it.offer.features.includes('washer');
      } else if (elementValue === 'elevator') {
        return it.offer.features.includes('elevator');
      } else if (elementValue === 'conditioner') {
        return it.offer.features.includes('conditioner');
      }
    });

    function getCheckedCheckboxes() {
      // var mapCheckbox = document.querySelector('.map__checkbox');
      // var checkboxes = document.querySelectorAll('mapCheckbox:checked');
      var checkboxes = document.querySelector('.map__checkbox');
      var checkboxesChecked = [];

      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
        }
      }

      filterData = window.data.filter(function (it) {
        return it.offer.features.some(function (filter) {
          return checkboxesChecked.includes(filter);
        });
      });
    }

    window.map.renderPoints(filterData);
    window.map.addPinListeners(filterData);
  });
})();

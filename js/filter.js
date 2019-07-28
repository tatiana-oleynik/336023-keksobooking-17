'use strict';

(function () {
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function (event) {
    window.pin.removePins();
    window.pin.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
      return it.offer.type === elementValue;
    });

    window.pin.renderPoints(filterData);
    window.pin.addPinListeners(filterData);
  });

  // Фильтр 'Стоимость жилья'
  housingPrice.addEventListener('change', function (event) {
      window.pin.removePins();
      window.pin.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.price > 0;
        window.pin.renderPoints(data.slice(0, 5));
      } else if (elementValue === 'middle') {
        return it.offer.price > 10000 && it.offer.price < 50000;
      } else if (elementValue === 'low') {
        return it.offer.price < 10000;
      } else if (elementValue === 'high') {
        return it.offer.price >= 50000;
      };
    });

    window.pin.renderPoints(filterData);
    window.pin.addPinListeners(filterData);
  });

  // Фильтр 'Количество комнат'
  housingRooms.addEventListener('change', function (event) {
      window.pin.removePins();
      window.pin.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.rooms > 0;
        window.pin.renderPoints(data.slice(0, 5));
      } else if (elementValue === '1') {
        return it.offer.rooms === 1;
      } else if (elementValue === '2') {
        return it.offer.rooms === 2;
      } else if (elementValue === '3') {
        return it.offer.rooms === 3;
      };
    });

    window.pin.renderPoints(filterData);
    window.pin.addPinListeners(filterData);
  });

  // Фильтр 'Количество гостей'
  housingGuests.addEventListener('change', function (event) {
    window.pin.removePins();
    window.pin.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
      if (elementValue === 'any') {
        return it.offer.guests > 0;
        window.pin.renderPoints(data.slice(0, 5));
      } else if (elementValue === '2') {
        return it.offer.guests === 2;
      } else if (elementValue === '1') {
        return it.offer.guests === 1;
      } else if (elementValue === '0') {
        return it.offer.guests === 0;
      };
    });

    window.pin.renderPoints(filterData);
    window.pin.addPinListeners(filterData);
  });
  console.log(housingFeatures);
  // Фильтр 'Удобства'
  housingFeatures.addEventListener('click', function (event) {
    window.pin.removePins();
    window.pin.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
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
      };
    });

    window.pin.renderPoints(filterData);
    window.pin.addPinListeners(filterData);
  });
})();

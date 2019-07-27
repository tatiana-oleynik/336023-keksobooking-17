'use strict';

(function () {
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');

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
  console.log(housingType);
  console.log(housingPrice);
  // Фильтр 'Стоимость жилья'
  housingPrice.addEventListener('change', function (event) {
    console.log(housingPrice);
    window.pin.removePins();
    window.pin.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
      return it.offer.type === elementValue;
    });

    window.pin.renderPoints(filterData);
    window.pin.addPinListeners(filterData);
  });
})();

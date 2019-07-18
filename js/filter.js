'use strict';

(function () {
  var housingType = document.getElementById('housing-type');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;
    var filterData = window.data.filter(function (it) {
      return it.offer.type === elementValue;
    });

    window.map.renderPoints(filterData);
    window.map.addPinListeners(filterData);
  });
})();

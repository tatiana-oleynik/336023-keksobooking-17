'use strict';

(function () {
  var housingType = document.getElementById('housing-type');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function (event) {
    window.map.removePins();
    window.map.removePopup();

    var elementValue = event.target.value;

    window.map.renderPoints(window.data.filter(function (it) {
      return it.offer.type === elementValue;
    }));

    window.map.showCard(window.data.filter(function (it) {
      return it.offer.type === elementValue;
    }));
  });
})();

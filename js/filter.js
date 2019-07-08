'use strict';

(function () {
  var housingType = document.getElementById('housing-type');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function (event) {
    window.removePins();

    var elementValue = event.target.value;
    window.renderPoints(window.data.filter(function (it) {
      return it.offer.type === elementValue;
    }));
  });
})();

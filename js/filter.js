'use strict';

(function () {
  var housingType = document.getElementById('housing-type');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function () {
    window.removePins();

    var elementValue = this.value;
    window.renderPoints (window.data.filter(function(it) {
      return it.offer.type === elementValue;
    }));
  });
})();

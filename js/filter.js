'use strict';

(function () {
  var housingType = document.getElementById('housing-type');

  // Фильтр 'Тип жилья'
  housingType.addEventListener('change', function (evt) {
    window.removePins();

    var value = this.value;
    window.renderPoints(window.data.filter(function(it) {
      return it.offer.type === value;
    }));
  })
})();

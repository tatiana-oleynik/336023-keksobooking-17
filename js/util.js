'use strict';

(function () {
  window.util = {
    hideElement: function (className, element) {
      element.classList.remove(className);
    },
    disableElement: function (elementName) {
      elementName.setAttribute('disabled', 'disabled');
    },
    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  };
})();

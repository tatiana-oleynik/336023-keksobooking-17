'use strict';

(function () {
  var ESC_KEYCODE = 27;
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
    },
    onEscDown: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };
})();

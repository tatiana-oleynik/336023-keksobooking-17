'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(message);
      }
    });

    xhr.send();
  };

  var onError = function (message) {
    var errorMessage = querySelector('.error__message');
    errorMessage.text = 'Ошибка загрузки объявления';
  };

  window.load(window.renderPoints, onError);
})();

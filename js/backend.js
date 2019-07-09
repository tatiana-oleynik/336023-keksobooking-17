'use strict';

(function () {
  var SUCCESS = 200;
  var PINS_LIMIT = 5;
  var ERROR_SERVER = 'Произошла ошибка соединения. Пожалуйста, обновите страницу.';
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        window.data = xhr.response;
        onSuccess(xhr.response.slice(PINS_LIMIT));
      } else {
        onError(ERROR_SERVER);
      }
    });
    xhr.send();

    window.onSuccess = onSuccess;
  };
})();

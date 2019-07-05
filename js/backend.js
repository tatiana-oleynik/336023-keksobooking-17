'use strict';

(function () {
  var SUCCESS = 200;
  var ERROR_SERVER = 'Произошла ошибка соединения. Пожалуйста, обновите страницу.';
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(ERROR_SERVER);
      }
    });

    xhr.send();
  };

  window.load(window.renderPoints, window.renderError);
})();

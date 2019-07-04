'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    var ERROR_SERVER = 'Произошла ошибка соединения. Пожалуйста, обновите страницу.';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('ERROR_SERVER');
      }
    });

    xhr.send();
  };

  window.load(window.renderPoints);
})();

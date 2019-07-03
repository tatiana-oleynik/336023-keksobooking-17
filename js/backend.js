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
        onError('Произошла ошибка соединения');
      }
    });

    finction onError() {
      var error = document.getElementById('error');
      var main = document.getElementsByTagName('main');
      var fragment = document.createDocumentFragment();

      error.addEventListener('error', function () {
        main.appendChild(fragment);
      });
    }

    xhr.send();
  };

  window.load(window.renderPoints);
})();

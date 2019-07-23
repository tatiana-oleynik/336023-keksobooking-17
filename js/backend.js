'use strict';

(function () {
  var SUCCESS = 200;
  var ERROR_SERVER = 'Произошла ошибка соединения. Пожалуйста, обновите страницу.';
  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  function createXhr(method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(ERROR_SERVER);
      }
    });

    xhr.open(method, url);
    return xhr;
  };

  function load(onSuccess, onError) {
    createXhr('GET', ServerUrl.LOAD, onSuccess, onError).send();
  };

  function save(onSuccess, onError, data) {
    createXhr('POST', ServerUrl.UPLOAD, onSuccess, onError).send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

  // window.load = function (onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';
  //
  //   xhr.open('GET', ServerUrl.LOAD);
  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === SUCCESS) {
  //       onSuccess(xhr.response);
  //     } else {
  //       onError(ERROR_SERVER);
  //     }
  //   });
  //   xhr.send();
  //
  //   window.onSuccess = onSuccess;
  // };

  // var adFormSubmit = document.querySelector('.ad-form__submit');
  // adFormSubmit.addEventListener('submit', function () {
  //   event.preventDefault();
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';
  //
  //   xhr.open('POST', ServerUrl.UPLOAD);
  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === SUCCESS) {
  //       onSuccess(xhr.response);
  //     } else {
  //       onError(ERROR_SERVER);
  //     }
  //   });
  //   xhr.send();
  // })
})();

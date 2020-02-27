'use strict';

window.backend = (function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var eventConnection = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    eventConnection(xhr, onLoad, onError);

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    eventConnection(xhr, onLoad, onError);

    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  return {
    load: load,
    save: save
  };
})();

'use strict';

window.utils = (function () {
  var MOUSE_LEFT_BUTTON = 0;
  var ENTER_KEY = 'Enter';

  var getPictureNumber = function (offer) {
    return offer.toString().padStart(2, '0');
  };

  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomItems = function (arr) {
    var randomElement = 0;
    var randomArr = [];
    var tempArr = arr.slice();
    var arrLenght = getRandomBetween(1, tempArr.length);

    for (var i = 0; i < arrLenght; i++) {
      randomElement = getRandomIndex(tempArr);
      randomArr.push(tempArr.splice(randomElement, 1));
    }

    return randomArr;
  };

  var isMouseLeftEvent = function (evt, action) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  return {
    getPictureNumber: getPictureNumber,
    getRandomBetween: getRandomBetween,
    getRandomIndex: getRandomIndex,
    getRandomItem: getRandomItem,
    getRandomItems: getRandomItems,
    isMouseLeftEvent: isMouseLeftEvent,
    isEnterEvent: isEnterEvent
  }
})();

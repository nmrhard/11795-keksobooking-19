'use strict';

window.util = (function () {
  var MOUSE_LEFT_BUTTON = 0;
  var ENTER_KEY = 'Enter';

  var getPictureNumber = function (offer) {
    return offer.toString().padStart(2, '0');
  };

  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
      randomElement = getRandomItem(tempArr);
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

  var errorHandler = function (errorMessage) {
    document.body.style = 'position: relative';
    var node = document.createElement('div');
    var spanElement = document.createElement('span');
    node.style = 'z-index: 100; display: flex; padding-top: 280px; color: #ffffff; background-color: rgba(0,0,0,0.5);';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.top = 0;
    node.style.width = '100%';
    node.style.height = '100%';
    node.style.fontSize = '50px';

    spanElement.style = 'margin: 0 auto; color: #00000';
    spanElement.textContent = errorMessage;
    node.appendChild(spanElement);
    document.body.insertAdjacentElement('afterbegin', node);
  };

  return {
    getPictureNumber: getPictureNumber,
    getRandomBetween: getRandomBetween,
    getRandomItem: getRandomItem,
    getRandomItems: getRandomItems,
    isMouseLeftEvent: isMouseLeftEvent,
    isEnterEvent: isEnterEvent,
    errorHandler: errorHandler
  };
})();

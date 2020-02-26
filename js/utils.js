'use strict';

window.util = (function () {
  var MOUSE_LEFT_BUTTON = 0;
  var CASES = [2, 0, 1, 1, 1, 2];
  var Key = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };

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
    var arrLenght = getRandomBetween(1, arr.length);
    var randomArr = arr.filter(function (item, index) {
      if (arrLenght > index) {
        return true;
      }
      return false;
    });

    return randomArr;
  };

  var isMouseLeftEvent = function (evt, action) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === Key.ESC) {
      action();
    }
  };

  var pluralize = function (count, words) {
    return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : CASES[Math.min(count % 10, 5)]];
  };

  var onError = function (errorMessage) {
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

  var setChildrenStatuses = function (element, status) {
    if (element.childElementCount) {
      for (var i = 0; i < element.children.length; i++) {
        element.children[i].disabled = status;
      }
    }
  };

  return {
    getPictureNumber: getPictureNumber,
    getRandomBetween: getRandomBetween,
    getRandomItem: getRandomItem,
    getRandomItems: getRandomItems,
    isMouseLeftEvent: isMouseLeftEvent,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    onError: onError,
    setChildrenStatuses: setChildrenStatuses,
    pluralize: pluralize,
    Key: Key
  };
})();

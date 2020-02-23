'use strict';

(function () {
  var checkGuestForRooms = function (currentElement, secondElement) {
    var guests = parseInt(window.Node.GUESTS_COUNT.value, 10);
    var rooms = parseInt(window.Node.ROOMS_COUNT.value, 10);

    if (rooms === 100 && guests !== 0) {
      currentElement.setCustomValidity(rooms + ' комнат не для гостей');
    } else if (rooms === 3 && guests === 0) {
      currentElement.setCustomValidity(rooms + ' комнаты для 3 гостей, для 2 гостей или для 1 гостя');
    } else if (rooms === 2 && (guests === 0 || guests === 3)) {
      currentElement.setCustomValidity(rooms + ' комнаты для 2 гостей или для 1 гостя');
    } else if (rooms === 1 && guests !== 1) {
      currentElement.setCustomValidity(rooms + ' комната толкьо для 1 гостя');
    } else {
      currentElement.setCustomValidity('');
      secondElement.setCustomValidity('');
    }
  };

  var onRoomsCountChange = function (evt) {
    checkGuestForRooms(evt.target, window.Node.GUESTS_COUNT);
  };

  var onGuestsCountChange = function (evt) {
    checkGuestForRooms(evt.target, window.Node.ROOMS_COUNT);
  };

  window.Node.ROOMS_COUNT.addEventListener('change', onRoomsCountChange);
  window.Node.GUESTS_COUNT.addEventListener('change', onGuestsCountChange);
})();

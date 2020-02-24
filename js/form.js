'use strict';

(function () {
  var MIN_PRICE_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var TYPE_APARTMENT_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

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

  var setMinPriceOfRoom = function (currentElement) {
    var minPrice = MIN_PRICE_MAP[currentElement.value];
    window.Node.ROOM_PRICE.min = minPrice;
    window.Node.ROOM_PRICE.placeholder = minPrice;
  };

  var checkMinPriceOfRoom = function (currentElement, secondElement) {
    var price = window.Node.ROOM_PRICE.value;
    var roomType = window.Node.ROOM_TYPE.value;
    if (price < MIN_PRICE_MAP[roomType]) {
      currentElement.setCustomValidity('Минимальная цена за ' + TYPE_APARTMENT_MAP[roomType] + ' - ' + MIN_PRICE_MAP[roomType] + 'руб.');
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

  var onRoomTypeChange = function (evt) {
    setMinPriceOfRoom(evt.target);
    checkMinPriceOfRoom(evt.target, window.Node.ROOM_PRICE);
  };

  var onRoomPriceChange = function (evt) {
    checkMinPriceOfRoom(evt.target, window.Node.ROOM_TYPE);
  };

  window.Node.ROOMS_COUNT.addEventListener('change', onRoomsCountChange);
  window.Node.GUESTS_COUNT.addEventListener('change', onGuestsCountChange);

  window.Node.ROOM_TYPE.addEventListener('change', onRoomTypeChange);
  window.Node.ROOM_PRICE.addEventListener('change', onRoomPriceChange);
})();

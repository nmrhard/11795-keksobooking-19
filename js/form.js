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
      currentElement.setCustomValidity('Минимальная цена за тип жилья ' + TYPE_APARTMENT_MAP[roomType] + ' - ' + MIN_PRICE_MAP[roomType] + ' руб.');
    } else {
      currentElement.setCustomValidity('');
      secondElement.setCustomValidity('');
    }
  };

  var showMessageSuccess = function () {
    var successElement = window.Node.SUCCESS_MODAL.cloneNode(true);
    successElement.id = 'modal';
    window.Node.MAIN.appendChild(successElement);

    document.addEventListener('keydown', onMessageCloseKeyDown);
    document.addEventListener('click', onMessageCloseClick);
  };

  var showMessageError = function () {
    var errorElement = window.Node.ERROR_MODAL.cloneNode(true);
    errorElement.id = 'modal';
    window.Node.MAIN.appendChild(errorElement);

    errorElement.querySelector('.error__button').addEventListener('click', onMessageErrorClick);
    document.addEventListener('keydown', onMessageCloseKeyDown);
    document.addEventListener('click', onMessageCloseClick);
  };

  var onSuccessSave = function () {
    window.start.disableEelemnts();
    showMessageSuccess();
  };

  var onMessageCloseKeyDown = function (evt) {
    window.util.isEscEvent(evt, closeMessage);
  };

  var onMessageCloseClick = function (evt) {
    window.util.isMouseLeftEvent(evt, closeMessage);
  };

  var onMessageErrorClick = function () {
    closeMessage();
  };

  var closeMessage = function () {
    document.querySelector('#modal').remove();
    document.removeEventListener('keydown', onMessageCloseKeyDown);
    document.removeEventListener('click', onMessageCloseClick);
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(window.Node.OFFER_FORM), onSuccessSave, showMessageError);
    evt.preventDefault();
  };

  var setTime = function (currentElement, secondElement) {
    secondElement.value = currentElement.value;
  };

  var clearForm = function () {
    window.start.disableEelemnts();
    var address = window.Node.ADDRESS_INPUT.value;
    window.Node.ADDRESS_INPUT.setAttribute('value', address);
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

  var onTimeInChange = function (evt) {
    setTime(evt.target, window.Node.TIME_OUT);
  };

  var onTimeOutChange = function (evt) {
    setTime(evt.target, window.Node.TIME_IN);
  };

  var onResetButtonClick = function (evt) {
    window.util.isMouseLeftEvent(evt, clearForm);
  };

  var onResetButtonEnter = function (evt) {
    window.util.isEnterEvent(evt, clearForm);
  };

  (function () {
    window.Node.ROOMS_COUNT.addEventListener('change', onRoomsCountChange);
    window.Node.GUESTS_COUNT.addEventListener('change', onGuestsCountChange);

    window.Node.ROOM_TYPE.addEventListener('change', onRoomTypeChange);
    window.Node.ROOM_PRICE.addEventListener('change', onRoomPriceChange);

    window.Node.TIME_IN.addEventListener('change', onTimeInChange);
    window.Node.TIME_OUT.addEventListener('change', onTimeOutChange);

    window.Node.OFFER_FORM.addEventListener('submit', onFormSubmit);
    window.Node.RESET_FORM.addEventListener('click', onResetButtonClick);
    window.Node.RESET_FORM.addEventListener('keydown', onResetButtonEnter);
  })();
})();

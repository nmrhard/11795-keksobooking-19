'use strict';

(function () {
  var ROOMS_COUNT = document.querySelector('#room_number');
  var GUESTS_COUNT = document.querySelector('#capacity');
  var ROOM_TYPE = document.querySelector('#type');
  var ROOM_PRICE = document.querySelector('#price');
  var TIME_IN = document.querySelector('#timein');
  var TIME_OUT = document.querySelector('#timeout');
  var RESET_FORM = document.querySelector('.ad-form__reset');
  var SUCCESS_MODAL = document.querySelector('#success').content.querySelector('.success');
  var ERROR_MODAL = document.querySelector('#error').content.querySelector('.error');
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
    var guests = parseInt(GUESTS_COUNT.value, 10);
    var rooms = parseInt(ROOMS_COUNT.value, 10);

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
    ROOM_PRICE.min = minPrice;
    ROOM_PRICE.placeholder = minPrice;
  };

  var checkMinPriceOfRoom = function (currentElement, secondElement) {
    var price = ROOM_PRICE.value;
    var roomType = ROOM_TYPE.value;
    if (price < MIN_PRICE_MAP[roomType]) {
      currentElement.setCustomValidity('Минимальная цена за тип жилья ' + TYPE_APARTMENT_MAP[roomType] + ' - ' + MIN_PRICE_MAP[roomType] + ' руб.');
    } else {
      currentElement.setCustomValidity('');
      secondElement.setCustomValidity('');
    }
  };

  var showMessageSuccess = function () {
    var successElement = SUCCESS_MODAL.cloneNode(true);
    successElement.id = 'modal';
    window.Node.MAIN.appendChild(successElement);

    document.addEventListener('keydown', onMessageCloseKeyDown);
    document.addEventListener('click', onMessageCloseClick);
  };

  var showMessageError = function () {
    var errorElement = ERROR_MODAL.cloneNode(true);
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
    window.Node.ADDRESS_INPUT.value = address;
  };

  var onRoomsCountChange = function (evt) {
    checkGuestForRooms(evt.target, GUESTS_COUNT);
  };

  var onGuestsCountChange = function (evt) {
    checkGuestForRooms(evt.target, ROOMS_COUNT);
  };

  var onRoomTypeChange = function (evt) {
    setMinPriceOfRoom(evt.target);
    checkMinPriceOfRoom(evt.target, ROOM_PRICE);
  };

  var onRoomPriceChange = function (evt) {
    checkMinPriceOfRoom(evt.target, ROOM_TYPE);
  };

  var onTimeInChange = function (evt) {
    setTime(evt.target, TIME_OUT);
  };

  var onTimeOutChange = function (evt) {
    setTime(evt.target, TIME_IN);
  };

  var onResetButtonClick = function (evt) {
    window.util.isMouseLeftEvent(evt, clearForm);
  };

  var onResetButtonEnter = function (evt) {
    window.util.isEnterEvent(evt, clearForm);
  };

  ROOMS_COUNT.addEventListener('change', onRoomsCountChange);
  GUESTS_COUNT.addEventListener('change', onGuestsCountChange);

  ROOM_TYPE.addEventListener('change', onRoomTypeChange);
  ROOM_PRICE.addEventListener('change', onRoomPriceChange);

  TIME_IN.addEventListener('change', onTimeInChange);
  TIME_OUT.addEventListener('change', onTimeOutChange);

  window.Node.OFFER_FORM.addEventListener('submit', onFormSubmit);
  RESET_FORM.addEventListener('click', onResetButtonClick);
  RESET_FORM.addEventListener('keydown', onResetButtonEnter);
})();

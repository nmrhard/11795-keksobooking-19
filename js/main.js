'use strict';

var OFFERS_COUNT = 8;
var PinMain = {
  WIDTH: 65,
  HEIGHT: 65,
  HEIGHT_ACTIVE: 84
};
var FORM_SATUS = {
  inactive: true,
  active: false
};

var addPinToMap = function (offers) {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    fragment.appendChild(window.pin.renderPin(offer));
  });

  return fragment;
};

// Activate map and forms

var setChildrenStatuses = function (element, status) {
  if (element.childElementCount) {
    for (var i = 0; i < element.children.length; i++) {
      element.children[i].disabled = status;
    }
  }
};

var getAddress = function (status) {
  var pinHeight = status ? PinMain.HEIGHT / 2 : PinMain.HEIGHT_ACTIVE;
  var mainPinX = Math.floor(window.nodes.PIN_MAIN.offsetTop - PinMain.WIDTH / 2);
  var mainPinY = Math.floor(window.nodes.PIN_MAIN.offsetLeft - pinHeight);

  return mainPinY + ', ' + mainPinX;
};

var activateElements = function () {
  window.nodes.MAP.classList.remove('map--faded');
  window.nodes.OFFER_FORM.classList.remove('ad-form--disabled');
  window.nodes.MAP_PINS_ELEMENT.appendChild(addPinToMap(window.data(OFFERS_COUNT)));
  window.nodes.ADDRESS_INPUT.value = getAddress(FORM_SATUS.active);

  setChildrenStatuses(window.nodes.OFFER_FORM, FORM_SATUS.active);
  setChildrenStatuses(window.nodes.MAP_FORM, FORM_SATUS.active);

  window.nodes.PIN_MAIN.removeEventListener('mousedown', onPinMainClick);
  window.nodes.PIN_MAIN.removeEventListener('keydown', onPinMainEnterKeyDown);
};

var onPinMainClick = function (evt) {
  window.utils.isMouseLeftEvent(evt, activateElements);
};

var onPinMainEnterKeyDown = function (evt) {
  window.utils.isEnterEvent(evt, activateElements);
};

window.nodes.PIN_MAIN.addEventListener('mousedown', onPinMainClick);

window.nodes.PIN_MAIN.addEventListener('keydown', onPinMainEnterKeyDown);

window.nodes.ADDRESS_INPUT.value = getAddress(FORM_SATUS.inactive);

setChildrenStatuses(window.nodes.OFFER_FORM, FORM_SATUS.inactive);
setChildrenStatuses(window.nodes.MAP_FORM, FORM_SATUS.inactive);


// Validate rooms and guests

var checkGuestForRooms = function (currentElement, secondElement) {
  var guests = parseInt(window.nodes.GUESTS_COUNT.value, 10);
  var rooms = parseInt(window.nodes.ROOMS_COUNT.value, 10);

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
  checkGuestForRooms(evt.target, window.nodes.GUESTS_COUNT);
};

var onGuestsCountChange = function (evt) {
  checkGuestForRooms(evt.target, window.nodes.ROOMS_COUNT);
};

window.nodes.ROOMS_COUNT.addEventListener('change', onRoomsCountChange);
window.nodes.GUESTS_COUNT.addEventListener('change', onGuestsCountChange);

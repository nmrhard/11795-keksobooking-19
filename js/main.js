'use strict';

var OFFERS_COUNT = 8;
var Pin = {
  WIDTH: 50,
  HEIGHT: 70
};
var PinMain = {
  WIDTH: 65,
  HEIGHT: 65,
  HEIGHT_ACTIVE: 84
};
var FORM_SATUS = {
  inactive: true,
  active: false
};
var Nodes = {
  MAP: document.querySelector('.map'),
  PIN_MAIN: document.querySelector('.map__pin--main'),
  MAP_PINS_ELEMENT: document.querySelector('.map__pins'),
  PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
  CARD_TEMPLATE: document.querySelector('#card').content.querySelector('map__card'),
  OFFER_FORM: document.querySelector('.ad-form'),
  MAP_FORM: document.querySelector('.map__filters'),
  ADDRESS_INPUT: document.querySelector('#address'),
  ROOMS_COUNT: document.querySelector('#room_number'),
  GUESTS_COUNT: document.querySelector('#capacity')
};

var renderPin = function (offer) {
  var pinElement = Nodes.PIN_TEMPLATE.cloneNode(true);
  var pinX = offer.location.x - Pin.WIDTH / 2;
  var pinY = offer.location.y - Pin.HEIGHT;

  pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;

  return pinElement;
};

var addPinToMap = function (offers) {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    fragment.appendChild(renderPin(offer));
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
  var mainPinX = Math.floor(Nodes.PIN_MAIN.offsetTop - PinMain.WIDTH / 2);
  var mainPinY = Math.floor(Nodes.PIN_MAIN.offsetLeft - pinHeight);

  return mainPinY + ', ' + mainPinX;
};

var activateElements = function () {
  Nodes.MAP.classList.remove('map--faded');
  Nodes.OFFER_FORM.classList.remove('ad-form--disabled');
  Nodes.MAP_PINS_ELEMENT.appendChild(addPinToMap(window.data(OFFERS_COUNT)));
  Nodes.ADDRESS_INPUT.value = getAddress(FORM_SATUS.active);

  setChildrenStatuses(Nodes.OFFER_FORM, FORM_SATUS.active);
  setChildrenStatuses(Nodes.MAP_FORM, FORM_SATUS.active);

  Nodes.PIN_MAIN.removeEventListener('mousedown', onPinMainClick);
  Nodes.PIN_MAIN.removeEventListener('keydown', onPinMainEnterKeyDown);
};

var onPinMainClick = function (evt) {
  window.utils.isMouseLeftEvent(evt, activateElements);
};

var onPinMainEnterKeyDown = function (evt) {
  window.utils.isEnterEvent(evt, activateElements);
};

Nodes.PIN_MAIN.addEventListener('mousedown', onPinMainClick);

Nodes.PIN_MAIN.addEventListener('keydown', onPinMainEnterKeyDown);

Nodes.ADDRESS_INPUT.value = getAddress(FORM_SATUS.inactive);

setChildrenStatuses(Nodes.OFFER_FORM, FORM_SATUS.inactive);
setChildrenStatuses(Nodes.MAP_FORM, FORM_SATUS.inactive);


// Validate rooms and guests

var checkGuestForRooms = function (currentElement, secondElement) {
  var guests = parseInt(Nodes.GUESTS_COUNT.value, 10);
  var rooms = parseInt(Nodes.ROOMS_COUNT.value, 10);

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
  checkGuestForRooms(evt.target, Nodes.GUESTS_COUNT);
};

var onGuestsCountChange = function (evt) {
  checkGuestForRooms(evt.target, Nodes.ROOMS_COUNT);
};

Nodes.ROOMS_COUNT.addEventListener('change', onRoomsCountChange);
Nodes.GUESTS_COUNT.addEventListener('change', onGuestsCountChange);

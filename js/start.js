'use strict';

(function () {
  var PinMain = {
    WIDTH: 65,
    HEIGHT: 65,
    HEIGHT_ACTIVE: 84
  };
  var FORM_SATUS = {
    inactive: true,
    active: false
  };

  var getAddress = function (status) {
    var pinHeight = status ? PinMain.HEIGHT / 2 : PinMain.HEIGHT_ACTIVE;
    var mainPinX = Math.floor(window.Node.PIN_MAIN.offsetTop - PinMain.WIDTH / 2);
    var mainPinY = Math.floor(window.Node.PIN_MAIN.offsetLeft - pinHeight);

    return mainPinY + ', ' + mainPinX;
  };

  var onSucces = function (offers) {
    var pins = window.pin.renderPins(offers);
    window.Node.MAP_PINS_ELEMENT.appendChild(pins);
  };

  var activateElements = function () {
    window.Node.MAP.classList.remove('map--faded');
    window.Node.OFFER_FORM.classList.remove('ad-form--disabled');
    window.backend.load(onSucces, window.util.onError);
    window.Node.FILTER_CONTAINER.before(window.map.renderCards(window.data(1)));
    window.Node.ADDRESS_INPUT.value = getAddress(FORM_SATUS.active);


    window.util.setChildrenStatuses(window.Node.OFFER_FORM, FORM_SATUS.active);
    window.util.setChildrenStatuses(window.Node.MAP_FORM, FORM_SATUS.active);

    window.Node.PIN_MAIN.removeEventListener('mousedown', onPinMainClick);
    window.Node.PIN_MAIN.removeEventListener('keydown', onPinMainEnterKeyDown);
  };

  var onPinMainClick = function (evt) {
    window.util.isMouseLeftEvent(evt, activateElements);
  };

  var onPinMainEnterKeyDown = function (evt) {
    window.util.isEnterEvent(evt, activateElements);
  };

  window.Node.PIN_MAIN.addEventListener('mousedown', onPinMainClick);
  window.Node.PIN_MAIN.addEventListener('keydown', onPinMainEnterKeyDown);

  window.Node.ADDRESS_INPUT.value = getAddress(FORM_SATUS.inactive);

  window.util.setChildrenStatuses(window.Node.OFFER_FORM, FORM_SATUS.inactive);
  window.util.setChildrenStatuses(window.Node.MAP_FORM, FORM_SATUS.inactive);
})();

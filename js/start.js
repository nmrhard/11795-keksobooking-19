'use strict';

window.start = (function () {
  var PinMain = {
    WIDTH: 65,
    HEIGHT: 65,
    HEIGHT_ACTIVE: 84
  };
  var FORM_STATUS = {
    inactive: true,
    active: false
  };
  var offers = [];

  var getAddress = function (status) {
    var pinHeight = status ? PinMain.HEIGHT / 2 : PinMain.HEIGHT_ACTIVE;
    var mainPinX = Math.floor(window.Node.PIN_MAIN.offsetTop - PinMain.WIDTH / 2);
    var mainPinY = Math.floor(window.Node.PIN_MAIN.offsetLeft - pinHeight);

    return mainPinY + ', ' + mainPinX;
  };

  var changeElementsStatus = function (status) {
    window.Node.MAP.classList.toggle('map--faded');
    window.Node.OFFER_FORM.classList.toggle('ad-form--disabled');
    window.Node.ADDRESS_INPUT.value = getAddress(status);

    window.util.setChildrenStatuses(window.Node.OFFER_FORM, status);
    window.util.setChildrenStatuses(window.Node.MAP_FORM, status);
  };

  var activateElements = function () {
    changeElementsStatus(FORM_STATUS.active);
    var pins = window.pin.renderPins(window.data.getData());
    window.Node.MAP_PINS_ELEMENT.appendChild(pins);

    window.Node.PIN_MAIN.removeEventListener('mousedown', onPinMainClick);
    window.Node.PIN_MAIN.removeEventListener('keydown', onPinMainEnterKeyDown);
    window.Node.PIN_MAIN.addEventListener('mousedown', window.map.onPinMainClick);
  };

  var disableEelemnts = function () {
    window.pin.removePins();
    window.map.closeCard();
    window.Node.OFFER_FORM.reset();
    window.Node.MAP_FORM.reset();
    window.image.removeImages();
    window.data.initialData();

    window.Node.PIN_MAIN.style = 'left: 570px; top: 375px;';
    changeElementsStatus(FORM_STATUS.inactive);
    window.Node.PIN_MAIN.addEventListener('mousedown', onPinMainClick);
    window.Node.PIN_MAIN.addEventListener('keydown', onPinMainEnterKeyDown);
  };

  var onPinMainClick = function (evt) {
    window.util.isMouseLeftEvent(evt, activateElements);
  };

  var onPinMainEnterKeyDown = function (evt) {
    window.util.isEnterEvent(evt, activateElements);
  };

  disableEelemnts();

  return {
    offers: offers,
    PinMain: PinMain,
    disableEelemnts: disableEelemnts
  };
})();

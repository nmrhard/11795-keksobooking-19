'use strict';

(function () {
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
})();

'use strict';

window.map = (function () {
  var PinMain = {
    WIDTH: 65,
    HEIGHT: 84
  };
  var mapBorder = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };
  var MAP_PIN_CLASS = 'map__pin';

  var onCardCloseClick = function () {
    closeCard();
  };

  var onCardEnterKeyDown = function (evt) {
    if (evt.key === window.util.Key.ENTER) {
      showCard(evt.target);
    }
  };

  var onCardEscapeKeyDown = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var onPinClick = function (evt) {
    showCard(evt.target);
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      card.remove();
      document.removeEventListener('keydown', onCardEscapeKeyDown);
    }
  };

  var showCard = function (element) {
    closeCard();

    var pin = element.dataset.index ? element : element.parentElement;
    var isPin = pin.className === MAP_PIN_CLASS ? true : false;
    if (isPin) {
      var offer = window.start.offers[pin.dataset.index];
      window.Node.FILTER_CONTAINER.before(window.card.renderCard(offer));
      document.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
      document.addEventListener('keydown', onCardEscapeKeyDown);
    }
  };

  var checkBorder = function (min, max, currentCoord) {
    if (currentCoord > max) {
      return max;
    } else if (currentCoord < min) {
      return min;
    }

    return currentCoord;
  };

  var onPinMainClick = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (mouseEvt) {
      mouseEvt.preventDefault();
      var shift = {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY
      };

      startCoords = {
        x: mouseEvt.clientX,
        y: mouseEvt.clientY
      };

      var pinMainY = window.Node.PIN_MAIN.offsetTop - shift.y;
      var pinMainX = window.Node.PIN_MAIN.offsetLeft - shift.x;

      var addressY = checkBorder(mapBorder.Y.MIN - PinMain.HEIGHT, mapBorder.Y.MAX - PinMain.HEIGHT, pinMainY);
      var addressX = checkBorder(mapBorder.X.MIN - PinMain.WIDTH / 2, mapBorder.X.MAX - PinMain.WIDTH / 2, pinMainX);

      window.Node.PIN_MAIN.style.top = addressY + 'px';
      window.Node.PIN_MAIN.style.left = addressX + 'px';

      window.Node.ADDRESS_INPUT.value = Math.floor(addressY + PinMain.HEIGHT) + ', ' + Math.floor(addressX + PinMain.WIDTH / 2);
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMainMouseMove);
      window.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    window.addEventListener('mouseup', onPinMainMouseUp);
  };

  window.Node.MAP_PINS_ELEMENT.addEventListener('click', onPinClick);
  window.Node.MAP_PINS_ELEMENT.addEventListener('keydown', onCardEnterKeyDown);

  return {
    onPinMainClick: onPinMainClick
  };
})();

'use strict';

window.map = (function () {
  var mapBorder = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };
  var MAP_PIN_CLASS = 'map__pin';

  var onCardCloseClick = function () {
    closeCard();
  };

  var onCardEscapeKeyDown = function (evt) {
    window.util.isEscEvent(evt, closeCard);
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
      var offer = window.filter.getOfferByIndex(pin.dataset.index);
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

      var addressY = checkBorder(mapBorder.Y_MIN - window.start.PinMain.HEIGHT_ACTIVE, mapBorder.Y_MAX - window.start.PinMain.HEIGHT_ACTIVE, pinMainY);
      var addressX = checkBorder(mapBorder.X_MIN - window.start.PinMain.WIDTH / 2, mapBorder.X_MAX - window.start.PinMain.WIDTH / 2, pinMainX);

      window.Node.PIN_MAIN.style.top = addressY + 'px';
      window.Node.PIN_MAIN.style.left = addressX + 'px';

      window.Node.ADDRESS_INPUT.value = Math.floor(addressY + window.start.PinMain.HEIGHT_ACTIVE) + ', ' + Math.floor(addressX + window.start.PinMain.WIDTH / 2);
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMainMouseMove);
      window.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    window.addEventListener('mouseup', onPinMainMouseUp);
  };

  return {
    onPinMainClick: onPinMainClick,
    showCard: showCard,
    closeCard: closeCard
  };
})();

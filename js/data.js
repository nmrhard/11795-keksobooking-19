'use strict';

(function () {
  var TYPE_APARTMENT = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var Price = {
    MIN: 1000,
    MAX: 10000
  };
  var Guests = {
    MIN: 0,
    MAX: 2
  };
  var Rooms = {
    MIN: 1,
    MAX: 3
  };
  var OfferLocation = {
    X: {
      MIN: 25,
      MAX: 1175
    },
    Y: {
      MIN: 200,
      MAX: 630
    }
  };

  var createOffer = function (numberOfOffer) {
    var locationX = window.utils.getRandomBetween(OfferLocation.X.MIN, OfferLocation.X.MAX);
    var locationY = window.utils.getRandomBetween(OfferLocation.Y.MIN, OfferLocation.Y.MAX);

    var offer = {
      author: {
        avatar: 'img/avatars/user' + window.utils.getPictureNumber(numberOfOffer) + '.png'
      },
      offer: {
        title: 'Предложение ' + numberOfOffer,
        address: locationX + ',' + locationY,
        price: window.utils.getRandomBetween(Price.MIN, Price.MAX),
        type: window.utils.getRandomItem(TYPE_APARTMENT),
        rooms: window.utils.getRandomBetween(Rooms.MIN, Rooms.MAX),
        guests: window.utils.getRandomBetween(Guests.MIN, Guests.MAX),
        checkin: window.utils.getRandomItem(CHECKIN),
        checkout: window.utils.getRandomItem(CHECKOUT),
        features: window.utils.getRandomItems(FEATURES),
        description: 'Описание ' + numberOfOffer,
        photos: window.utils.getRandomItems(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    return offer;
  };

  window.data = function (offersCount) {
    var offers = [];

    for (var i = 1; i <= offersCount; i++) {
      offers.push(createOffer(i));
    }

    return offers;
  };
})();

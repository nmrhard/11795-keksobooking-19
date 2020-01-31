'use strict';

var OFFERS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
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
var Location = {
  X: {
    MIN: 25,
    MAX: 1175
  },
  Y: {
    MIN: 200,
    MAX: 630
  }
};
var Nodes = {
  MAP: document.querySelector('.map'),
  MAP_PINS_ELEMENT: document.querySelector('.map__pins'),
  PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
  CARD_TEMPLATE: document.querySelector('#card').content.querySelector('map__card')
}

Nodes.MAP.classList.remove('map--faded');

var getPictureNumber = function (offer) {
  return (offer >= 10) ? offer : '0' + offer;
};

var getRendomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRendomArrIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomArr = function (arr) {
  var randomElement = 0;
  var randomArr = [];
  var tempArr = arr.slice();
  var arrLenght = getRendomNumber(1, tempArr.length);

  for (var i = 0; i < arrLenght; i++) {
    randomElement = getRendomArrIndex(tempArr);
    randomArr.push(tempArr.splice(randomElement, 1));
  }

  return randomArr;
};

var createOffer = function (numberOfOffer) {
  var locationX = getRendomNumber(Location.X.MIN, Location.X.MAX);
  var locationY = getRendomNumber(Location.Y.MIN, Location.Y.MAX);

  var offer = {
    author: {
      avatar: 'img/avatars/user' + getPictureNumber(numberOfOffer) + '.png'
    },
    offer: {
      title: 'Предложение ' + numberOfOffer,
      address: locationX + ',' + locationY,
      price: getRendomNumber(Price.MIN, Price.MAX),
      type: TYPE_APARTMENT[getRendomArrIndex(TYPE_APARTMENT)],
      rooms: getRendomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRendomNumber(Guests.MIN, Guests.MAX),
      checkin: CHECKIN[getRendomArrIndex(CHECKIN)],
      checkout: CHECKOUT[getRendomArrIndex(CHECKOUT)],
      features: getRandomArr(FEATURES),
      description: 'Описание ' + numberOfOffer,
      photos: getRandomArr(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  return offer;
};

var generateOffers = function () {
  var offers = [];

  for (var i = 1; i <= OFFERS; i++) {
    offers.push(createOffer(i));
  }

  return offers;
};

var renderPin = function (offer) {
  var pinElement = Nodes.PIN_TEMPLATE.cloneNode(true);
  var pinX = offer.location.x - PIN_WIDTH / 2;
  var pinY = offer.location.y - PIN_HEIGHT;

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

Nodes.MAP_PINS_ELEMENT.appendChild(addPinToMap(generateOffers()));

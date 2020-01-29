'use strict';

var OFFERS = 8;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;
var TYPE_APARTMENT = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var PRICE = {
  MIN: 1000,
  MAX: 10000
};
var GUESTS = {
  MIN: 0,
  MAX: 2
}
var ROOMS = {
  MIN: 1,
  MAX: 3
}
var LOCATION = {
  X: {
    MIN: 1,
    MAX: 1200
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};

var map  = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getPictureNumber = function (offer) {
  return (offer >= 10) ? offer : '0' + offer;
};

var getRendomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRendomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomArr = function (arr) {
  var randomElement = 0;
  var randomArr = [];
  var arrLenght = getRendomNumber(1, arr.length);

  for (var i = 0; i < arrLenght; i++) {
    randomElement = getRendomElement(arr);
    randomArr.push(arr[randomElement]);
    arr.splice(randomElement, 1)
  }

  return randomArr;
};

var createOffer = function (numberOfOffer) {
  var locationX = getRendomNumber(LOCATION.X.MIN, LOCATION.X.MAX);
  var locationY = getRendomNumber(LOCATION.Y.MIN, LOCATION.Y.MAX);

  var offer = {
    author: {
      avatar: 'img/avatars/user' + getPictureNumber(numberOfOffer) +'.png'
    },
    offer: {
      title: 'Предложение ' + numberOfOffer,
      address: locationX + ',' +  locationY,
      price: getRendomNumber(PRICE.MIN, PRICE.MAX),
      type: TYPE_APARTMENT[getRendomElement(TYPE_APARTMENT)],
      rooms: getRendomNumber(ROOMS.MIN, ROOMS.MAX),
      guests: getRendomNumber(GUESTS.MIN, GUESTS.MAX),
      checkin: CHECKIN[getRendomElement(CHECKIN)],
      checkout: CHECKOUT[getRendomElement(CHECKOUT)],
      features: getRandomArr(FEATURES),
      description: 'Описание ' + numberOfOffer,
      photos: getRandomArr(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  }

  return offer;
};

var renderPin = function(offer) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = offer.location.x - PIN_WIDTH / 2;
  var pinY = offer.location.y + PIN_HEIGHT;

  pinElement.setAttribute('style', 'left: ' + pinX  + 'px; ' + 'top: ' + pinY + 'px;');

  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;

  return pinElement;
}

renderPin(createOffer(3));

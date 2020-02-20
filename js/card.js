'use strict';

window.card = (function () {
  var TYPE_APARTMENT = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var FEATURES = {
    'wifi': 'Wi-Fi',
    'dishwasher': 'Посудомоечная машина',
    'parking': 'Паркинг',
    'washer': 'Стиральная машина',
    'elevator': 'Лифт',
    'conditioner': 'Кондиционер'
  };

  var getRoomsGuests = function (rooms, guests) {
    var roomName = 'комнаты';
    var guestName = 'гостей';

    if (rooms === 1) {
      roomName = 'комната';
    }
    if (rooms > 4) {
      roomName = 'комнат';
    }

    if (guests === 1) {
      guestName = 'гостя';
    }

    return rooms + ' ' + roomName + ' для ' + guests + guestName;
  };

  var getOfferFeatures = function (element, features) {
    element.innerHTML = '';
    var featuresClassName = 'popup__feature';

    var fragment = document.createDocumentFragment();
    var newItemElement = document.createElement('li');
    features.forEach(function (featuresItem) {
      newItemElement.className = featuresClassName + ' ' + featuresClassName + '--' + featuresItem;
      newItemElement.textContent = FEATURES[featuresItem];
      fragment.appendChild(newItemElement);
    });

    return fragment;
  };

  var getPhotos = function (photoElement, photos) {
    var fragment = document.createDocumentFragment();

    photoElement.src = photos[0];
    for (var i = 1; i < photos.length; i++) {
      var newPhotoElement = photoElement.cloneNode();
      newPhotoElement.src = photos[i];
      fragment.appendChild(newPhotoElement);
    }

    return fragment;
  };

  var renderCard = function (data) {
    var cardElement = window.Node.CARD_TEMPLATE.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPE_APARTMENT[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = getRoomsGuests(data.offer.rooms, data.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    var featuresElement = cardElement.querySelector('.popup__features');

    if (data.offer.features.length > 0) {
      featuresElement.appendChild(getOfferFeatures(featuresElement, data.offer.features));
    } else {
      featuresElement.style.display = 'none';
    }

    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    var photosElement = cardElement.querySelector('.popup__photos');

    if (data.offer.photos.length > 0) {
      var photoElement = cardElement.querySelector('.popup__photo');
      photosElement.appendChild(getPhotos(photoElement, data.offer.photos));
    } else {
      photosElement.style.display = 'none';
    }

    return cardElement;
  };

  return {
    renderCard: renderCard
  };
})();

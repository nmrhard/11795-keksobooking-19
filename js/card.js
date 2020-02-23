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

  var ROOM_PLURAL = ['комната', 'комнаты', 'комнат'];
  var GUSTS_PLURAL = ['гостя', 'гостей', 'гостей'];

  var pluralize = function (count, words) {
    var cases = [2, 0, 1, 1, 1, 2];
    return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
  };

  var getOfferFeatures = function (element, features) {
    element.innerHTML = '';
    var featuresClassName = 'popup__feature';

    var fragment = document.createDocumentFragment();
    features.forEach(function (featuresItem) {
      var newItemElement = document.createElement('li');
      newItemElement.className = featuresClassName + ' ' + featuresClassName + '--' + featuresItem;
      newItemElement.textContent = FEATURES[featuresItem];
      fragment.appendChild(newItemElement);
    });

    return fragment;
  };

  var getPhotos = function (photoElement, photos) {
    var fragment = document.createDocumentFragment();

    photoElement.src = photos[0];
    photos.slice(1).forEach(function (photo) {
      var newPhotoElement = photoElement.cloneNode();
      newPhotoElement.src = photo;
      fragment.appendChild(newPhotoElement);
    });

    return fragment;
  };

  var renderCard = function (data) {
    var cardElement = window.Node.CARD_TEMPLATE.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPE_APARTMENT[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = pluralize(data.offer.rooms, ROOM_PLURAL) + ' для ' + pluralize(data.offer.guests, GUSTS_PLURAL);
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
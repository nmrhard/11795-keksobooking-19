'use strict';

window.filter = (function () {
  var filterOffers;
  var apartmentType = window.Node.HOUSE_TYPE_FILTER.value;
  var apartmentPrice = window.Node.HOUSE_PRICE_FILTER.value;
  var apartmentRooms = window.Node.HOUSE_ROOMS_FILTER.value;
  var apartmentGuests = window.Node.HOUSE_GUESTS_FILTER.value;
  var apartmentFeatures = Array.from(window.Node.HOUSE_FEATURES_FILTER.children)
  .filter(function (feature) {
    return feature.checked === true;
  })
  .map(function (element) {
    return element.value;
  });
  var priceMap = {
    'low': {min: 0, max: 10000},
    'middle': {min: 10000, max: 50000},
    'high': {min: 50000, max: Number.MAX_SAFE_INTEGER}
  };

  var onFilterChange = function (evt) {
    if (evt.target.id === window.Node.HOUSE_TYPE_FILTER.id) {
      apartmentType = evt.target.value;
    } else if (evt.target.id === window.Node.HOUSE_PRICE_FILTER.id) {
      apartmentPrice = evt.target.value;
    } else if (evt.target.id === window.Node.HOUSE_ROOMS_FILTER.id) {
      apartmentRooms = evt.target.value;
    } else if (evt.target.id === window.Node.HOUSE_GUESTS_FILTER.id) {
      apartmentGuests = evt.target.value;
    } else if (evt.target.parentNode.id === window.Node.HOUSE_FEATURES_FILTER.id) {
      apartmentFeatures = getFeatures();
    }

    window.data.filterData();
    window.debounce(window.pin.updatePins);
  };

  var getFeatures = function () {
    var features = Array.from(window.Node.HOUSE_FEATURES_FILTER.children)
    .filter(function (feature) {
      return feature.checked;
    })
    .map(function (element) {
      return element.value;
    });

    return features;
  };

  var setFilter = function (offers) {
    filterOffers = offers.filter(filtration);
    return filterOffers;
  };

  var filtration = function (item) {
    return filterByApartmentType(item)
    && filterByApartmentPrice(item)
    && filterByApartmentRooms(item)
    && filterByApartmentGuests(item)
    && filterByApartmentFeatures(item);
  };

  var filterByApartmentType = function (item) {
    return apartmentType === 'any' || apartmentType === item.offer.type;
  };

  var filterByApartmentPrice = function (item) {
    return apartmentPrice === 'any' || (priceMap[apartmentPrice].min <= item.offer.price
      && priceMap[apartmentPrice].max > item.offer.price);
  };

  var filterByApartmentRooms = function (item) {
    return apartmentRooms === 'any' || parseInt(apartmentRooms, 10) === item.offer.rooms;
  };

  var filterByApartmentGuests = function (item) {
    return apartmentGuests === 'any' || parseInt(apartmentGuests, 10) === item.offer.guests;
  };

  var filterByApartmentFeatures = function (item) {
    return apartmentFeatures.every(function (feature) {
      return item.offer.features.includes(feature);
    });
  };

  window.Node.MAP_FORM.addEventListener('change', onFilterChange);

  return {
    setFilter: setFilter
  };
})();

'use strict';

(function () {
  var AVATAR_CHOOSER = document.body.querySelector('#avatar');
  var AVATAR_PREVIEW = document.body.querySelector('.ad-form-header__preview img');
  var ROOM_PHOTO_CHOOSER = document.body.querySelector('#images');
  var ROOM_PHOTO_PREVIEW = document.body.querySelector('.ad-form__photo');
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var roomImageWidth = 70;
  var roomImageHeight = 70;

  var defaultAvatar = AVATAR_PREVIEW.src;

  var checkFile = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    return matches;
  };

  var onAvatatChange = function () {
    var file = AVATAR_CHOOSER.files[0];
    var isImage = checkFile(file);

    if (isImage) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        AVATAR_PREVIEW.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onRoomPhotoChange = function () {
    var file = ROOM_PHOTO_CHOOSER.files[0];
    var isImage = checkFile(file);

    if (isImage) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        ROOM_PHOTO_PREVIEW.style = 'display: flex; flex-wrap: wrap; width: 290px;';
        var roomPhoto = document.createElement('img');
        roomPhoto.width = roomImageWidth;
        roomPhoto.height = roomImageHeight;
        roomPhoto.src = reader.result;
        roomPhoto.alt = 'Фото жилья';
        ROOM_PHOTO_PREVIEW.appendChild(roomPhoto);
      });

      reader.readAsDataURL(file);
    }
  };

  var removeImages = function () {
    AVATAR_PREVIEW.src = defaultAvatar;
    ROOM_PHOTO_PREVIEW.innerHTML = '';
  };

  AVATAR_CHOOSER.addEventListener('change', onAvatatChange);
  ROOM_PHOTO_CHOOSER.addEventListener('change', onRoomPhotoChange);

  window.image = {
    removeImages: removeImages
  };
})();

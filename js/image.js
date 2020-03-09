'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var avatarChooser = window.Node.AVATAR_CHOOSER;
  var avatarPreview = window.Node.AVATAR_PREVIEW;

  var roomPhotoChooser = window.Node.ROOM_PHOTO_CHOOSER;
  var roomPhotoPreview = window.Node.ROOM_PHOTO_PREVIEW;

  var checkFile = function (file) {

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    return matches;
  };

  var onAvatatChange = function () {
    var file = avatarChooser.files[0];
    var isImage = checkFile(file);

    if (isImage) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onRoomPhotoChange = function () {
    var file = roomPhotoChooser.files[0];
    var isImage = checkFile(file);

    if (isImage) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        roomPhotoPreview.style = 'display: flex; flex-wrap: wrap; width: 290px;';
        var roomPhoto = document.createElement('img');
        roomPhoto.setAttribute('width', '70');
        roomPhoto.setAttribute('height', '70');
        roomPhoto.src = reader.result;
        roomPhoto.alt = 'Фото жилья';
        roomPhotoPreview.appendChild(roomPhoto);
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', onAvatatChange);
  roomPhotoChooser.addEventListener('change', onRoomPhotoChange);
})();

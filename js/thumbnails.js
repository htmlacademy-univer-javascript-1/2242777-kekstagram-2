import {createBigPhoto} from './bigpicture.js';

const picturesModule = document.querySelector('.pictures');
picturesModule.querySelector('.pictures__title').classList.remove('visually-hidden');

const photoThumbnailTemplate = document.querySelector('#picture').content.querySelector('a');
const photosFragment = document.createDocumentFragment();
const createThumbnail = function(descriptions) {
  descriptions.forEach((photo) => {
    const thumbnail = photoThumbnailTemplate.cloneNode(true);
    const numberOfComments = thumbnail.querySelector('.picture__comments');
    const numberOfLikes = thumbnail.querySelector('.picture__likes');
    const thumbnailImg = thumbnail.querySelector('img');
    thumbnailImg.src = photo.url;
    numberOfComments.textContent = photo.comments.length;
    numberOfLikes.textContent = photo.likes;
    photosFragment.append(thumbnail);
    thumbnailImg.addEventListener('click', (evt) => {
      evt.preventDefault();
      createBigPhoto(thumbnail, numberOfLikes.textContent, photo.comments, photo.description);
    });
  });
  picturesModule.append(photosFragment);
};

export{createThumbnail};

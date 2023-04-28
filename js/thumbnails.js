import {createBigPhoto} from './full-size-img.js';

const picturesModule = document.querySelector('.pictures');

const photoThumbnailTemplate = document.querySelector('#picture').content.querySelector('a');
const photosFragment = document.createDocumentFragment();

const createThumbnail = (descriptions) => {
  descriptions.forEach((photo) => {
    const thumbnail = photoThumbnailTemplate.cloneNode(true);
    const numberOfComments = thumbnail.querySelector('.picture__comments');
    const numberOfLikes = thumbnail.querySelector('.picture__likes');
    const thumbnailImg = thumbnail.querySelector('img');
    thumbnailImg.src = photo.url;
    numberOfComments.textContent = photo.comments.length;
    numberOfLikes.textContent = photo.likes;
    photosFragment.append(thumbnail);
    thumbnailImg.addEventListener ('click', (evt) => {
      evt.preventDefault();
      createBigPhoto(thumbnail, numberOfLikes.textContent, photo.comments, photo.description);
    });
  });
  picturesModule.append(photosFragment);
};

export{createThumbnail};

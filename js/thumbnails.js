
import { numberPhotoUsers } from './data.js';

const thumbnailFragment = document.createDocumentFragment();


//куда добавлять итог
const picturesModule = document.querySelector('.pictures');
//шаблон
const thumbnailsTemplate = document.querySelector('#picture').content;

const simularThumbnails = numberPhotoUsers;
simularThumbnails.forEach(({url, likes, comments})=>{
  const thumbnails = thumbnailsTemplate.cloneNode(true);
  thumbnails.querySelector('.picture__img').src = url;
  thumbnails.querySelector('.picture__likes').textContent=likes;
  thumbnails.querySelector('.picture__comments').textContent=comments.length;
  thumbnailsFragment.appendChild(thumbnails);
});
picturesModule.appendChild(thumbnailsFragment);

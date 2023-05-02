import {shuffle} from './util.js';
import {createThumbnails} from './thumbnails.js';

const MAX_RANDOM_PHOTO_LENGTH = 10;
const defaultFilterButton = document.getElementById('filter-default');
const randomFilterButton = document.getElementById('filter-random');
const discussedFilterButton = document.getElementById('filter-discussed');

const removeThumbnails = () => {
  const thumbnailsList = document.querySelectorAll('.picture');
  thumbnailsList.forEach((element) => {
    element.remove();
  });
};

const compareThumbnails = (a, b) =>  b.comments.length - a.comments.length;

const filterByDefault = (thumbnails) => {
  defaultFilterButton.addEventListener('click', () => {
    removeThumbnails();
    discussedFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.add('img-filters__button--active');
    createThumbnails(thumbnails);
  });
};

const filterRandom = (thumbnails) => {
  randomFilterButton.addEventListener('click', () => {
    removeThumbnails();
    discussedFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    const randomPhotoList = shuffle(thumbnails);
    createThumbnails(randomPhotoList.slice(0, MAX_RANDOM_PHOTO_LENGTH));
  });
};

const filterDiscussed = (thumbnails) => {
  discussedFilterButton.addEventListener('click', () => {
    removeThumbnails();
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.add('img-filters__button--active');
    const newArray = thumbnails.slice();
    createThumbnails(newArray.sort(compareThumbnails));
  });
};

const imageFiltering = (thumbnails) => {
  filterByDefault(thumbnails);
  filterRandom(thumbnails);
  filterDiscussed(thumbnails);
};

export {imageFiltering};

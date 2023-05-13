import {shuffle, debounce} from './util.js';
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

const filterByDefault =  (cb) => {
  defaultFilterButton.addEventListener('click', () => {
    removeThumbnails();
    discussedFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.add('img-filters__button--active');
    cb();
  });
};

const filterRandom = (cb) => {
  randomFilterButton.addEventListener('click', () => {
    removeThumbnails();
    discussedFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    cb();
  });
};

const filterDiscussed = (thumbnails, cb) => {
  discussedFilterButton.addEventListener('click', () => {
    removeThumbnails();
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.add('img-filters__button--active');
    cb();
  });
};

const imageFiltering = (thumbnails) => {
  filterByDefault(thumbnails, debounce(() => createThumbnails(thumbnails)));

  filterRandom(thumbnails, debounce(() => {
    const randomPhotoList = shuffle(thumbnails);
    createThumbnails(randomPhotoList.slice(0, MAX_RANDOM_PHOTO_LENGTH));
  }));

  filterDiscussed(thumbnails, debounce(() => {
    const newArray = thumbnails.slice();
    createThumbnails(newArray.sort(compareThumbnails));
  })
  );
};

export {imageFiltering};

import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');
const commentsOfPhoto = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const sumOfComments = document.querySelector('.social__comment-count');

const createCommentBigPhoto = (commentInfo) => {
  const commentClone = commentTemplate.cloneNode(true);
  const profilPhoto = commentClone.querySelector('img');
  profilPhoto.src = commentInfo.avatar;
  profilPhoto.alt = commentInfo.name;
  commentClone.querySelector('p').textContent = commentInfo.message;
  return commentClone;
};

const openBigPicture = () => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const createBigPhoto = (thumbnail, likes, comments, description) => {
  openBigPicture();
  bigPicture.querySelector('.big-picture__img img').src = thumbnail.querySelector('img').src;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;

  comments.slice(0, 5).forEach ((comment) => {
    const newComment = createCommentBigPhoto(comment);
    commentsOfPhoto.append(newComment);
  });
  sumOfComments.textContent = `${commentsOfPhoto.querySelectorAll('li').length} из ${comments.length} комментариев`;

  if (commentsOfPhoto.querySelectorAll('li').length === comments.length) {
    commentsLoader.classList.add('hidden');
  }

  let CurrentMinLength = 5;
  let commentCurrentMaxLength = 10;

  const commentsLoadHandler = () => {
    comments.slice(CurrentMinLength, commentCurrentMaxLength).forEach((comment) => {
      const newComment = createCommentBigPhoto(comment);
      commentsOfPhoto.append(newComment);
    });
    CurrentMinLength+=5;
    commentCurrentMaxLength+=5;
    if (commentsOfPhoto.querySelectorAll('li').length === comments.length) {
      commentsLoader.classList.add('hidden');
    }
    sumOfComments.textContent = `${commentsOfPhoto.querySelectorAll('li').length} из ${comments.length} комментариев`;
  };

  commentsLoader.addEventListener('click', commentsLoadHandler);

  bigPictureCloseButton.addEventListener ('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsOfPhoto.innerHTML = '';
    commentsLoader.removeEventListener('click', commentsLoadHandler);
  });

  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentsOfPhoto.innerHTML = '';
      commentsLoader.removeEventListener('click', commentsLoadHandler);
    }
  }, {once: true});
};

export {createBigPhoto};

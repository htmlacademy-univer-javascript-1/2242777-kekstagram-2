import { picturesModule } from "./thumbnails.js";
import { createComment } from './data.js';
import { generatePhotoDescription} from './data.js';
//окно с фото
const activeImg = document.querySelector('.big-picture');

const body = document.querySelector('body');

// рандомные данные,чтобы вставить
const preview = miniaturesList.querySelector('.picture__img');
const likes = miniaturesList.querySelector('.picture__likes');
const comments = miniaturesList.querySelector('.picture__comments');
const previews = miniaturesList.querySelectorAll('.pictures a');

// в HTML нашли куда вставлять картинки
const bigPictireImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');

//Комментарии
const commentsList = document.querySelector('.social__comments');
//const avatar = commentsList.children; //работает только для первого,а надо для 2 комментариев
const avatar = commentsList.querySelectorAll('.social__comment img');
const signature = document.querySelector('.social__caption');
const socialText = commentsList.querySelectorAll('.social__text');
const descriptionUser = generatePhotoDescription();
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

//цикл для навешивания обработчика кликов и вставлять рандомные данные
for ( let i = 0; i < previews.length; i++) {
  const button = previews[i];
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    activeImg.classList.remove('hidden');
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
    bigPictireImg.src=preview.src;
    likesCount.textContent = likes.textContent;
    commentsCount.textContent = comments.textContent;
    for(let k = 0; i<= avatar.length - 1 ; k++){
      const commentsUsers = createComment();
      const element = avatar[k];
      element.src=commentsUsers.avatar;
      element.alt=commentsUsers.name;
    }
    for(let j = 0; j <= socialText.length - 1 ; j++){
      const commentsUsers = createComment();
      const element = socialText[j];
      element.textContent = commentsUsers.message;
    }
    signature.textContent = descriptionUser.description;
  });
}

const bigPictureCansel = document.querySelector('#picture-cancel');
bigPictureCansel.addEventListener('click', () => {
  activeImg.classList.add('hidden');
});
document.addEventListener('keydown',(evt) => {
  if(evt.key==='Escape'){
    evt.preventDefault();
    activeImg.classList.add('hidden');
  }
});

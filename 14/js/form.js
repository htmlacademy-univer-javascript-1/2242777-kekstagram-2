import {isEscapeKey} from './util.js';
import {imgPreview} from './zoom.js';
import {slider, filterEditor} from './filter-editor.js';
import {sendData} from './server.js';

/*Валидация формы*/
const re = /^((#[A-Za-zА-Яа-яЁё0-9]{1,19})\s*|)+$$/;
const MAX_HASHTAG_COUNT = 5;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const formCloseButton = uploadForm.querySelector('.img-upload__cancel');
const editingForm = uploadForm.querySelector('.img-upload__overlay');
const hashtags = uploadForm.querySelector('.text__hashtags');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const photoComment = uploadForm.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('section');
const successTemplate = document.querySelector('#success').content.querySelector('section');
const submitButton = document.querySelector('.img-upload__submit');

const openFormSettingsHundler = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.querySelector('img').src = URL.createObjectURL(file);
    document.body.classList.add('modal-open');
    editingForm.classList.remove('hidden');
  }
};

const closeEditingForm = () => {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.innerHTML = '';
  hashtags.value = '';
  photoComment.value = '';
  imgPreview.style.transform = 'scale(1)';
  imgPreview.classList = ['img-upload__preview'];
  imgPreview.style.filter = '';
  document.getElementById('effect-none').checked = true;
  slider.style.display = 'none';
};

const addHandlersToCloseForm = () => {
  formCloseButton.addEventListener ('click', () => {
    closeEditingForm();
  });

  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      closeEditingForm();
    }
  });
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showMessage = (template, buttonClass, cb) => {
  const message = template.cloneNode(true);
  const removeErrorMessage = () => {
    document.body.removeChild(message);
    cb();
  };

  const windowRemoveHundler = () => {
    removeErrorMessage();
    document.removeEventListener('keydown', escRemoveHundler);
  };

  function escRemoveHundler(evt) {
    if (message.parentNode) {
      if (isEscapeKey(evt)) {
        window.removeEventListener('click', windowRemoveHundler);
        removeErrorMessage();
      }}
  }

  editingForm.classList.add('hidden');
  document.body.append(message);
  window.addEventListener('click', windowRemoveHundler, {once: true});

  message.querySelector('div').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  message.querySelector(buttonClass).addEventListener('click', () => {
    removeErrorMessage();
    window.removeEventListener('click', windowRemoveHundler);
    document.removeEventListener('keydown', escRemoveHundler);
  });

  document.addEventListener('keydown', escRemoveHundler, {once: true});
  unblockSubmitButton();
};

const showSuccesForm = () => {
  showMessage(successTemplate, '.success__button', () => closeEditingForm());
};

const showErrorForm = () => {
  document.body.classList.remove('modal-open');
  showMessage(errorTemplate, '.error__button', () => {
    editingForm.classList.remove('hidden');
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
});

const validateHashtagsValue = () => re.test(hashtags.value);

const validateHashtagsSimilar = () => {
  const hashtagsList = hashtags.value.split(' ');
  const newHashtagsList = [];

  hashtagsList.forEach((hashtag) => {
    newHashtagsList.push(hashtag.toLowerCase());
  });

  const unique = Array.from(new Set(newHashtagsList));
  return (unique.length === newHashtagsList.length);
};

const validateHashtagsMax = () => {
  const hashtagsList = hashtags.value.split(' ');
  return !((hashtagsList.length > MAX_HASHTAG_COUNT));
};

const setUserFormSubmit = () => {
  pristine.addValidator(hashtags, validateHashtagsValue, 'Неверно введенный хэш-тег');
  pristine.addValidator(hashtags, validateHashtagsSimilar, 'Вижу одинаковые хэш-теги');
  pristine.addValidator(hashtags, validateHashtagsMax, 'Превышен максимальный лимит хэш-тегов');

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(showSuccesForm, showErrorForm, formData);
    }
  });
};

const openForm = () => {
  uploadInput.addEventListener('change', openFormSettingsHundler);

  hashtags.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
  photoComment.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });

  addHandlersToCloseForm();
  setUserFormSubmit();
  filterEditor();
};

export {openForm};

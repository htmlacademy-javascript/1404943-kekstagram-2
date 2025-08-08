import {sendData} from './api';
import {isEscapeKey} from './util';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const resetValidation = () => {
  pristine.reset();
};

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

let errorMessage = '';

pristine.addValidator(hashtagInput, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    errorMessage = 'Нельзя указать больше пяти хэштегов.';
    return false;
  }
  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    errorMessage = 'Один и тот же хэштег не может быть использован дважды.';
    return false;
  }
  for (const tag of hashtags) {
    if (!HASHTAG_REGEX.test(tag)) {
      errorMessage = `Хэштег "${tag}" невалиден.`;
      return false;
    }
  }
  return true;
}, () => errorMessage, 2, false);

pristine.addValidator(commentInput, (value) => value.length <= MAX_COMMENT_LENGTH, `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов.`);

const handleMessageClose = (messageElement) => {
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    const inner = messageElement.querySelector('.success__inner, .error__inner');
    if (!inner.contains(evt.target)) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  const closeButton = messageElement.querySelector('.success__button, .error__button');
  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  handleMessageClose(successElement);
};

const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  handleMessageClose(errorElement);
};

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      submitButton.disabled = true;

      sendData(new FormData(evt.target))
        .then(() => {
          // При успехе: сначала закрываем форму, потом показываем сообщение.
          onSuccess();
          showSuccessMessage();
        })
        .catch(() => {
          // При ошибке: форма остается открытой, показывается сообщение об ошибке.
          showErrorMessage();
        })
        .finally(() => {
          // В любом случае разблокируем кнопку.
          submitButton.disabled = false;
        });
    }
  });
};

export {setUploadFormSubmit, resetValidation};

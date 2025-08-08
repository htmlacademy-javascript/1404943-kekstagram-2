import {sendData} from './api';
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;

let errorMessage = '';

pristine.addValidator(hashtagInput, (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (hashtags.length > 5) {
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
      errorMessage = `Хэштег "${tag}" невалиден. Он должен начинаться с #, состоять из букв/цифр и быть не длиннее 20 символов.`;
      return false;
    }
  }

  return true;
}, () => errorMessage, 2, false);

pristine.addValidator(commentInput, (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    return false;
  }
  return true;
}, `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов.`);

const handleMessageClose = (messageElement, onClose) => {
  const closeButton = messageElement.querySelector('button');

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
    if (onClose) {
      onClose();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

// Функция для отображения сообщения об успешной отправке
const showSuccessMessage = (onClose) => {
  const successElement = successTemplate.cloneNode(true).querySelector('.success');
  document.body.append(successElement);
  handleMessageClose(successElement, onClose);
};

// Функция для отображения сообщения об ошибке
const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true).querySelector('.error');
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
          showSuccessMessage(() => {
            if (onSuccess) {
              onSuccess();
            }
          });
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    }
  });
};

export {setUploadFormSubmit};

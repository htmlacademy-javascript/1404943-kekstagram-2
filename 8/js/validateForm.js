const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// 3. Кастомный валидатор
let errorMessage = '';

pristine.addValidator(hashtagInput, (value) => {
  // Правило: хэштеги необязательны. Если поле пустое, оно валидно.
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  // Правило: не больше 5 хэштегов
  if (hashtags.length > 5) {
    errorMessage = 'Нельзя указать больше пяти хэштегов.';
    return false;
  }

  // Правило: уникальность хэштегов (без учета регистра)

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    errorMessage = 'Один и тот же хэштег не может быть использован дважды.';
    return false;
  }

  // Правило: каждый хэштег должен соответствовать формату
  for (const tag of hashtags) {
    if (!HASHTAG_REGEX.test(tag)) {
      errorMessage = `Хэштег "${tag}" невалиден. Он должен начинаться с #, состоять из букв/цифр и быть не длиннее 20 символов.`;
      return false;
    }
  }

  // Если все проверки пройдены
  return true;
}, () => errorMessage, 2, false); // `false` в конце означает, что валидация запускается при отправке


// 4. Обработка отправки формы
uploadForm.addEventListener('submit', (evt) => {
  // Предотвращаем стандартную отправку
  evt.preventDefault();

  // Запускаем валидацию
  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма валидна! Отправляем...');
  } else {
    console.log('Форма невалидна. Проверьте ошибки.');
  }
});

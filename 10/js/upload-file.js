import {isEscapeKey} from './util';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const buttonCancel = form.querySelector('.img-upload__cancel');
const previewImg = form.querySelector('.img-upload__preview img');
const inputFile = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const effectsLevel = form.querySelector('.img-upload__effect-level');
const scale = form.querySelector('.scale');
const scaleInput = scale.querySelector('.scale__control--value');
const description = form.querySelector('.text__description');
const hashtagsElem = form.querySelector('.text__hashtags');
const scaleValueMax = 100;
let scaleValueCurrent = scaleValueMax;
const scaleValueStep = 25;

// Function declarations
function closeUploadForm() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  // Reset effects
  effectsLevel.value = '';
  previewImg.style.filter = 'none';
  effectsLevel.classList.add('hidden');

  // Reset scale
  scaleValueCurrent = scaleValueMax;
  scaleInput.value = `${scaleValueMax}%`;
  previewImg.style.scale = `${scaleValueMax}%`;

  // Reset form fields
  form.reset();

  // Clear file input
  inputFile.value = '';

  document.removeEventListener('keydown', onEscKeydown);
}

function onEscKeydown(evt) {
  if(isEscapeKey(evt)){
    if(document.activeElement === description || document.activeElement === hashtagsElem){
      return;
    }
    if(document.querySelector('.error')){
      return;
    }
    evt.preventDefault();
    closeUploadForm();
  }
}

inputFile.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  effectsLevel.classList.add('hidden');
  document.addEventListener('keydown', onEscKeydown);
});

buttonCancel.addEventListener('click', () => {
  closeUploadForm();
});

const resizeImage = (value) => {
  scaleInput.value = `${value}%`;
  previewImg.style.scale = `${value}%`;
};

scale.addEventListener('click', (evt) => {
  if(evt.target.closest('.scale__control--smaller') && scaleValueCurrent > 25) {
    scaleValueCurrent -= scaleValueStep;
    resizeImage(scaleValueCurrent);
  }
  if(evt.target.closest('.scale__control--bigger') && scaleValueCurrent < 100) {
    scaleValueCurrent += scaleValueStep;
    resizeImage(scaleValueCurrent);
  }
});
export {closeUploadForm};

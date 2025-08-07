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
let scaleValue = 100;
const scaleValueStep = 25;

const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    if(document.activeElement === description || document.activeElement === hashtagsElem){
      return;
    }
    evt.preventDefault();
    closeUploadForm();
  }
};

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown',onEscKeydown);
  form.reset();
};

inputFile.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  effectsLevel.classList.add('hidden');
  effectsLevel.value = '';
  previewImg.style.filter = 'none';
  scaleValue = 100;
  previewImg.style.scale = scaleInput.value;
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
  if(evt.target.closest('.scale__control--smaller') && scaleValue > 25) {
    scaleValue -= scaleValueStep;
    resizeImage(scaleValue);
  }
  if(evt.target.closest('.scale__control--bigger') && scaleValue < 100) {
    scaleValue += scaleValueStep;
    resizeImage(scaleValue);
  }
});

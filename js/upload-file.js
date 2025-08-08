import {isEscapeKey} from './util';
import {resetValidation} from './validate-form';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

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
const effectsPreview = form.querySelectorAll('.effects__preview');
const scaleValueMax = 100;
const scaleValueStep = 25;
let scaleValueCurrent = 100;


function closeUploadForm() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  effectsLevel.value = '';
  previewImg.style.filter = 'none';
  effectsLevel.classList.add('hidden');

  scaleInput.setAttribute('value',`${scaleValueMax}%`) ;
  previewImg.style.transform = `scale(${scaleValueMax}%)`;

  form.reset();

  inputFile.value = '';
  resetValidation();
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
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(`.${ext}`));
  if (matches) {
    previewImg.src = URL.createObjectURL(file);
    effectsPreview.forEach((effect) => {
      effect.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

  overlay.classList.remove('hidden');

  body.classList.add('modal-open');
  effectsLevel.classList.add('hidden');
  document.addEventListener('keydown', onEscKeydown);
});

buttonCancel.addEventListener('click', () => {
  closeUploadForm();
});

const resizeImage = (value) => {
  scaleInput.setAttribute('value', `${value}%`);
  previewImg.style.transform = `scale(${value}%)`;
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

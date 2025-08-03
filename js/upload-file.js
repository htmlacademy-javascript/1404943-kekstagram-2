const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadButtonCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadPreviewImg = uploadForm.querySelector('.img-upload__preview img');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const effectsLevel = uploadForm.querySelector('.img-upload__effect-level');
const scale = uploadForm.querySelector('.scale');
const scaleInput = scale.querySelector('.scale__control--value');
let scaleValue = 100;
const scaleValueStep = 25;

const resizeImage = (value) => {
  scaleInput.value = `${value}%`;
  uploadPreviewImg.style.scale = `${value}%`;
};

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  effectsLevel.classList.add('hidden');
});

uploadButtonCancel.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.change = '';
});

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

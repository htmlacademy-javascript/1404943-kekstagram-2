const slider = document.querySelector('.img-upload__effect-level');
const effects = document.querySelector('.img-upload__effects');
// const noEffectElement = effects.querySelector('#effect-none');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 1,
  connect: 'lower',
  tooltips: true,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effects.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  if(effect !== 'none') {
    slider.classList.remove('hidden');
  } else {
    slider.classList.add('hidden');
  }
  switch (effect){
    case 'chrome':
      console.log(1);
      break;
    case 'sepia':
      console.log(2);
      break;
  }
});

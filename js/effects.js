const slider = document.querySelector('.img-upload__effect-level');
const effects = document.querySelector('.img-upload__effects');
const effectLevelInput = document.querySelector('.effect-level__value');
const img = document.querySelector('.img-upload__preview img');
const dataSlider = [
  {
    name: 'none',
    filter: 'none',
  },{
    name: 'chrome',
    filter: 'grayscale',
    units: '',
    setting: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  {
    name: 'sepia',
    filter: 'sepia',
    units: '',
    setting: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  {
    name: 'marvin',
    filter: 'invert',
    units: '%',
    setting: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }
  },
  {
    name: 'phobos',
    filter: 'blur',
    units: 'px',
    setting: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
  {
    name: 'heat',
    filter: 'brightness',
    units: '',
    setting: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
];
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
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
let effectSlider = {};
effects.addEventListener('change', (evt) => {
  const effect = evt.target.value;

  effectSlider = dataSlider.find((test) => test.name === effect);

  if(effect !== 'none') {
    slider.classList.remove('hidden');
    effectLevelInput.value = '';
  } else {
    slider.classList.add('hidden');
  }
  if(effectSlider) {
    slider.noUiSlider.updateOptions(effectSlider.setting);
  }
});

slider.noUiSlider.on('update', (values) => {
  effectLevelInput.value = values;
  if(effectSlider.filter === 'none') {
    img.style.filter = 'none';
  } else {
    img.style.filter = `${effectSlider.filter}(${values}${effectSlider.units})`;
  }
});

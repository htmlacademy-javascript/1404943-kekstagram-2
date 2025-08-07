const slider = document.querySelector('.img-upload__effect-level');
const effects = document.querySelector('.img-upload__effects');
const effectLevelInput = document.querySelector('.effect-level__value');
const previewImg = document.querySelector('.img-upload__preview img');
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
let effectSlider = {};

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


effects.addEventListener('change', (evt) => {
  const effectCurrent = evt.target.value;

  effectSlider = dataSlider.find((test) => test.name === effectCurrent);

  if(effectCurrent === 'none') {
    previewImg.style.filter = effectSlider.filter;
    effectLevelInput.value = '';
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');

    slider.noUiSlider.updateOptions(effectSlider.setting);
  }

});

slider.noUiSlider.on('update', (values) => {
  effectLevelInput.value = slider.noUiSlider.get();
  previewImg.style.filter = `${effectSlider.filter}(${values}${effectSlider.units})`;
});


const effectButtons = document.querySelectorAll('.effects__radio');
const imgPreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const slider = document.querySelector('.img-upload__effect-level');

valueElement.value = 100;

const filtersInfo = {
  none: [0, 100, 1, '', ''],
  chrome: [0, 1, 0.1, 'grayscale', ''],
  sepia: [0, 1, 0.1, 'sepia', ''],
  marvin: [0, 100, 1, 'invert', '%'],
  phobos: [0, 3, 0.1, 'blur', 'px'],
  heat: [0, 3, 0.1, 'brightness', '']
};

const filterOptions = (filterName, filterInfo) => {
  slider.style.display = 'block';
  imgPreview.classList.add(`effects__preview--${filterName}`);

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filterInfo[0],
      max: filterInfo[1],
    },
    start: filterInfo[1],
    step: filterInfo[2],
  });

  if (filterName !== 'none') {
    imgPreview.style.filter = `${filterInfo[3]}(${filterInfo[1] + filterInfo[4]})`;
  }

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `${filterInfo[3]}(${valueElement.value + filterInfo[4]})`;
  });
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
});

const filterEditor = () => {
  effectButtons.forEach((effectButton) => {
    effectButton.addEventListener('change', () => {
      imgPreview.classList = ['img-upload__preview'];
      const filterName = effectButton.value;
      filterOptions(filterName, filtersInfo[filterName]);
      if (imgPreview.classList.contains('effects__preview--none')) {
        slider.style.display = 'none';
        imgPreview.style.filter = '';
      }
    });
  });
};

export {filterEditor, slider};

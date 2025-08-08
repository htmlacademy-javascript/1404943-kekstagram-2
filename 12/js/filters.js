import {renderPhotos} from './render-photos';
const imgFilters = document.querySelector('.img-filters');
const RANDOM_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(RANDOM_COUNT, shuffled.length));
};

const sortByComments = (photos) =>
  photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const filterPhotos = (photos, callback) => {

  imgFilters.classList.remove('img-filters--inactive');

  const debouncedCallback = debounce(callback, DEBOUNCE_DELAY);

  imgFilters.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.img-filters__button');
    const activeButton = imgFilters.querySelector('.img-filters__button--active');
    let filteredPhotos;

    if (!targetElement) {
      return;
    }

    if (!targetElement.classList.contains('img-filters__button--active')) {
      activeButton.classList.remove('img-filters__button--active');
      targetElement.classList.add('img-filters__button--active');
    }

    if (targetElement.id === 'filter-default') {
      filteredPhotos = photos.slice();
    } else if (targetElement.id === 'filter-random') {
      filteredPhotos = getRandomPhotos(photos);
    } else if (targetElement.id === 'filter-discussed') {
      filteredPhotos = sortByComments(photos);
    }

    debouncedCallback(filteredPhotos);
  });
};

const reRenderPhotos = (filteredPhotos) => {
  renderPhotos(filteredPhotos);
};

export {filterPhotos, reRenderPhotos};

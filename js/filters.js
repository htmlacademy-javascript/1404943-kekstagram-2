import {renderPhotos} from './render-photos';
import {debounce, getRandomElements} from './util';

const RANDOM_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');

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
      filteredPhotos = getRandomElements(photos, RANDOM_COUNT);
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

const ALERT_SHOW_TIME = 5000;
const errorLoadDataTemplate = document.querySelector('#data-error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const errorArea = errorLoadDataTemplate.cloneNode(true).content.querySelector('.data-error');

  document.body.append(errorArea);

  setTimeout(() => {
    errorArea.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const getRandomElements = (array, count) => {
  const shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export { isEscapeKey, showAlert, debounce, getRandomElements};

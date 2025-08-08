import {isEscapeKey} from './util';

const COUNT_STEP = 5;

const body = document.body;
const picturesWrapper = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const countLikes = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const visibleCountComment = bigPicture.querySelector('.social__comment-shown-count');
const totalCountComment = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

let commentsArray = [];
let countVisibleComments = 0;

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const visibleComments = commentsArray.slice(countVisibleComments, countVisibleComments + COUNT_STEP);

  visibleComments.forEach(({name, avatar, message}) => {
    const commentTemplate = commentElement.cloneNode(true);
    const avatarImg = commentTemplate.querySelector('.social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    fragment.appendChild(commentTemplate);
  });

  commentsList.appendChild(fragment);
  countVisibleComments += visibleComments.length;

  visibleCountComment.textContent = countVisibleComments;

  if (countVisibleComments >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const createBigPicture = (id, photosList) => {
  const photoData = photosList.find((photo) => photo.id === id);
  if (!photoData) {
    return;
  }
  const {url, comments, likes, description} = photoData;

  commentsList.innerHTML = '';
  countVisibleComments = 0;
  commentsArray = comments;
  commentsLoader.classList.remove('hidden');

  bigPictureImg.src = url;
  countLikes.textContent = likes;
  totalCountComment.textContent = comments.length;
  pictureCaption.textContent = description;

  renderComments();

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onEscKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const openBigPicture = (photosList) => {
  picturesWrapper.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.picture');
    if (targetElement) {
      evt.preventDefault();
      const idPicture = Number(targetElement.dataset.id);
      createBigPicture(idPicture, photosList);
    }
  });
};

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};

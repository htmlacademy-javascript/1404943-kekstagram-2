import {isEscapeKey} from './util';
import {photosList} from './render-photos';
const body = document.body;
const picturesWrapper = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const countLikes = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const visibleCountComment = bigPicture. querySelector('.social__comment-shown-count');
const totalCountComment = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const COUNT_STEP = 5;
let countVisibleComments = 0;
let visibleComments = [];
let commentsArray = [];
commentsList.innerHTML = '';


const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderComments = () => {
  visibleComments = commentsArray.slice(countVisibleComments, countVisibleComments + COUNT_STEP);
  const commentListTemplate = document.createDocumentFragment();
  visibleComments.forEach(({name, avatar, message}) => {
    const commentTemplate = commentElement.cloneNode(true);
    const avatarImg = commentTemplate.querySelector('.social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    commentListTemplate.appendChild(commentTemplate);
  });
  countVisibleComments += COUNT_STEP;

  visibleCountComment.textContent = Math.min(countVisibleComments, commentsArray.length);
  if(countVisibleComments >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
  }
  return commentsList.appendChild(commentListTemplate);
};

const createBigPicture = (id) => {
  const {url, comments,likes, description} = photosList.find((photo) => photo.id === id);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  commentsArray = comments;
  renderComments();
  commentsLoader.addEventListener('click', renderComments);

  bigPictureImg.src = url;
  countLikes.textContent = likes;
  totalCountComment.textContent = comments.length;
  pictureCaption.textContent = description;

  document.addEventListener('keydown', onEscKeydown);
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  commentsList.innerHTML = '';
  countVisibleComments = 0;
  visibleComments = [];
  commentsLoader.classList.remove('hidden');
};

bigPictureClose.addEventListener('click', ()=> {
  closeBigPicture();
});

const openBigPicture = () => {
  picturesWrapper.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.picture');
    const idPicture = Number(targetElement.dataset.id);

    if(targetElement) {
      evt.preventDefault();
      createBigPicture(idPicture);
    }
  });
};
export {openBigPicture};

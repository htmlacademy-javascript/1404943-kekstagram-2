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

const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
};

const initBigPicture = (id) => {
  const {url, comments,likes, description} = photosList.find((photo) => photo.id === id);
  const commentListTemplate = document.createDocumentFragment();

  commentsList.innerHTML = '';
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  comments.forEach(({name, avatar, message}) => {
    const commentTemplate = commentElement.cloneNode(true);
    const avatarImg = commentTemplate.querySelector('.social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    commentListTemplate.appendChild(commentTemplate);
  });
  commentsList.appendChild(commentListTemplate);
  bigPictureImg.src = url;
  countLikes.textContent = likes;
  visibleCountComment.textContent = comments.length;
  totalCountComment.textContent = comments.length;
  pictureCaption.textContent = description;
  commentsLoader.classList.add('hidden');
  visibleCountComment.classList.add('hidden');

  document.addEventListener('keydown', onEscKeydown);
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
};
const openBigPicture = () => {
  picturesWrapper.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.picture');
    const idPicture = Number(targetElement.dataset.id);

    if(targetElement) {
      evt.preventDefault();
      initBigPicture(idPicture);
    }
  });
};

bigPictureClose.addEventListener('click', ()=> {
  closeBigPicture();
});

export {openBigPicture};

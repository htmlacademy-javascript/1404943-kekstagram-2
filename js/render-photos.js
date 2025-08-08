const photosParent = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const photoListTemplate = document.createDocumentFragment();

const renderPhotos = (photosList) => {
  photosList.forEach((photo) => {
    const photoTemplate = template.cloneNode(true);
    const img = photoTemplate.querySelector('img');
    photoTemplate.dataset.id = photo.id;
    img.alt = photo.description;
    img.src = photo.url;
    photoTemplate.querySelector('.picture__comments').textContent = photo.comments.length;
    photoTemplate.querySelector('.picture__likes').textContent = photo.likes;
    photoListTemplate.append(photoTemplate);
  });
  photosParent.appendChild(photoListTemplate);
};

export {renderPhotos};

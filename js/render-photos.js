const photosParent = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const clearPhotos = () => {
  photosParent.querySelectorAll('.picture').forEach((element) => element.remove());
};

const renderPhotos = (photosList) => {
  clearPhotos();

  const photoListTemplate = document.createDocumentFragment();

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

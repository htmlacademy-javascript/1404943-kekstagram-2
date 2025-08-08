import {renderPhotos} from './render-photos';
import {openBigPicture} from './open-big-picture';
import {setUploadFormSubmit} from './validate-form';
import {closeUploadForm} from './upload-file';
import {getData} from './api';
import {showAlert} from './util';
import './upload-file';
import './effects';

getData()
  .then((photos) => {
    renderPhotos(photos);
    openBigPicture(photos);
  }).catch(() => {
    showAlert();
  });


setUploadFormSubmit(closeUploadForm);

import {getData} from './api';
import {showAlert} from './util';
import {renderPhotos} from './render-photos';
import {openBigPicture} from './open-big-picture';
import {setUploadFormSubmit} from './validate-form';
import {closeUploadForm} from './upload-file';
import {filterPhotos, reRenderPhotos} from './filters';
import './upload-file';
import './effects';


getData()
  .then((photos) => {
    renderPhotos(photos);
    openBigPicture(photos);
    filterPhotos(photos, reRenderPhotos);
  })
  .catch(() => {
    showAlert();
  });


setUploadFormSubmit(closeUploadForm);

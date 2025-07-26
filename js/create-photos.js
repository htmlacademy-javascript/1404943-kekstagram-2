import {createIdGenerator, createRandomIdFromRangeGenerator, getRandomArrayIndex, getRandomInteger} from './util';
import {comments} from './create-comments';
import {COUNT_PHOTO, DESCRIPTION, MAX_COUNT_LIKES, MIN_COUNT_LIKES} from './data';

const photoId = createIdGenerator();
const photoUrlId = createRandomIdFromRangeGenerator(1, COUNT_PHOTO);

const createPhotos = () => ({
  id: photoId(),
  url: `photos/${photoUrlId()}.jpg`,
  description: getRandomArrayIndex(DESCRIPTION),
  likes:getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: comments(),
});
export const createPhotos = () =>Array.from({length: COUNT_PHOTO}, createPhotos);

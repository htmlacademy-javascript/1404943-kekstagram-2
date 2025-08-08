import {getRandomInteger, getRandomArrayIndex, createIdGenerator} from './util';
import {createMessage} from './create-message';
import {COUNT_AVATARS, MAX_COUNT_COMMENTS, MESSAGES, MIN_COUNT_COMMENTS, NAMES,} from './data';
const commentId = createIdGenerator();
const createComments = () => {
  const id = commentId();
  return {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATARS)}.svg`,
    message: createMessage(MESSAGES),
    name: getRandomArrayIndex(NAMES)
  };
};
const comments = ()=> Array.from({length: getRandomInteger(MIN_COUNT_COMMENTS,MAX_COUNT_COMMENTS)}, createComments);
export {comments};

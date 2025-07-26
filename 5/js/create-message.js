import {getRandomInteger, createRandomIdFromRangeGenerator} from './util';

const createMessage = (messagesArray) => {
  const count = getRandomInteger(1, 2);
  const index = createRandomIdFromRangeGenerator(0, messagesArray.length - 1);
  const message = [];
  for(let i = 1; i <= count; i++) {
    message.push(messagesArray[index()]);
  }
  return message.join(' ');
};
export {createMessage};

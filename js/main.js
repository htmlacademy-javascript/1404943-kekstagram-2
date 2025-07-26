const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if(previousValues.length >= (max - min + 1)){
      return null;
    }
    while (previousValues.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};
const getRandomArrayIndex = (array) => array[getRandomInteger(0, array.length - 1)];
const DESCRIPTION = [
  'Застывший момент красоты.',
  'Истории, рассказанные светом и тенью.',
  'Каждый кадр – это новый взгляд.',
  'Вдохновение в деталях.',
  'Поймано мгновение, пойман смысл.',
  'Когда изображение говорит больше тысячи слов.',
  'Гармония в объективе.',
  'Отражение мира вокруг нас.',
  'Взгляд, полный эмоций.',
  'Путешествие в одном снимке.'
];
const NAMES = [
  'Александр',
  'София',
  'Максим',
  'Анна',
  'Дмитрий',
  'Екатерина',
  'Иван',
  'Ольга',
  'Михаил',
  'Анастасия'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const photoId = createIdGenerator();
const commentId = createIdGenerator();
const photoUrlId = createRandomIdFromRangeGenerator(1, 25);
const createMessage = (messagesArray) => {
  const count = getRandomInteger(1, 2);
  const index = createRandomIdFromRangeGenerator(0, messagesArray.length - 1);
  const message = [];
  for(let i = 1; i <= count; i++) {
    message.push(messagesArray[index()]);
  }
  return message.join(' ');
};
const createComments = () => {
  const id = commentId();
  return {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(MESSAGES),
    name: getRandomArrayIndex(NAMES)
  };
};
const comments = ()=> Array.from({length: getRandomInteger(0,30)}, createComments);
const createPhoto = () => ({
  id: photoId(),
  url: `photos/${photoUrlId()}.jpg`,
  description: getRandomArrayIndex(DESCRIPTION),
  likes:getRandomInteger(15, 200),
  comments: comments(),
});

const photos = Array.from({length: 25}, createPhoto);

console.log(photos);

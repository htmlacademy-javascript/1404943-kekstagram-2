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

export {getRandomInteger, createIdGenerator,createRandomIdFromRangeGenerator, getRandomArrayIndex};

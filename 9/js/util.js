const getRandomInt = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const randomUniqNumber = (from, to) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInt(from, to);
    if (previousValues.length >= (to - from + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${  from  } до ${  to}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(from, to);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomElement = (list) => list[getRandomInt(1, list.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

// const checkLength = (checkedString, maxLength) => checkedString.length <= maxLength;

export {getRandomInt, randomUniqNumber, isEscapeKey, getRandomElement};

// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  let random;
  if (min >= 0 && max >= 0) {
    if (min <= max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      random = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  return random;
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomIntInclusive, getRandomArrayElement, debounce};

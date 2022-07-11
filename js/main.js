const DESCRIPTION = ['описание 1', 'описание 2'];

let idPhoto = [1, 2];

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

const verifyStrLength = (str, maxLength) => {
  let verify = false;
  if (str.length <= maxLength) {
    verify = true;
  }
  return verify;
};

const createPhotos = () => (
  {
    id: idPhoto[0],
    url: `photos/${  idPhoto[0]  }.jpg`,
    description: '',
    likes: '',
    comments:
      {
        id: 135,
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Артём',
      }
  }
);

console.log(createPhotos());

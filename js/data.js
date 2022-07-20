import {getRandomIntInclusive, getRandomArrayElement} from '/js/util.js';

const PHOTO_AMOUNT_MAX = 25;
const LIKES_AMOUNT = [15, 200];
const AVATAR_AMOUNT_MAX = 6;
const COMMENTS_AMOUNT_MAX = 15;
const DESCRIPTION = [
  'описание 1',
  'описание 2',
  'описание 3',
  'описание 4',
  'описание 5',
];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAME = [
  'Артем',
  'Рома',
  'Оксана',
  'Аня',
  'Кекс',
  'Рудольф',
];

const idPhoto = [];
const idComments = [];
const idCommentsAmountMax = COMMENTS_AMOUNT_MAX * PHOTO_AMOUNT_MAX;

const createId = (idStr, min, max) => {
  let randomId = getRandomIntInclusive(min, max);
  while (idStr.includes(randomId) === true) {
    randomId = getRandomIntInclusive(min, max);
  }
  idStr.push(randomId);
  return idStr[idStr.length - 1];
};

const createComments = () => (
  {
    id: createId(idComments, 1, idCommentsAmountMax),
    avatar: `img/avatar-${  getRandomIntInclusive(1, AVATAR_AMOUNT_MAX)  }.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME),
  }
);

const createPhoto = () => (
  {
    id: createId(idPhoto, 1, PHOTO_AMOUNT_MAX),
    url: `photos/${  idPhoto[idPhoto.length - 1]  }.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomIntInclusive(LIKES_AMOUNT[0], LIKES_AMOUNT[1]),
    comments: Array.from({length: getRandomIntInclusive(1, COMMENTS_AMOUNT_MAX)}, createComments)
  }
);

const createAlbum = () => (Array.from({length: PHOTO_AMOUNT_MAX}, createPhoto));

export {createAlbum};

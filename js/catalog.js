import {getData} from './api.js';
import {makeBigPicture} from './picture.js';
import {makeErrorMessage} from './form.js';
import {getRandomIntInclusive, debounce} from './util.js';

const RERENDER_DELAY = 500;
const FILTER_RANDOM_LENGTH = 10;

const similarListPictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const imgFilters = document.querySelector('.img-filters');
const buttonFilterRandom = imgFilters.querySelector('#filter-random');
const buttonFilterComments = imgFilters.querySelector('#filter-discussed');
const buttonFilterDefault = imgFilters.querySelector('#filter-default');

let filterRandomOn = false;
let filterCommentsOn = false;

const makeImgFilter = (cb) => {
  buttonFilterRandom.addEventListener('click', () => {
    filterRandomOn = true;
    filterCommentsOn = false;
    imgFilters.querySelectorAll('.img-filters__button').forEach((elm) => {
      elm.classList.remove('img-filters__button--active');
    });
    buttonFilterRandom.classList.add('img-filters__button--active');
    cb();
  });

  buttonFilterComments.addEventListener('click', () => {
    filterRandomOn = false;
    filterCommentsOn = true;
    imgFilters.querySelectorAll('.img-filters__button').forEach((elm) => {
      elm.classList.remove('img-filters__button--active');
    });
    buttonFilterComments.classList.add('img-filters__button--active');
    cb();
  });

  buttonFilterDefault.addEventListener('click', () => {
    filterRandomOn = false;
    filterCommentsOn = false;
    imgFilters.querySelectorAll('.img-filters__button').forEach((elm) => {
      elm.classList.remove('img-filters__button--active');
    });
    buttonFilterDefault.classList.add('img-filters__button--active');
    cb();
  });
};

const getRandomMassiveInt = () => {
  const random = getRandomIntInclusive(0, 2);
  return random - 1;
};

const createSimilarPictures = (similarPictures) => {
  const similarListFragment = document.createDocumentFragment();
  let similarPicturesLength = similarPictures.legth;
  if (filterRandomOn) {
    similarPicturesLength = FILTER_RANDOM_LENGTH;
  }

  similarPictures
    .slice()
    .sort((a, b) => {
      let elm;
      if (!filterRandomOn && !filterCommentsOn) {
        elm = 0;
      }
      if (filterRandomOn) {
        elm = getRandomMassiveInt();
      }
      if (filterCommentsOn) {
        if (a.comments.length < b.comments.length) {
          elm = 1;
        }
        if (a.comments.length > b.comments.length) {
          elm = -1;
        }
        if (a.comments.length === b.comments.length) {
          elm = 0;
        }
      }
      return elm;
    })
    .slice(0, similarPicturesLength)
    .forEach((picture) => {
      const pictureElement = similarPictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = picture.url;
      pictureElement.querySelector('.picture__likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
      pictureElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        makeBigPicture(bigPicture, picture);
      });
      similarListFragment.appendChild(pictureElement);
    });

  imgFilters.classList.add('img-filters--inactive');
  similarListPictures.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  similarListPictures.appendChild(similarListFragment);
  imgFilters.classList.remove('img-filters--inactive');
};

getData((similarPictures) => {
  createSimilarPictures(similarPictures);
  makeImgFilter(debounce(
    () => createSimilarPictures(similarPictures),
    RERENDER_DELAY));
},
(errorMessage) => {
  makeErrorMessage(errorMessage);
});

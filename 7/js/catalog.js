import {createAlbum} from './data.js';
import {makeBigPicture} from './picture.js';

const similarListPictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const similarPictures = createAlbum();

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach((picture) => {
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

similarListPictures.appendChild(similarListFragment);


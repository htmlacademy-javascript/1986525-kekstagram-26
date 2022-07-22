import {managePictureModal} from './picture-modal.js';

const makeBigPicture = (containerPicture, picture) => {
  const bigPictureImg = containerPicture.querySelector('.big-picture__img').querySelector('img');

  const socialComments = containerPicture.querySelector('.social__comments');
  const socialCommentTemplate = socialComments.querySelector('li');
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  const similarCommentsFragment = document.createDocumentFragment();

  picture.comments.forEach(({avatar, message, name}) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;
    similarCommentsFragment.append(socialComment);
  });

  socialComments.append(similarCommentsFragment);
  bigPictureImg.src = picture.url;
  containerPicture.querySelector('.likes-count').textContent = picture.likes;
  containerPicture.querySelector('.comments-count').textContent = picture.comments.length;
  containerPicture.querySelector('.social__caption').textContent = picture.description;

  managePictureModal(containerPicture);
};

export {makeBigPicture};

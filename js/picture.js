import {managePictureModal} from './util.js';

const COMMENTS_AMOUNT = 5;

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
    socialComment.classList.add('hidden');
    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;
    similarCommentsFragment.append(socialComment);
  });

  socialComments.append(similarCommentsFragment);

  let commentsOpenLength = COMMENTS_AMOUNT;
  let commentsOpenFull = false;

  const makeSocialLoader = () => {
    if (!commentsOpenFull){
      document.querySelector('.comments-loader').classList.remove('hidden');
      if (picture.comments.length <= commentsOpenLength) {
        commentsOpenLength = picture.comments.length;
        commentsOpenFull = true;
        document.querySelector('.comments-loader').classList.add('hidden');
      }

      for (let i = 0; i < commentsOpenLength; i++) {
        socialComments.children[i].classList.remove('hidden');
      }
      containerPicture.querySelector('.comments-count-is').textContent = commentsOpenLength;
      commentsOpenLength += COMMENTS_AMOUNT;
    }
  };

  makeSocialLoader();
  document.querySelector('.comments-loader').addEventListener('click', makeSocialLoader);

  bigPictureImg.src = picture.url;
  containerPicture.querySelector('.likes-count').textContent = picture.likes;
  containerPicture.querySelector('.comments-count').textContent = picture.comments.length;
  containerPicture.querySelector('.social__caption').textContent = picture.description;

  managePictureModal(containerPicture);
};

export {makeBigPicture};

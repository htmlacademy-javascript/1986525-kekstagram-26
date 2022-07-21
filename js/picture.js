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

  containerPicture.classList.remove('hidden');
  containerPicture.querySelector('.social__comment-count').classList.add('hidden');
  containerPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  containerPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    containerPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      containerPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export {makeBigPicture};

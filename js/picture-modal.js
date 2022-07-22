const managePictureModal = (containerPicture) => {
  const onPopupEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      containerPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');

      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  containerPicture.classList.remove('hidden');
  containerPicture.querySelector('.social__comment-count').classList.add('hidden');
  containerPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  containerPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    containerPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  document.addEventListener('keydown', onPopupEscKeydown);
};

export {managePictureModal};

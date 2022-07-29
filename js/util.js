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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const managePictureModal = (containerPicture) => {
  const onPopupEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      containerPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');

      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  containerPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  containerPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    containerPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  document.addEventListener('keydown', onPopupEscKeydown);
};

export {getRandomIntInclusive, debounce, managePictureModal};

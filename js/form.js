const uploadSelectImg = document.querySelector('#upload-select-image');

const pristine = new Pristine(uploadSelectImg, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const imgUploadInput = uploadSelectImg.querySelector('#upload-file');
const imgUploadOverlay = uploadSelectImg.querySelector('.img-upload__overlay');
const uploadCancel = uploadSelectImg.querySelector('#upload-cancel');
const textDecription = uploadSelectImg.querySelector('.text__description');
const textHashtags = uploadSelectImg.querySelector('.text__hashtags');
const re = /#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;

const hashtagFoo = (value) => {
  let textError = true;
  const hashtags = value.split(' ');
  hashtags.forEach((element) => {
    if (!re.test(element)) {
      textError = false;
    }
  });

  if(value === '') {
    textError = true;
  }

  return textError;
};

const hashtagFooRep = (value) => {
  const hashtags = value.split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toUpperCase() === hashtags[j].toUpperCase()) {return false;}
    }
  }

  return true;
};

const hashtagFooMax = (value) => {
  let textError = true;
  const hashtags = value.split(' ');
  if (hashtags.length > 5) {
    textError = false;
  }

  return textError;
};

pristine.addValidator(textHashtags, hashtagFoo, 'Неправильный формат хештега');
pristine.addValidator(textHashtags, hashtagFooMax, 'Максимум 5 хештегов');
pristine.addValidator(textHashtags, hashtagFooRep, 'Хештеги повторяются');

const onPopupEscKeydown = (evt) => {
  if (evt.keyCode === 27 && textDecription !== document.activeElement && textHashtags !== document.activeElement) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadSelectImg.reset();
    pristine.reset();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

imgUploadInput.addEventListener('input', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadCancel.addEventListener('click', () => {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    pristine.reset();
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  document.addEventListener('keydown', onPopupEscKeydown);

  uploadSelectImg.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
});

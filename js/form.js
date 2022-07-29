import {sendData} from './api.js';
import {isEscapeKey, getUpercaseDataArray} from './util.js';

const CONTROL_VALUE_MAX = 100;
const CONTROL_VALUE_MIN = 25;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASGHTAG_AMOUNT_MAX = 5;

const re = /#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;

const uploadSelectImg = document.querySelector('#upload-select-image');
const imgUploadPreview = uploadSelectImg.querySelector('.img-upload__preview').children[0];
const effectLevelSlider = uploadSelectImg.querySelector('.effect-level__slider');
const scaleControl = uploadSelectImg.querySelector('.img-upload__scale');
const scaleControlSmaller = uploadSelectImg.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadSelectImg.querySelector('.scale__control--bigger');
const scaleControlValue = uploadSelectImg.querySelector('.scale__control--value');
const submitButton = uploadSelectImg.querySelector('.img-upload__submit');
const imgUploadInput = uploadSelectImg.querySelector('#upload-file');
const imgUploadOverlay = uploadSelectImg.querySelector('.img-upload__overlay');
const uploadCancel = uploadSelectImg.querySelector('#upload-cancel');
const textDecription = uploadSelectImg.querySelector('.text__description');
const textHashtags = uploadSelectImg.querySelector('.text__hashtags');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let controlValue = CONTROL_VALUE_MAX;

const makeScaleControl = (evt) => {
  if (evt.target === scaleControlSmaller && controlValue > CONTROL_VALUE_MIN) {
    controlValue -= CONTROL_VALUE_MIN;
  }
  if (evt.target === scaleControlBigger && controlValue < CONTROL_VALUE_MAX) {
    controlValue += CONTROL_VALUE_MIN;
  }
  if (evt === scaleControlValue) {
    controlValue = CONTROL_VALUE_MAX;
  }
  scaleControlValue.value = `${controlValue}%`;
  imgUploadPreview.style.cssText += `transform: scale(${controlValue / 100})`;
};

makeScaleControl(scaleControlValue);

const makeEffects = () => {
  const effectsRadioFirst = uploadSelectImg.querySelector('.effects__radio');
  const effectsRadio = uploadSelectImg.querySelector('.img-upload__effects');
  const effectLevel = uploadSelectImg.querySelector('.effect-level');
  const effectLevelValue = uploadSelectImg.querySelector('.effect-level__value');

  effectLevelValue.value = '';
  effectLevel.classList.add('hidden');

  effectsRadioFirst.checked = true;
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.removeProperty('filter');

  const makeEffectRadio = (evt) => {
    if (evt.target.value === 'chrome') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get();
        imgUploadPreview.style.cssText += `filter: grayscale(${effectLevelSlider.noUiSlider.get()});`;
      });
    }
    if (evt.target.value === 'sepia') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get();
        imgUploadPreview.style.cssText += `filter: sepia(${effectLevelSlider.noUiSlider.get()});`;
      });
    }
    if (evt.target.value === 'marvin') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get();
        imgUploadPreview.style.cssText += `filter: invert(${effectLevelSlider.noUiSlider.get()}%);`;
      });
    }
    if (evt.target.value === 'phobos') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get();
        imgUploadPreview.style.cssText += `filter: blur(${effectLevelSlider.noUiSlider.get()}px);`;
      });
    }
    if (evt.target.value === 'heat') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get();
        imgUploadPreview.style.cssText += `filter: brightness(${effectLevelSlider.noUiSlider.get()});`;
      });
    }

    if (evt.target.value !== 'none') {
      effectLevel.classList.remove('hidden');
      imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
    } else {
      effectLevelValue.value = '';
      imgUploadPreview.removeAttribute('class');
      imgUploadPreview.style.removeProperty('filter');
      effectLevelValue.value = '';
      effectLevel.classList.add('hidden');
    }
  };

  effectsRadio.addEventListener('input', makeEffectRadio);
};

const pristine = new Pristine(uploadSelectImg, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const checkHashtag = (value) => {
  let textError = true;
  const hashtags = value.split(/\s+/);
  if (hashtags[0] === '') {
    hashtags.shift();
  }
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

const checkHashtagRep = (value) => {
  const hashtags = value.split(/\s+/);
  if (hashtags[0] === '') {
    hashtags.shift();
  }
  const hashtagUper = new Set (hashtags.map(getUpercaseDataArray));
  if (hashtags.length !== hashtagUper.size) {
    return false;
  }

  return true;
};

const checkHashtagMax = (value) => {
  let textError = true;
  const hashtags = value.split(/\s+/);
  if (hashtags[0] === '') {
    hashtags.shift();
  }
  if (hashtags.length > HASGHTAG_AMOUNT_MAX) {
    textError = false;
  }

  return textError;
};

pristine.addValidator(textHashtags, checkHashtag, 'Неправильный формат хештега');
pristine.addValidator(textHashtags, checkHashtagMax, 'Максимум 5 хештегов');
pristine.addValidator(textHashtags, checkHashtagRep, 'Хештеги повторяются');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && textDecription !== document.activeElement && textHashtags !== document.activeElement) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    scaleControl.removeEventListener('click', makeScaleControl);

    uploadSelectImg.reset();
    pristine.reset();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const makeSuccessMessage = () => {
  const successPictureTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successPictureTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      successElement.remove();
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onMessageEscKeydown);
    }
  };

  imgUploadOverlay.classList.add('hidden');

  scaleControl.removeEventListener('click', makeScaleControl);

  uploadSelectImg.reset();
  pristine.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);

  successButton.addEventListener('click', () => {
    successElement.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onMessageEscKeydown);
  });

  successElement.addEventListener('click', (evt) => {
    const targed = evt.path[0];
    if (targed.tagName === 'SECTION') {
      successElement.remove();
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onMessageEscKeydown);
    }
  });

  document.addEventListener('keydown', onMessageEscKeydown);

  document.body.appendChild(successElement);
};


const makeErrorMessage = (errorText) => {
  const errorPictureTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorPictureTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  document.body.classList.add('modal-open');

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      errorElement.remove();

      if (errorText === 'Ошибка запроса к серверу') {
        document.body.classList.remove('modal-open');
      }
      uploadSelectImg.querySelector('.img-upload__overlay').classList.remove('visually-hidden');
      document.removeEventListener('keydown', onMessageEscKeydown);
    }
  };

  errorElement.querySelector('.error__title').textContent = errorText;
  errorButton.textContent = 'Ok';

  if (errorText !== 'Ошибка запроса к серверу') {
    uploadSelectImg.querySelector('.img-upload__overlay').classList.add('visually-hidden');
  }


  document.body.appendChild(errorElement);

  errorButton.addEventListener('click', () => {
    errorElement.remove();
    if (errorText === 'Ошибка запроса к серверу') {
      document.body.classList.remove('modal-open');
    }
    uploadSelectImg.querySelector('.img-upload__overlay').classList.remove('visually-hidden');
    document.removeEventListener('keydown', onMessageEscKeydown);
  });

  errorElement.addEventListener('click', (evt) => {
    const targed = evt.path[0];
    if (targed.tagName === 'SECTION') {
      if (errorText === 'Ошибка запроса к серверу') {
        document.body.classList.remove('modal-open');
      }
      errorElement.remove();
      uploadSelectImg.querySelector('.img-upload__overlay').classList.remove('visually-hidden');
      document.removeEventListener('keydown', onMessageEscKeydown);
    }
  });

  document.addEventListener('keydown', onMessageEscKeydown);
};

const makeUploadSelect = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        makeSuccessMessage();
        unblockSubmitButton();
        uploadSelectImg.removeEventListener('submit', makeUploadSelect);
      },
      () => {
        makeErrorMessage('Не удалось отправить форму');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
};

const imgUploadChooser = () => {
  const effectPreview = uploadSelectImg.querySelectorAll('.effects__preview');

  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectPreview.forEach((preview) => {
      preview.style = `background-image: url(${URL.createObjectURL(file)})`;
    });
  }
};

imgUploadInput.addEventListener('input', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  makeEffects();
  imgUploadChooser();

  scaleControl.addEventListener('click', makeScaleControl);
  makeScaleControl(scaleControlValue);

  uploadCancel.addEventListener('click', () => {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    scaleControl.removeEventListener('click', makeScaleControl);

    pristine.reset();
    uploadSelectImg.removeEventListener('submit', makeUploadSelect);
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  document.addEventListener('keydown', onPopupEscKeydown);

  uploadSelectImg.addEventListener('submit', makeUploadSelect);
});

export {makeErrorMessage};

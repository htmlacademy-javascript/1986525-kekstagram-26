const GET_DATA_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw onError;
      }
    })
    .then((album) => {
      onSuccess(album);
    })
    .catch(() => {
      onError('Ошибка запроса к серверу');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw onError;
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму');
    });
};

export {getData, sendData};

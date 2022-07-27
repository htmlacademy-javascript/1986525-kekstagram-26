const getData = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
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
    'https://26.javascript.pages.academy/kekstagram',
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

const search = (query, setQuery, setWeather, api, openModal) => {
  if (query === '') {
    return Promise.resolve({ success: false });
  }

  return fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((res) => {
      if (res.status === 404) {
        throw new Error('City not found');
      }
      return res.json();
    })
    .then((result) => {
      setQuery('');
      setWeather(result);
      console.log(result);
      return { success: true };
    })
    .catch((error) => {
      openModal();
      setQuery('');
      console.log(error);
      return { success: false };
    });
};

export default search;

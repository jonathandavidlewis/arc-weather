// Handles all API calls to the server

const axios = window.axios;

const cacheRequest = function(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

const requestIsCached = function(key) {
  const weatherData = window.localStorage.getItem(key);
  return !!weatherData;
}

const getFromCache = function(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

const weatherServiceProvider = function() { 
  const url = '/api'

  return function getWeather(query, callback) {
    const today = new Date();
    const day = (`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`)
    const dateInSeconds = new Date(day) / 1000;
    const fullPath = `${url}/${query}/${dateInSeconds}`;
    if (requestIsCached(fullPath)) {
      callback(getFromCache(fullPath));
    } else {
      axios.get(fullPath).then(res => {
        cacheRequest(fullPath, res.data);
        callback(res.data);
      })
    }
  }
}

export default weatherServiceProvider;

// Dark Sky API driver

const key = process.env.DARK_SKY_KEY;
const request = require('request-promise');

module.exports = function getWeatherByCoordinatesDay({latitude, longitude, dateTime}, callback) {
  return request(`https://api.darksky.net/forecast/${key}/${latitude},${longitude},${dateTime}`);
}


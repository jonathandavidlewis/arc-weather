// Dark Sky API driver

//call to weather api

const key = process.env.DARK_SKY_KEY;
//const request = require('request');
const request = require('request-promise');

const extractDailyWeatherData = body => body.daily.data;

module.exports = function getWeatherByCoordinatesDay({latitude, longitude, dateTime}, callback) {
  return request(`https://api.darksky.net/forecast/${key}/${latitude},${longitude},${dateTime}`);
}


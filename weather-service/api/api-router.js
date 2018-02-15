const router = require('express').Router();
const { parseLocation } = require('./parse-location');
const weatherApi = require('./weather-handler');
const secondsInADay = 86400;

const filterDailyData = function(weatherEntry) {
  return weatherEntry.daily.data[0];
}

const getDailyWeather = function({latitude, longitude, dateTime}) {
  let weekDay = parseInt(dateTime);
  const week = new Array(7).fill(1);
  const requests = week.map(function(element, index) {
    weekDay -= secondsInADay;
    return weatherApi({
      latitude,
      longitude,
      dateTime: weekDay
    })
  });
  return Promise.all(requests)
}

const getWeatherByZipcode = function(req, res) {
  const { location, dateTime } = req.params
  const { latitude, longitude, city, state } = parseLocation(location);

  getDailyWeather({latitude, longitude, dateTime})
    .then(data => {
    const weatherWeek = {};
      weatherWeek.reports = data.reverse().map(weather => filterDailyData(JSON.parse(weather)));
      weatherWeek.city = city;
      weatherWeek.state = state;
      res.send(weatherWeek)
    }).catch(err => {
      console.error(err);
  })
}

router.get('/:location/:dateTime', getWeatherByZipcode);

module.exports = { getWeatherByZipcode, router}
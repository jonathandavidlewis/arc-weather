// get location by zipcode or city name
const zipcodes = require('zipcodes');


const validateInput = function() {

}


const getCoordinates = function() {

}


const getLocationByZipcode = function(zipcode) {
  const locationDetails = zipcodes.lookup(zipcode);
  return locationDetails;
}


const getWeather = function(req, res) {
  getLocationByZipcode
}








exports.parseLocation = getLocationByZipcode;
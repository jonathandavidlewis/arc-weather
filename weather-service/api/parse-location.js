// get location by zipcode or city name

const zipcodes = require('zipcodes');

exports.parseLocation = function(zipcode) {
  const locationDetails = zipcodes.lookup(zipcode);
  return locationDetails;
}

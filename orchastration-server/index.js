const express = require('express');
const port = process.env.port || 80;
const bodyParser = require('body-parser');
const app = express();
const request = require('request-promise');
const apiServerAddress = 'http://localhost:8888'
const staticServerAddress = 'http://localhost:8080'

const morgan = require ('morgan');

app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer"'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const responseCacheProvider = function() {
  const cache = {};
  return {
    returnCached: function(req, res, next) {
      if(cache[req.url]) {
        res.send(cache[req.url]);
      } else {
        next();
      }
    },
    cacheResponse: function(requestUrl, data) {
      debugger;
      return cache[requestUrl] = data;
    }
  }
}

const responseCache = responseCacheProvider();

const redirectToWeatherService = function (req, res) {
  console.log('redirected to weather service')
  res.redirect(`${apiServerAddress}${req.originalUrl}`)
}

app.use('/api', responseCache.returnCached, (req, res) => {
  debugger;
  request(`${apiServerAddress}${req.originalUrl}`)
    .then(response => {
      debugger;
      res.send(JSON.parse(responseCache.cacheResponse(req.url, response)));
    }).catch(function(error) {
      debugger;
      res.send(error.statusCode);
    });
});

app.get('*', responseCache.returnCached, (req, res) => {
  debugger;
  request(`${staticServerAddress}${req.originalUrl}`)
    .then(response => {
      debugger;
      res.send(responseCache.cacheResponse(req.url, response))
    }).catch(function(error) {
      debugger;
      res.send(error.statusCode);

    })
});











app.listen(port);
console.log('orchastration server listening on', port)





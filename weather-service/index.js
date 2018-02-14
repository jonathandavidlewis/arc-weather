const express = require('express');
require('dotenv').config();
const zipcodes = require('zipcodes');
const port = process.env.port || 8888;
const { getWeatherByZipcode } = require('./api/api-router.js');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./api/api-router').router;

const morgan = require ('morgan');

app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer"'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.send(`<html><head><title>Something went wrong</title></head>
  <body><h1>Something went wrong</h1>
  <p>There was an error processing your request.</p>
  <p>cound not load url: ${req.url}</p>
  </body>
  </html>`);
});

app.listen(port);
console.log('app listening on', port)
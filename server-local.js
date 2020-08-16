const express = require('express');
const axios = require('axios');
const locs = require('./locations.json');

const app = express();

const weather = 'https://api.darksky.net/forecast/734380008b4832fb5da71a68d80737d4/';
// const test = 'https://api.darksky.net/forecast/734380008b4832fb5da71a68d80737d4/36.8506,-75.9779';

const location = 'https://maps.googleapis.com/maps/api/geocode/json?';
const api = 'AIzaSyC1dEid2g2vnR4-hHJvN_ZbNN1o9vOUwFI';

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });

// app.get('/', (res,req) =>  res.status(200).send('gfi'));

// app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/locs', function(req,res) {
  res.status(200).send(locs);
});

app.get('/weather', function(req,res,next){
  console.log('getting weather', req.query);
  const loc = req.query.location;
  console.log(loc);
  const url = `${weather}${loc}`;
  // axios.get('http://www.mocky.io/v2/5d30962b320000a97720460b') // Getting the data from DarkSky
  //   .then( result => res.status(200).send({succes: result}))
  //   .catch( error => res.status(400).send(error))
  axios.get(url)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  // res.status(200).send({succes: 1234});
});

app.get('/location', function(req,res,next){
  console.log('getting location', req.query);
  const loc = req.query.place;
  console.log(loc);
  if (!locs.loc) {
    locs[loc] = {
      name: [loc],
    }
  }
  const url = `${location}address=${loc}&key=${api}`;
  // axios.get('http://www.mocky.io/v2/5d30962b320000a97720460b') // Getting the data from DarkSky
  //   .then( result => res.status(200).send({succes: result}))
  //   .catch( error => res.status(400).send(error))
  axios.get(url)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  // res.status(200).send({succes: 1234});
});

app.get('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(4000, () => console.log(`Server Listening on port ${4000}!`));

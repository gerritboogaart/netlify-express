const express = require('express');
const axios = require('axios');
const locs = require('./locations.json');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'],
}));

const weather = 'https://api.darksky.net/forecast/734380008b4832fb5da71a68d80737d4/';



app.get('/locs', function(req,res) {
  res.status(200).send(locs);
});

app.get('/weather', function(req,res,next){
  const loc = req.query.location;
  const url = `${weather}${loc}`;
  axios.get(url)
  .then(function (response) {
    res.status(200).send(response.data);
  })
});

// app.get('/location', function(req,res,next){
//   const loc = req.query.place;
//   if (!locs.loc) {
//     locs[loc] = {
//       name: [loc],
//     }
//   }
//   const url = `${location}address=${loc}&key=${api}`;
//   axios.get(url)
//   .then(function (response) {
//     res.status(200).send(response.data);
//   })
//   // res.status(200).send({succes: 1234});
// });

app.get('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(4000, () => console.log(`Server Listening on port ${4000}!`));

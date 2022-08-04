// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const compression = require('compression')
const helmet = require('helmet')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(compression())
app.use(helmet())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  
  let date = req.params.date

  if (!isNaN(date)) {
    date *= 1000
  }

  if (new Date(date).toString() === "Invalid Date") {
    res.json({"error": "Invalid Date"})
    console.log(date)
    console.log(new Date(date))
    return
  }
  res.json({"unix": Math.floor(new Date(date).getTime() / 1000), "utc": new Date(date).toUTCString()})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

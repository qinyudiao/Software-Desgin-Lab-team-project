const express = require('express');
const app = express();
const fetch = require('node-fetch');
var cors = require('cors');
var country = require('./routes/country.js');

app.use('/country', country); 
app.use(cors());


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/launches', async (request, response) => {
  console.log(request.params);

  const launches_url = `https://launchlibrary.net/1.4/launch?startdate=2015-02-20&enddate=2015-09-20`;
  const launches_response = await fetch(launches_url);
  const launches_data = await launches_response.json();

  response.json(launches_data);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const date = Date.now();
  data.date = date;
  database.insert(data);
  response.json(data);
});

app.get('/history/:events', async (request, response) => {
  console.log(request.params);
  const events = request.params.events.split(',');
  console.log(events);
  const day = events[1];
  const month = events[0];
  console.log(month, day);
  const hist_url = `https://history.muffinlabs.com//date/${month}/${day}/`;
  const hist_response = await fetch(hist_url);
  const hist_data = await hist_response.json();

  const data = {
    hist: hist_data
  };
  response.json(data);
})

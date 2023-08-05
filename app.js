const express = require('express');
const mongoose = require('mongoose');
const {
  getCurrentUser,
} = require('./controllers/users-controller');

const { PORT = process.env.PORT || 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();
app.use(express.json());

app.get('/users/me', getCurrentUser);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✔ Connected to MongoDB '))
  .catch((err) => console.log(`✖ DB connection error: ${err}`));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listen port ${PORT}`);
  }
});
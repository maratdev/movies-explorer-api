const express = require('express');
const mongoose = require('mongoose');



const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();


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

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fashion_book_db');
app.get('/', (req, res) => {res.send('welcome to fashtion_book')})

app.listen(port, () => console.log("server running on port " + port));
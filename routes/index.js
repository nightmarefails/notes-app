const express = require('express');

const app = express();
const notes = require('./notes.js');

app.use('/notes', notes);

module.exports = app;
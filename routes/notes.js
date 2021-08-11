const notes = require('express').Router();
const {readFromFile, readAndAppend} = require('../utils/fsUtils');
const uuid = require('uuidv4');


notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


module.exports = notes;

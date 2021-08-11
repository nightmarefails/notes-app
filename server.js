const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.listen(port, () => {
    console.log(`Listening on Port: ${port}!`)
})
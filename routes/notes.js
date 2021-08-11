const notes = require('express').Router();
const {readFromFile, readAndAppend} = require('../utils/fsUtils');
const fs = require('fs');
const { uuid, fromString } = require('uuidv4');


notes.get('/', (req, res) => {
    console.log(`${req.method} request recieved for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.log(`${req.method} request recieved for notes`);

    const {title, text} = req.body;

    if(title && text) {

        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);

    } else {
        res.json('Error in posting new note');
    }
});

notes.delete('/:id', (req, res) => {
    console.log(`${req.method} request recieved on notes`);
    const requestedID = req.params.id

    readFromFile('./db/db.json').then(data => {
        let notesData = JSON.parse(data);
        console.log('Starting Data:', notesData);
        console.log('length:', notesData.length);
        console.log(requestedID);
        console.log(notesData[0].id);
        for(let i = 0; i < notesData.length; i++) {
            if(requestedID == notesData[i].id) {
                notesData.splice(i, 1);
            } 
        }

        console.log('Ending Data:', notesData);

        fs.writeFile('./db/db.json', `${JSON.stringify(notesData, null, 4)}`, (err) => {
            if (err) {
                console.log(err);
            }
        });

        const response = {
            status: 'success',
            body: notesData
        };

        res.json(response);
        
    })
})

module.exports = notes;

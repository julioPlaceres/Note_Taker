const path = require("path");
const fs = require('fs');
const util = require('util');
const { readAndAppend } = require('../helpers/fsUtils');

const router = require("express").Router();

// change to be called from fsUtils folder
const readFromFile = util.promisify(fs.readFile);

// define the home page route
router.get("/notes", (req, res) => {
    console.info(`${req.method} request received for the notes`);
    readFromFile('./db/db.json').then((data) => {
        console.log(data);
        res.json(JSON.parse(data));
    });
});

router.post("/notes", (req, res) => {
    console.log(req.body);
    const {title, text} = req.body;

    if(title && text){
    const newNote = {
        title,
        text
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
        status: "sucess",
        body: newNote
    };

    res.json(response);
} else{
    res.json("Error in posting note");
}
});

module.exports = router;
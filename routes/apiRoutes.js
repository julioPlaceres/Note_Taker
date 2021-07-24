const path = require("path");
const uuid = require("uuid");
const notesData = require("../db/db.json");
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const router = require("express").Router();

// Route that will read the db file and return all content
router.get("/notes", (req, res) => {
    console.info(`${req.method} request received for the notes`);
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
});

// Route that will append to the file new notes with a unique ID
router.post("/notes", (req, res) => {
    const {title, text} = req.body;

    // If Title and Text are not empty will get the values in a new object and add the unique ID property
    if(title && text){
    const newNote = {
        id: uuid.v4(),
        title,
        text
    };

    // Adds to the current db
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

// Route to delete notes, by pasing the paremeter id will loop through the db file find the note that match
// the unique identifier and delete the item at the specified index. Then will overwrite the file with the data left.
router.delete("/notes/:id", (req, res) => {
    const idSelected = req.params.id;
    if(idSelected){
        for(let i = 0; i < notesData.length; i++){
            if(idSelected == notesData[i].id){
                notesData.splice(i, 1);
                writeToFile("./db/db.json", notesData);
            }
        }
    }
    res.json(notesData);
});
module.exports = router;
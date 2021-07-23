const path = require("path");
const fs = require('fs');
const util = require('util');

const router = require("express").Router();

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

router.get("notes", (req, res) => {
    console.info(`${req.method} request received for the notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = router;
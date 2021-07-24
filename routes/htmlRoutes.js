const path = require("path");

const router = require("express").Router();

// Route to notes page html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// A wild card to catch all in case the route is not specified
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = router;
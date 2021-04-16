const db = require("../db/db");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const util = require("util");
const fs = require("fs");
const path = require("path");

//uuidv4();

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//async read func
const read = () => {
  return readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
};

//async wrtie func
const write = (notes) => {
  return writeFileAsync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes)
  );
};

//get all notes
const getNotes = function () {
  return read().then((notes) => {
    console.log("read", notes);
    return JSON.parse(notes);
  });
};

//add notes to db
const addNote = (note) => {
  const newNote = {
    id: uuidv4(),
    title: note.title,
    text: note.text,
  };

  return getNotes().then((notes) => {
    const allNotes = notes;
    allNotes.push(newNote);
    write(allNotes);
  });
};

const destroyNotes = (id) => {
  return getNotes().then((notes) => {
    const allNotes = notes;
    const updatedNotes = allNotes.filter((note) => note.id !== id);
    write(updatedNotes);
  });
};

router.get("/api/notes", function (req, res) {
  console.log("*******get route hit");
  getNotes().then((notes) => {
    return res.json(notes);
  });
});

router.post("/api/notes", function (req, res) {
  addNote(req.body).then((note) => {
    res.json(note);
  });
});

// Notes html and it's "url"
router.delete("/api/notes/:id", function (req, res) {
  destroyNotes(req.params.id).then(() => {
    res.json({ success: "note destroyed" });
  });
});

module.exports = router;

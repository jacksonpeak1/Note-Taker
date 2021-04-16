const path = require("path");
const router = require("express").Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Notes html and it's "url"
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;

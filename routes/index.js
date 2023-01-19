//api route
const fs = require("fs");
const router = require("express").Router();
const express = require("express");
const db = require("../db/db.json");
const app = express();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
router.get("/notes", (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  //return res.json(db);
});

// GET Route for a specific note
router.get("/notes/:notes_id", (req, res) => {
  const notesId = req.params.notes_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((router) => router.notes_id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// DELETE Route for a specific id
router.delete("/notes/:notes_id", (req, res) => {
  const notesId = req.params.notes_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      console.log(json);
      //Make a new array of all ids except the one with the ID provided in the URL
      const result = json.filter((dbItem) => dbItem.id !== notesId);

      //Save that array to the filesystem
      writeToFile("./db/db.json", result);

      //Respond to the DELETE request
      res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip
router.post("/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;

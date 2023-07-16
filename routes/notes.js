const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const Note = require("../models/Note");

router
  .route("/")

  // --- Get All Articles

  .get((req, res) => {
    async function getNotes() {
      const queryResult = await Note.find();

      if (queryResult.length === 0) {
        res.send("No notes currently in database.");
      } else {
        res.send(queryResult);
      }
    }

    getNotes().catch((err) => {
      console.log(err);
    });
  })

  // --- Create New Article

  .post((req, res) => {
    async function createNote() {
      const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
      });

      await newNote.save().then(() => {
        res.send("Successfully created new note.");
      });
    }

    createNote().catch((err) => {
      console.log(err);
    });
  })

  // --- Delete All Articles

  .delete((req, res) => {
    async function deleteNotes() {
      await Note.deleteMany().then(() => {
        res.send("Successfully deleted all notes.");
      });
    }

    deleteNotes().catch((err) => {
      console.log(err);
    });
  });

router
  .route("/:title")

  // --- Get Single Article

  .get((req, res) => {
    const title = req.params.title;

    async function getArticle() {
      const queryResult = await Note.findOne({ title: title });

      if (queryResult) {
        res.send(queryResult);
      } else {
        res.send("No note matches that title.");
      }
    }

    getArticle().catch((err) => {
      console.log(err);
    });
  })

  // --- Overwrite Article

  .put((req, res) => {
    const title = req.params.title;
    const update = req.body;

    async function overwriteNote() {
      const queryResult = await Note.findOne({ title: title });

      if (queryResult) {
        queryResult.overwrite(update);
        await queryResult.save().then(() => {
          res.send("Successfully updated the note.");
        });
      } else {
        res.send("No note matches that title.");
      }
    }

    overwriteNote().catch((err) => {
      console.log(err);
    });
  })

  // --- Update Article

  .patch((req, res) => {
    const title = req.params.title;
    const update = req.body;

    async function updateNote() {
      const queryResult = await Note.findOne({ title: title });

      if (queryResult) {
        if (update.title != null) {
          queryResult.title = update.title;
        }
        if (update.content != null) {
          queryResult.content = update.content;
        }

        await queryResult.save().then(() => {
          res.send("Successfully updated the note.");
        });
      } else {
        res.send("No note matches that title.");
      }
    }

    updateNote().catch((err) => {
      console.log(err);
    });
  })

  // --- Delete Single Article

  .delete((req, res) => {
    const title = req.params.title;

    async function deleteArticle() {
      await Note.deleteOne({ title: title }).then(() => {
        res.send("Successfully deleted the note.");
      });
    }

    deleteArticle().catch((err) => {
      console.log(err);
    });
  });

module.exports = router;

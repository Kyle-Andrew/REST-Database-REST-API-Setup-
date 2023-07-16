const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restfulDB");

const Note = require("./models/Note");
const notesRouter = require("./routes/notes");

app.use("/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server is running");
});

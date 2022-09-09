const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/notesDB", {useNewUrlParser:true});

const noteSchema = mongoose.Schema({
    title: String,
    description: String
});

const Note = mongoose.model("Note", noteSchema);

app.post("/", function(req, res){

    const note = new Note({
        title: req.body.title,
        description: req.body.content
    });

    note.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
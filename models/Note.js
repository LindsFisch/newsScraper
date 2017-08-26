var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var db = require ("../config/connection");

var NoteSchema = new Schema ({
 
    body: {
        type: String
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;




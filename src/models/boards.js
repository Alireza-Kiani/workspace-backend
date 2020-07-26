import mongoose from "mongoose";
import Schema from "mongoose";





//
const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId
    }]
});


//creating board model
const Board = mongoose.model("Board", boardSchema);

export default Board;
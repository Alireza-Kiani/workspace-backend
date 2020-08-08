import mongoose from "mongoose";
import Schema from "mongoose";




//
const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    motherBoard: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

const List = mongoose.model("List", listSchema);

export default List;
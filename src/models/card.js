import mongoose from "mongoose";
import Schema from "mongoose";





//
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    motherList: {
        type: Schema.Types.ObjectId,
        required: true
    }
});


//creating card model
const Card = mongoose.model("Card", cardSchema);

export default Card;
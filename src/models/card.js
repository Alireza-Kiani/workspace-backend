import mongoose from "mongoose";





//
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});


//creating card model
const Card = mongoose.model("Card", cardSchema);

export default Card;
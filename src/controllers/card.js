import Card from "../models/card.js";
import List from "../models/list.js";


class CardClass {
    createCard = async (name, content, motherList) => {
        const card = new Card({name, content, motherList});

        try {
            card.save();
            return card;
        } catch (e) {
            console.log(e)
            return {error: e};
        }
    }

    removeCard = async (_id) => {
        try {
            const card = await Card.findByIdAndDelete(_id);
            if (!card) {
                return {error: "card not found"}
            }
            else {
                return card;
            }
        } catch (e) {
            return {error: e}
        }
    }

    editCard = async (_id, name, content) => {
        try {
            const card = await Card.findById(_id);

            if (name) {
                card.name = name;
            }

            if (content) {
                card.content = content;
            }
            card.save();
            return card;
        } catch (e) {
            return e;
        }
    }
}

export default new CardClass();
import List from "../models/list.js";

class ListClass {

    findById = async (_id) => {
        return await List.findById(_id);
    }

    createList = async (name, motherBoard) => {
        const list = new List({name, motherBoard});

        try {
            list.save();
            return list;
        } catch (e) {
            console.log(e)
            return {error: e};
        }
    }

    removeList = async (_id) => {
        try {
            const list = await List.findByIdAndDelete(_id);
            if (!list) {
                return {error: "list not found"}
            }
            else {
                return list;
            }
        } catch (e) {
            return {error: e}
        }
    }

    editList = async (_id, name) => {
        try {
            const list = await List.findById(_id);
            list.name = name;
            list.save();
            return list;
        } catch (e) {
            return e;
        }
    }
}



export default new ListClass();
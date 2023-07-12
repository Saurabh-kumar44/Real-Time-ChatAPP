import Msg from "../models/messageModel.js";

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const newMsg = new Msg({
            message: { text: message },
            users: { from, to },
            sender: from,
        });

        const data = await newMsg.save();

        if (data) {
            console.log("Successfully added message.");
            return res.json({ msg: "Message added to the database successfully!" });
        } else {
            return res.json({ msg: "Failed to add message into the database!" });
        }
    } catch (ex) {
        next(ex);
    }
};

const getAllMessage = async (req, res, next) => {
    // Add your implementation for retrieving all messages here
};

export { addMessage, getAllMessage };

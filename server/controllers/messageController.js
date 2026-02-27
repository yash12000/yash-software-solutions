import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      text: req.body.text,
      sender: req.user.id,
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sender");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};
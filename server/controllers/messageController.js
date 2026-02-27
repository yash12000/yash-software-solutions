import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const message = await Message.create({
    text: req.body.text,
    sender: req.user._id,
  });

  res.json(message);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find().populate("sender");
  res.json(messages);
};
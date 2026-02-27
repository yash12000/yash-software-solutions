import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const msg = await Message.create({
    sender: req.user.id,
    receiver: req.body.receiver,
    text: req.body.text
  });
  res.json(msg);
};

export const getMessages = async (req, res) => {
  const msgs = await Message.find();
  res.json(msgs);
};
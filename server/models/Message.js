import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
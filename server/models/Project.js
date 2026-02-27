import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  status: {
    type: String,
    enum: ["Pending", "Pending Approval", "Approved", "In Progress", "Completed"],
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Project", projectSchema);
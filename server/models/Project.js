import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deadline: Date,
});

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    deadline: Date,
    tag: [String],
    subtasks: [subtaskSchema],
  },
  { timestamps: true }
);

TaskSchema.pre("Save", function (next) {
  if (this.subtasks.lengh > 0) {
    const allDone = this.subtasks.every((st) => (st.completed = true));
    this.status = allDone ? "done" : "in-progress";
  }
  next();
});

export default mongoose.model("Task", TaskSchema);

import mongoose from "mongoose";

const TaskSchema = new mongoose.model({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    description: String,
    status: {type: String, enum: ["todo, in-progress, done"], default: "todo"},
    priority: {type: String, enum: ["low, medium, high"], default: "medium"},
    deadline: Date,
    tag: [String]
}, {timestamps: true});

export default mongoose.Model("Task", TaskSchema);
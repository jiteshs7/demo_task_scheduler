const Mongoose = require("mongoose");

const { PRIORITY, STATUS } = require("../shared/Constants");

const TaskSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title of the task"],
      minLength: 2,
      maxLength: 30,
    },
    description: {
      type: String,
      required: [true, "Please enter description of the task"],
      minLength: 2,
      maxLength: 100,
    },
    dueDate: {
      type: Date,
      required: [true, "Please enter due date."],
    },
    priority: {
      type: Number,
      enum: [PRIORITY.HIGH, PRIORITY.MEDIUM, PRIORITY.LOW],
      default: PRIORITY.LOW,
    },
    status: {
      type: Number,
      enum: [
        STATUS.NOT_STARTED,
        STATUS.IN_PROGRESS,
        STATUS.COMPLETED,
        STATUS.DELETED,
      ],
      required: [true, "Please enter status for the task"],
    },
    user: {
      type: Mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    reminder: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Task", TaskSchema);

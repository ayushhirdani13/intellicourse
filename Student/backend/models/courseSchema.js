import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  students: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
});

export default courseSchema;
const Course = new mongoose.model("Course", courseSchema);
export { Course };

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    id : {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    cgpa : {
        type: Number,
        required: true,
    },
    semester : {
        type: Number,
        required : true,
    }
});

export default studentSchema;
const Student = new mongoose.model("Student", studentSchema);
export {Student};
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Student } from "./models/studentSchema.js";
import { Course } from "./models/courseSchema.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;
import path from "path";
// import {Student} from "./models/studentSchema.js"

dotenv.config();
const server = express();

// Middleware
server.use(express.json());
server.use(cookieParser());

// Serve static files (e.g., CSS, images, etc.)
server.use(express.static("../frontend/public"));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("successfully connected to MongoDB!");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const isLoggedin = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "key");

    req.user = await Student.findById(decoded._id);

    next();
  } else {
    res.redirect("/login");
  }
};

server.get("/", (req, res) => {
  res.render("../frontend/src/index.html");
});

server.post("/studentRegister", (req, res) => {
  const data = req.body;
  const plainPassword = data.password;
  console.log(data);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(plainPassword, salt, function (err, hash) {
      const stud = new Student({ ...data, password: hash });
      stud
        .save()
        .then((val) => {
          res.send({ msg: "success", data: val });
        })
        .catch((e) => {
          res.status(400).send({ msg: "failure", error: e });
        });
    });
  });
});

server.get("/register", (req, res) => {
  res.send("Register");
});

server.get("/login", (req, res) => {
  res.send("Login Page");
});

server.post("/login", (req, res) => {
  const data = req.body;

  Student.findOne({ id: data.id }).then((stud) => {
    if (!stud) return res.redirect("/register");

    const myPlaintextPassword = data.password;
    const hash = stud.password;
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      if (!result) {
        return res.send("Incorrect Password");
      }
      // return res.render("login", { email, message: "Incorrect Password" });
      // result == true;

      const token = jwt.sign({ _id: stud._id }, "key");
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 300 * 1000),
        })
        .redirect(`/courseRegister/studentId=${stud.id}`);
    });
  });
});

server.get("/courseRegister/:id", isLoggedin, (req, res) => {
  res.send("Course Register Page");
});

server.get("/getStudentData/:id", isLoggedin, (req, res) => {
  const studentId = req.params.id;

  Student.findOne({ id: studentId })
    .then((stud) => {
      if (!stud) return res.status(404).json({ message: "Student not found" });

      const currentSemester = stud.semester;
      Course.find({ semester: currentSemester })
        .then((courses) => {
          res.json({ student: stud, courses: courses });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: "Error retrieving courses", error: error });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error retrieving student data", error: error });
    });
});

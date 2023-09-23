import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
// import {Student} from "./models/studentSchema.js"

dotenv.config();
const server = express();
// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("../frontend/public"));

mongoose
.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("successfully connected mongoDB!");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  
  server.get("/", (req, res) => {
    res.render("index.html");
  });

server.post("/register", async (req, res) => {

  const student = req.body;
  console.log(student);

  let stu = await Student.findOne({ID : student.ID});
  if(stu)
  {
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  student.password = hashedPassword;

  await Student.create(student);

  res.json({
    success: true,
    message: "Registered Successfully."
  }).redirect("/login")
});

server.get("/register", (req, res) => {
  res.send("Register")
});

server.get("/login", (req, res) => {
  res.send("Login")
});

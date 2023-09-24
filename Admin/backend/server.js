import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { Hotel, User, Room, Review } from "./models/index.model.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config();
const server = express();
server.use(express.json());
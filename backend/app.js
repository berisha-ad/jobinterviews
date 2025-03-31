import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import interview from "./routes/interview.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/interview", interview);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

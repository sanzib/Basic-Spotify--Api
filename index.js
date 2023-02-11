import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import songRouter from "./routes/songRoutes.js";
import userRouter from "./routes/userRoute.js";
import connectDB from "./databas/db.js";
import playRouter from "./routes/playlistRoute.js";

const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/users", userRouter);
app.use("/api/songs", songRouter);
app.use("/api/playlist", playRouter);
var arr = [];
while (arr.length < 8) {
  var r = Math.floor(Math.random() * 100) + 1;
  if (arr.indexOf(r) === -1) arr.push(r);
}
console.log(arr);

app.listen(port, console.log(`CONNECTED ON PORT ${port}...`));

import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.listen(8080, () => console.log("Backend running on port 8080"));

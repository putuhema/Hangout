import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import eventRoutes from "./routes/event.router";
import userRoutes from "./routes/user.router";

dotenv.config();
const PORT = parseInt(process.env.PORT!) || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/events", eventRoutes);
app.use("/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`server run on port:${PORT}`);
});

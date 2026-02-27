


import express from "express";
import cors from "cors";
import "dotenv/config";

import connectMongo from "./config/mongo.js";
import assignmentRoutes from "./routes/assignments.js";
import queryRoutes from "./routes/query.js";
import sampleRoutes from "./routes/sample.js";


const app = express();


app.use(cors());


app.use(express.json());


app.use("/api/assignments", assignmentRoutes);
app.use("/api/query", queryRoutes);
app.use("/api", sampleRoutes);


connectMongo().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
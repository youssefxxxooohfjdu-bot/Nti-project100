import express from "express";
import cors from "cors";

import supplementRouter
  from "./routes/supplements.routes";


const app = express();


app.use(
  express.json()
);


app.use(
  cors({
    origin: "http://localhost:4200"
  })
);


app.get(
  "/api/health",
  (_request, response) => {

    response.json({
      success: true,
      message: "Gym Supplements API is running"
    });

  }
);


app.use(
  "/api/supplements",
  supplementRouter
);


export default app;
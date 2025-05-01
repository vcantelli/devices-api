import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import deviceRoutes from "@/presentation/routes/deviceRoutes";
import { errorHandler } from "@/presentation/middlewares/errorHandler";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);
app.use(cors());
app.use(express.json());

app.use("/devices", deviceRoutes);
app.use(errorHandler);

export { app };

import express from "express";
import cors from "cors";
import helmet from "helmet";
import deviceRoutes from "@/presentation/routes/deviceRoutes";
import { errorHandler } from "@/presentation/middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/devices", deviceRoutes);
app.use(errorHandler);

export { app };

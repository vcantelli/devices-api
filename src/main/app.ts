import express from "express";
import cors from "cors";
import deviceRoutes from "@/presentation/routes/deviceRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/devices", deviceRoutes);

export { app };

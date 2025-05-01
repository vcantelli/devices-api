import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import deviceRoutes from "@/presentation/routes/deviceRoutes";
import { swaggerSpec } from "@/docs/swagger";
import { errorHandler } from "@/presentation/middlewares/errorHandler";

const app = express();

/**
 * Middleware to secure HTTP headers using Helmet.
 */
app.use(helmet());

/**
 * Apply rate limiting to all requests:
 * - Max 100 requests per minute per IP
 */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

/**
 * Enable Cross-Origin Resource Sharing (CORS).
 */
app.use(cors());

/**
 * Enable parsing of JSON bodies in requests.
 */
app.use(express.json());

/**
 * Swagger UI route:
 * Serves API documentation generated via swagger-jsdoc.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Devices feature route group.
 * All /devices endpoints are handled here.
 */
app.use("/devices", deviceRoutes);

/**
 * Global error handling middleware.
 */
app.use(errorHandler);

/**
 * Health check endpoint.
 * Can be used by monitoring tools or readiness/liveness probes.
 */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export { app };

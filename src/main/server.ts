import { app } from "./app";
import dotenv from "dotenv";

/**
 * Load environment variables from .env file.
 */
dotenv.config();

/**
 * Port configuration.
 * Defaults to 3000 if PORT is not defined in environment variables.
 */
const port = process.env.PORT || 3000;

/**
 * Starts the Express server and listens on the specified port.
 */
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

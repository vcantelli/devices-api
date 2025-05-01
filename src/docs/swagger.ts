import swaggerJsdoc from "swagger-jsdoc";

const isProd = process.env.NODE_ENV === "production";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Devices API",
      version: "1.0.0",
      description: "REST API to manage devices with validations and business rules"
    },
    servers: [
      {
        url: isProd
          ? "https://devices-api.onrender.com"
          : "http://localhost:3000",
        description: isProd ? "Production server" : "Local server"
      }
    ]
  },
  apis: [isProd ? "./dist/presentation/routes/*.js" : "./src/presentation/routes/*.ts"],
});

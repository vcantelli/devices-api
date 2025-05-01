import swaggerJsdoc from "swagger-jsdoc";

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
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  },
  apis: ["./src/presentation/routes/*.ts"],
});

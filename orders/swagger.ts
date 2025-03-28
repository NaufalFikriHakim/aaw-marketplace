import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Authentication Service API",
    description: "Dokumentasi API untuk layanan otentikasi",
    version: "1.0.0",
  },
  host: "localhost:8001",
  basePath: "/api",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Auth",
      description: "Endpoints auth",
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./server.ts"];

swaggerAutogen()(outputFile, routes, doc);
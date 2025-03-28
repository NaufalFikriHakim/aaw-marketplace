import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import productRoutes from './product/product.routes'
import express_prom_bundle from "express-prom-bundle";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";


const app: Express = express();

// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'products-service' },
  promClient: {
    collectDefaultMetrics: {}
  }
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/product", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Marketplace Products API',
    version: '1.0.0'
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
    path: req.path
  });
});

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
  console.log(`Products Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;
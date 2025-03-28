import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./user/user.routes";
import authV2Routes from "./user/userv2.routes";
import express_prom_bundle from "express-prom-bundle";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

const app: Express = express();

// Prometheus metrics middleware (optional)
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'authentication-service' },
  promClient: {
    collectDefaultMetrics: {}
  }
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v2/auth', authV2Routes);  // Version 2 of the API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Authentication Service API',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
    path: req.path
  });
});

// Start the service
const PORT = process.env.PORT || 8001;  // Different port from other services

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;

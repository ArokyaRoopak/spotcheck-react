import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database/mongodb";
import UserRoutes from "./routes/user";
import PurchaseRoutes from "./routes/purchase";

import winston from "winston";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

export const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

connectDB();

app.use((req, res, next) => {
  const start = Date.now();
  const { method, url, body, ip } = req;
  logger.info(`Request: ${method} ${url}`, {
    ip,
    body,
  });
  const originalSend = res.send.bind(res);
  res.send = function (body) {
    const duration = Date.now() - start;
    let responseBody = body;

    try {
      if (typeof body === "string" && body.startsWith("{")) {
        responseBody = JSON.parse(body);
      }
    } catch (error) {
      responseBody = "Non-JSON response";
    }

    logger.info(`Response: ${res.statusCode} ${url}`, {
      duration: `${duration}ms`,
      responseBody,
      headers: res.getHeaders(),
    });

    return originalSend(body);
  };

  next();
});

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/purchases", PurchaseRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

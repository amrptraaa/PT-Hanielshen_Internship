import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


import userRoutes from "./routes/userRoute.js";
import roleRoutes from "./routes/roleRoute.js";
import absensiRoutes from "./routes/absensiRoute.js";
import shiftRoutes from "./routes/shiftRoute.js";
import jadwalRoutes from "./routes/jadwalRoute.js";
import fotoAbsensiRoutes from "./routes/fotoabsensiRoute.js";
import authRoutes from "./routes/authRoute.js";


dotenv.config();

const app = express();

// ✅ CORS untuk semua domain (bisa diakses dari mana saja)
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));
app.use(bodyParser.json());

// ✅ Base URL API
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/fotoabsensi", fotoAbsensiRoutes);
app.use("/api/auth", authRoutes);
// ✅ Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hanielsen API",
      version: "1.0.0",
      description: "Dokumentasi API sistem absensi dan penjadwalan",
    },
    servers: [{ url: "http://localhost:" + process.env.PORT }],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import roleRoutes from "./routes/roleRoute.js";
import userRoutes from "./routes/userRoute.js";
import shiftRoutes from "./routes/shiftRoute.js"; 
import jadwalRoutes from "./routes/jadwalRoute.js";
import absensiRoutes from "./routes/absensiRoute.js";
import fotoabsensiRoutes from "./routes/fotoabsensiRoute.js";



const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shifts", shiftRoutes); 
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/fotoabsensi", fotoabsensiRoutes);


const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

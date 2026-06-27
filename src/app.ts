import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mahasiswaRoutes from "./routes/mahasiswa.route";
import mahasiswaDbRoutes from "./routes/mahasiswa-db.route"; // Import router baru

const app: Application = express();

// Middleware Global
app.use(cors());
app.use(express.json()); // Supaya server bisa membaca req.body berformat JSON
// Jalur prefix harus pas: /api/db/mahasiswa
app.use("/api/db/mahasiswa", mahasiswaDbRoutes);


// Middleware Logging Sederhana (Materi Pertemuan 2)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Wajib dipanggil agar request tidak menggantung!
});

// Endpoint Dasar untuk Cek Health Server
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Express CRUD berjalan dengan lancar!" });
});

// Endpoint Latihan Pertemuan 1
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", service: "Express CRUD API" });
});

export default app;
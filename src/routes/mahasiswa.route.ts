// src/routes/mahasiswa.route.ts

import { Router, Request, Response } from "express";
import { mahasiswa, Mahasiswa } from "../data/mahasiswa.data";

const router = Router();

// 1. READ ALL (Mengambil semua data dari Array)
// Endpoint: GET /api/mahasiswa
router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Data mahasiswa berhasil diambil (Versi Array)",
    data: mahasiswa,
  });
});

// [LATIHAN MODUL] SEARCH MAHASISWA BERDASARKAN NAMA
// Endpoint: GET /api/mahasiswa/search/:keyword
router.get("/search/:keyword", (req: Request, res: Response) => {
  const keyword = (req.params.keyword as string).toLowerCase();

  // Validasi agar keyword pencarian minimal 3 karakter
  if (keyword.length < 3) {
    return res.status(400).json({
      message: "Keyword pencarian harus minimal 3 karakter",
    });
  }

  const filteredMahasiswa = mahasiswa.filter((item) =>
    item.nama.toLowerCase().includes(keyword)
  );

  res.json({
    message: `Hasil pencarian dengan keyword: "${req.params.keyword}"`,
    data: filteredMahasiswa,
  });
});

// 2. READ DETAIL (Mengambil satu data berdasarkan ID)
// Endpoint: GET /api/mahasiswa/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = mahasiswa.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  res.json({
    message: "Detail mahasiswa berhasil diambil",
    data,
  });
});

// 3. CREATE (Menambah data baru ke Array)
// Endpoint: POST /api/mahasiswa
router.post("/", (req: Request, res: Response) => {
  const { nim, nama, prodi, angkatan } = req.body;

  // Validasi field wajib diisi
  if (!nim || !nama || !prodi || !angkatan) {
    return res.status(400).json({
      message: "NIM, nama, prodi, dan angkatan wajib diisi",
    });
  }

  // [LATIHAN MODUL] Validasi agar nama minimal 3 karakter saat POST
  if (nama.length < 3) {
    return res.status(400).json({
      message: "Nama wajib minimal 3 karakter",
    });
  }

  // [LATIHAN MODUL] Pengecekan agar NIM tidak boleh duplikat
  const isNimExist = mahasiswa.some((item) => item.nim === nim);
  if (isNimExist) {
    return res.status(400).json({
      message: "NIM sudah terdaftar, tidak boleh duplikat",
    });
  }

  const newMahasiswa: Mahasiswa = {
    id: mahasiswa.length + 1,
    nim,
    nama,
    prodi,
    angkatan: Number(angkatan),
  };

  mahasiswa.push(newMahasiswa);

  res.status(201).json({
    message: "Mahasiswa berhasil ditambahkan",
    data: newMahasiswa,
  });
});

// 4. UPDATE (Memperbarui data berdasarkan ID)
// Endpoint: PUT /api/mahasiswa/:id
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nim, nama, prodi, angkatan } = req.body;

  const index = mahasiswa.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  mahasiswa[index] = {
    id,
    nim,
    nama,
    prodi,
    angkatan: Number(angkatan),
  };

  res.json({
    message: "Mahasiswa berhasil diperbarui",
    data: mahasiswa[index],
  });
});

// 5. DELETE (Menghapus data berdasarkan ID)
// Endpoint: DELETE /api/mahasiswa/:id
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  const deletedData = mahasiswa.splice(index, 1);

  res.json({
    message: "Mahasiswa berhasil dihapus",
    data: deletedData[0],
  });
});

// Wajib di-export default agar bisa dibaca di app.ts
export default router;
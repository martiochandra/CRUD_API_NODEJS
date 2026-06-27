// src/repositories/buku.repository.ts

import db from "../config/database";

export class BukuRepository {
  // Mengambil semua buku
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM buku ORDER BY id DESC");
    return rows;
  }

  // Mengambil detail buku berdasarkan ID
  static async getById(id: number) {
    const [rows]: any = await db.execute("SELECT * FROM buku WHERE id = ?", [id]);
    return rows[0] || null;
  }

  // Menambahkan buku baru
  static async create(isbn: string, judul: string, penulis: string, stok: number) {
    const [result]: any = await db.execute(
      "INSERT INTO buku (isbn, judul, penulis, stok) VALUES (?, ?, ?, ?)",
      [isbn, judul, penulis, stok]
    );
    return result.insertId;
  }
}
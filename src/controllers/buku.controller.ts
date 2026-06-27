// src/controllers/buku.controller.ts

import { Request, Response } from "express";
import { BukuRepository } from "../repositories/buku.repository";

export class BukuController {
  // Handler untuk GET ALL
  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await BukuRepository.getAll();
      res.json({
        message: "Data buku berhasil diambil (Layered Architecture)",
        data: books,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  }

  // Handler untuk GET DETAIL
  static async getBookById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const book = await BukuRepository.getById(id);

      if (!book) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
      }

      res.json({
        message: "Detail buku berhasil ditemukan",
        data: book,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  }

  // Handler untuk POST
  static async createBook(req: Request, res: Response) {
    try {
      const { isbn, judul, penulis, stok } = req.body;

      if (!isbn || !judul || !penulis || stok === undefined) {
        return res.status(400).json({
          message: "Field isbn, judul, penulis, dan stok wajib diisi!",
        });
      }

      const insertId = await BukuRepository.create(isbn, judul, penulis, Number(stok));

      res.status(201).json({
        message: "Buku baru berhasil ditambahkan ke database",
        data: { id: insertId, isbn, judul, penulis, stok },
      });
    } catch (error: any) {
      console.error(error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "ISBN sudah terdaftar di database" });
      }
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  }
}
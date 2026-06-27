// src/routes/buku.route.ts

import { Router } from "express";
import { BukuController } from "../controllers/buku.controller";

const router = Router();

// Routing dikoneksikan langsung ke Controller masing-masing
router.get("/", BukuController.getAllBooks);
router.get("/:id", BukuController.getBookById);
router.post("/", BukuController.createBook);

export default router;
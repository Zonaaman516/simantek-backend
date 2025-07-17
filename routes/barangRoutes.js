const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let items = [
  { id: 1, nama: "Laptop", jumlah: 2, lokasi: "Ruang IT" },
  { id: 2, nama: "Printer", jumlah: 1, lokasi: "Ruang TU" }
];

// Middleware autentikasi token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token tidak ada" });

  try {
    const decoded = jwt.verify(token, "rahasia123");
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Token tidak valid" });
  }
};

// GET semua data
router.get("/", verifyToken, (req, res) => {
  res.json(items);
});

// POST data baru
router.post("/", verifyToken, (req, res) => {
  const { nama, jumlah, lokasi } = req.body;
  const newItem = { id: Date.now(), nama, jumlah, lokasi };
  items.push(newItem);
  res.json(newItem);
});

// PUT update data
router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { nama, jumlah, lokasi } = req.body;
  items = items.map((item) =>
    item.id == id ? { ...item, nama, jumlah, lokasi } : item
  );
  res.json({ id: parseInt(id), nama, jumlah, lokasi });
});

// DELETE data
router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id != id);
  res.json({ id: parseInt(id), message: "Dihapus" });
});

module.exports = router;
tambah barangRoutes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Login sederhana (hanya 1 user tetap)
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, "rahasia123", { expiresIn: "1d" });
    return res.json({ token });
  }

  res.status(401).json({ error: "Username atau password salah" });
});

module.exports = router;
tambah login.js

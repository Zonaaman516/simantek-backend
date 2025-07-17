const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const barangRoutes = require("./routes/barangRoutes");
const loginRoute = require("./routes/login");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/barang", barangRoutes);
app.use("/api/login", loginRoute);

// Route utama
app.use("/api/barang", barangRoutes);

app.get("/", (req, res) => {
  res.send("SIMANTEK API berjalan!");
});

// Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB terhubung");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server berjalan di port 5000")
    );
  })
  .catch((err) => console.error(err));
tambah index.js
hubungkan login route

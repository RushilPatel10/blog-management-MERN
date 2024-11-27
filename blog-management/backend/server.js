const db = require("./config/database");
const express = require("express");
const Config = require("./config");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

// Use blog routes
app.use("/api", blogRoutes)

const PORT = Config.PORT || 5000;

app.listen(PORT, () => {
  db();
  console.log(`Server is running on localhost:${PORT}`);
});
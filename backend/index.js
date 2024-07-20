require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router.js");

require("./connection.js");

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send(`server started successfully`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const corsOptions = {
  origin: "*", // Allow all origins during development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "test")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "test", "test.html"));
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from your Express server!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

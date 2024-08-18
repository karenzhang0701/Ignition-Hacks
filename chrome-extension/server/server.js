const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const util = require("util");
const { exec } = require("child_process");

const corsOptions = {
  origin: "*", // Allow all origins during development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Convert exec to return a promise
const execPromise = util.promisify(exec);

app.use(express.static(path.join(__dirname, "test")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "test", "test.html"));
});

app.post("/api/hello", async (req, res) => {
  const url = req.body.url;
  console.log("Received URL:", url);

  try {
    // Path to python scripts
    const scraperPath = path.join(__dirname, "scraper.py");
    const summarizerPath = path.join(__dirname, "summarizer.py");

    // Scrape text from the news article
    const { stdout: scraperOutput } = await execPromise(
      `python3 "${scraperPath}" "${url}"`
    );
    const text = scraperOutput.trim(); //stores article text
    console.log("Scraper output:", text);

    // Generate a summary of the scraped text using stdin
    const summarizerProcess = exec(`python3 "${summarizerPath}"`);
    summarizerProcess.stdin.write(text);
    summarizerProcess.stdin.end();

    let summarizerOutput = "";
    summarizerProcess.stdout.on("data", (data) => {
      summarizerOutput += data;
    });

    summarizerProcess.on("close", (code) => {
      summarizerOutput = summarizerOutput.trim();
      console.log("Summarizer output:", summarizerOutput);

      // Send the summary to the front end
      res.json({ message: "URL received", url: url, output: summarizerOutput });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

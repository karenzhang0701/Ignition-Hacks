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

// Function to run a python process using stdin
// Used to run bias.py and summarizer.py
function runPythonProcess(path, input) {
  return new Promise((resolve, reject) => {
    const pythonProcess = exec(`python "${path}"`);
    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();

    let output = "";
    pythonProcess.stdout.on("data", (data) => {
      output += data;
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script exited with code ${code}`));
      }
      resolve(output.trim());
    });
  });
}

app.post("/api/hello", async (req, res) => {
  const url = req.body.url;
  console.log("Received URL:", url);

  try {
    // Path to python scripts
    const scraperPath = path.join(__dirname, "scraper.py");
    const summarizerPath = path.join(__dirname, "summarizer.py");
    const biasPath = path.join(__dirname, "bias.py");

    // Scrape text from the news article
    const { stdout: scraperOutput } = await execPromise(
      `python3 "${scraperPath}" "${url}"`
    );
    const text = scraperOutput.trim(); //stores article text
    console.log("Scraper output:", text);

    // Get the bias report
    const biasOutput = await runPythonProcess(biasPath, text);
    console.log("Bias report:", biasOutput);

    // Get the summary
    const summarizerOutput = await runPythonProcess(summarizerPath, text);
    console.log("Summary:", summarizerOutput);

    //Send data to front end
    res.json({
      message: "URL received",
      url: url,
      output: {
        text: text,
        summary: summarizerOutput,
        biasReport: biasOutput,
      },
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

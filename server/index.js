const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: path.join(__dirname, "uploads/")
});

app.post("/upload", upload.single("resume"), (req, res) => {
  try {
    const filePath = req.file.path;
    const jobDesc = req.body.jobDesc || "";

    exec(
      `python ai/analyzer.py "${filePath}" "${jobDesc}"`,
      (error, stdout, stderr) => {

        console.log("STDOUT:");
        console.log(stdout);

        console.log("STDERR:");
        console.log(stderr);

        if (error) {
          console.error("EXEC ERROR:", error);

          return res.status(500).json({
            error: error.message
          });
        }

        try {
          const result = JSON.parse(stdout);

          return res.json(result);

        } catch (parseError) {

          console.error("JSON Parse Error:");
          console.error(parseError);

          return res.status(500).json({
            error: "Failed to parse Python output"
          });
        }
      }
    );

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: "Server Error"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
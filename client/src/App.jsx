import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");

  const [resumeText, setResumeText] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    if (!jobDesc.trim()) {
      alert("Please enter a Job Description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDesc);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setResumeText(res.data.resumeText);
      setAtsScore(res.data.atsScore);
      setMatchedSkills(res.data.matchedSkills || []);
      setMissingSkills(res.data.missingSkills || []);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>AI Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      {file && (
        <p>
          <strong>Selected File:</strong> {file.name}
        </p>
      )}

      <h3>Job Description</h3>

      <textarea
        rows="8"
        cols="100"
        placeholder="Paste Job Description Here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={analyzeResume}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Analyze Resume
      </button>

      <br />
      <br />

      {atsScore !== null && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>ATS Score: {atsScore}%</h2>
        </div>
      )}

      {matchedSkills.length > 0 && (
        <div>
          <h2>Matched Skills</h2>
          <ul>
            {matchedSkills.map((skill, index) => (
              <li key={index}>✅ {skill}</li>
            ))}
          </ul>
        </div>
      )}

      {missingSkills.length > 0 && (
        <div>
          <h2>Missing Skills</h2>
          <ul>
            {missingSkills.map((skill, index) => (
              <li key={index}>❌ {skill}</li>
            ))}
          </ul>
        </div>
      )}

      {resumeText && (
        <div>
          <h2>Extracted Resume Text</h2>

          <textarea
            value={resumeText}
            readOnly
            rows="20"
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
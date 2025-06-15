const express = require("express");
const multer = require("multer");
const { parseResume } = require("../services/parser");
const OpenAI = require("openai");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// In-memory cache for parsed resume
let resumeText = "";

// Upload route to parse resume
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    resumeText = await parseResume(req.file.path);

    res.json({ message: "Resume uploaded and parsed successfully." });
  } catch (error) {
    console.error("Error parsing resume:", error);
    res.status(500).json({ error: "Failed to parse resume" });
  }
});

// Chat endpoint to ask questions about the resume
router.get("/ask", async (req, res) => {
  const question = req.query.question;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  if (!resumeText) {
    return res.status(400).json({ error: "Please upload a resume first" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that answers questions about resumes.",
        },
        {
          role: "user",
          content: `Here is the resume:\n${resumeText}\n\nQuestion: ${question}`,
        },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get answer from OpenAI" });
  }
});

module.exports = router;

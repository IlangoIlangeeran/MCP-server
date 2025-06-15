const express = require("express");
const { sendEmail } = require("../services/mailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await sendEmail({ to, subject, body });
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

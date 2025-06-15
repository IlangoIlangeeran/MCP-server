require("dotenv").config();
const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resume");
const emailRoutes = require("./routes/email");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/resume", resumeRoutes);
app.use("/email", emailRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`MCP server running on port ${PORT}`));

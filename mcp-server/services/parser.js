const fs = require("fs");
const pdfParse = require("pdf-parse");

async function parseResume(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const parsed = await pdfParse(dataBuffer);
  return parsed.text; // you can further process this into sections
}
module.exports = { parseResume };

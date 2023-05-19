const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const extractPdfText = require("./extractPDFtext");
const extractMSText = require("./extractMsText");

function saveFileToFolder(file, docsNum) {
  const dirName = docsNum.toLowerCase() === "doc1" ? "Docs1" : "Docs2";

  const folderPath = path.join(__dirname, dirName); // create a path to the folder

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath); // create the folder if it doesn't exist
    const filePath = path.join(folderPath, file.originalname); // create a path to the file
    fs.writeFileSync(filePath, fs.readFileSync(file.path)); // write the new file to disk
  } else {
    fs.rmdirSync(folderPath, { recursive: true }); // remove the existing file
    fs.mkdirSync(folderPath); // create the folder if it doesn't exist
    const filePath = path.join(folderPath, file.originalname); // create a path to the file
    fs.writeFileSync(filePath, fs.readFileSync(file.path)); // write the new file to disk
  }
}

function getFileExtension(filename) {
  return path.extname(filename).toLowerCase();
}

async function extractText(fileName, folderName) {
  try {
    if (getFileExtension(fileName) === ".pdf") {
      const result = await extractPdfText.getPDFText(fileName, folderName);
      return result;
    } else if (
      getFileExtension(fileName) === ".docx" ||
      getFileExtension(fileName) === ".doc"
    ) {
      const result = await extractMSText.getMSText(fileName, folderName);
      return result;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { extractText, saveFileToFolder };
